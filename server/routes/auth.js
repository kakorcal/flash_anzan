import express from 'express'
import User from '../db/models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
import authenticate from '../middleware/authenticate'

let router = express.Router();

router.post('/', (req, res) => {
  const {identifier, password} = req.body;

  User.query({
    where: {username: identifier}
  }).fetch().then(user => {
    if(user){
      bcrypt.compare(password, user.get('password'), (err, match) => {
        if(err) res.status(500).json({errors: {form: 'Server down. Please try at a later time.'}})
        if(match){
          const token = jwt.sign({
            id: user.get('id'),
            username: user.get('username')
          }, config.jwtSecret);

          res.json({token});
        }else{
          res.status(401).json({form: 'Invalid Credentials.'});    
        }
      });
    }else{
      // unauthorized
      res.status(401).json({form: 'Invalid Credentials.'});
    }
  })
});

router.get('/user', authenticate, (req, res) => {
  eval(require('locus'));
});

export default router
