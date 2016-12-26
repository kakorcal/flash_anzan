import express from 'express'
import db from '../db/index'
import signupValidations from '../utils/validations/signup'
import editValidations from '../utils/validations/edit'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import {JWT_SECRET, X_MASHAPE_KEY} from '../config/env'
import {isEmpty} from 'lodash'
import authenticate from '../utils/authenticate'

const router = express.Router();

function validateInput(data, otherValidations){
  let {errors} = otherValidations(data);
  // check db if username is already taken
  return db.User.findOne({username: data.username})
    .then(user => {
      if(user){
        if(user.username === data.username){
          errors.username = 'Username already exists';
        }
      }
      return {
        errors,
        isValid: isEmpty(errors)
      }
    })
    .catch(err => {
      errors.server = 'The server is currently down. Please signup at a later time';
      return {
        errors,
        isValid: isEmpty(errors)
      }
    });
}

router.post('/', (req, res)=>{
  validateInput(req.body, signupValidations)
    .then(({errors, isValid}) => {
      if(isValid){
        const {username, password} = req.body;

        bcrypt.genSalt(10, (err, salt) => {
          if(err || errors.server) res.status(500).json({error: 'The server is currently down. Please signup at a later time'});

          bcrypt.hash(password, salt, (err, password_digest) => {
            db.User.create({username, password_digest})
              .then(user => {
                const {_id, username} = user; 
                const token = jwt.sign({_id, username}, JWT_SECRET);
                res.json({success: true, token, X_MASHAPE_KEY});
              })
              .catch(err => {
                res.status(500).json({error: 'The server is currently down. Please signup at a later time'})
              }); 
          });
        });
      }else{
        res.status(400).json(errors);
      }
    });
});

router.get('/:identifier', authenticate, (req, res) => {
  db.User.findOne({_id: req.params.identifier})
    .select('-password_digest')
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
});

router.put('/:identifier', authenticate, (req, res) => {
  if(req.body.user.activity_log){
    let {date, result, current_level} = req.body.user.activity_log;
    let stats = {
      [date]: {game_play: null, win: null, lose: null}
    };

    db.User.findOne({_id: req.params.identifier})
      .select('-password_digest')
      .then(user => {
        eval(require('locus'));
        let {activity_log, total_win, total_lose, highest_level} = user;
        if(activity_log[date]){
          stats[date].game_play = activity_log[date].game_play + 1;
          stats[date].win = result === 'win' ? activity_log[date].win + 1 : activity_log[date].win;
          stats[date].lose = result === 'lose' ? activity_log[date].lose + 1 : activity_log[date].lose;
        }else{
          stats[date].game_play = 1;
          stats[date].win = result === 'win' ? 1 : 0;
          stats[date].lose = result === 'lose' ? 1 : 0;
        }
        total_win = result === 'win' ? total_win + 1 : total_win;
        total_lose = result === 'lose' ? total_lose + 1: total_lose;
        highest_level = result === 'win' ? current_level : highest_level;

        return {activity_log, stats, total_win, total_lose, highest_level};
      })
      .then(updates => {
        let activity_log = Object.assign({}, updates.activity_log, updates.stats);
        let {total_win, total_lose, highest_level} = updates;
        db.User.findOneAndUpdate({_id: req.params.identifier}, {activity_log, total_win, total_lose, highest_level})
          .select('-password_digest')
          .then(user => {res.json(user)})
          .catch(err => {res.status(500).json(err)});  
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }else{
    db.User.findOneAndUpdate({_id: req.params.identifier}, req.body.user)
      .select('-password_digest')
      .then(user => {res.json(user)})
      .catch(err => {res.status(500).json(err)});    
  }
});

router.delete('/:identifier', authenticate, (req, res) => {
  db.User.remove({_id: req.params.identifier})
    .select('-password_digest')
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
});

/*
  router.put('/:identifier/upload', authenticate, (req, res) => {
    // do a put request to /:identifier and then another request to upload the file
    // save the filename as string in db
    // upload file to client/images

    // db.User.findOneAndUpdate({_id: req.params.identifier}, req.body.user)
    //   .select('-password_digest')
    //   .then(user => {res.json(user)})
    //   .catch(err => {res.status(500).json(err)});
  });
*/

export default router