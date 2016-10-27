import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../db/index'
import {JWT_SECRET} from '../config/env'
import authenticate from '../utils/authenticate'

let router = express.Router();

router.post('/', (req, res) => {
  const {identifier, password} = req.body;

  db.User.findOne({username: identifier})
    .then(user => {
      if(user){
        bcrypt.compare(password, user.password_digest, (err, match) => {
          if(err) res.status(500).json({error: 'The server is currently down. Please login at a later time'});
          if(match){
            const {_id, username} = user;
            const token = jwt.sign({_id, username}, JWT_SECRET);
            res.json({success: true, token});
          }else{
            // password not matching
            res.status(401).json({form: 'Invalid Credentials.'});
          }
        })
      }else{
        // not in db
        res.status(401).json({form: 'Invalid Credentials.'});
      }
    })
    .catch(err => {
      // server error
      res.status(500).json({error: 'The server is currently down. Please login at a later time'});
    });
});

export default router
