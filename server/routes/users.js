import express from 'express'
import db from '../db/index'
import commonValidations from '../utils/validations/signup'
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
  validateInput(req.body, commonValidations)
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
    .then(user => {
      res.json(user);
    })
    .catch(err => {res.status(500).json(err)});
});

router.put('/:identifier', authenticate, (req, res) => {
  // TODO: Handle Error On Client Side
  db.User.findOneAndUpdate({_id: req.params.identifier}, req.body.user)
    .select('-password_digest')
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
});

router.delete('/:identifier', authenticate, (req, res) => {
  db.User.remove({_id: req.params.identifier})
    .select('-password_digest')
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
});

export default router