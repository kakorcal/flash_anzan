import express from 'express'
import db from '../db/index'
import commonValidations from '../utils/validations/signup'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config/env'
import {isEmpty} from 'lodash'

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
                res.json({success: true, token});
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

// TODO: Add authorization middleware for each end point
router.get('/:identifier', (req, res) => {
  db.User.findOne({username: req.params.identifier})
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
});

router.put('/:identifier', (req, res) => {
  db.User.findOneAndUpdate({username: req.params.identifier}, req.body.user)
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
});

router.delete('/:identifier', (req, res) => {
  db.User.remove({username: req.params.identifier})
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
});

export default router

// import express from 'express'
// import commonValidations from '../shared/validations/signup'
// import User from '../db/models/user'
// import bcrypt from 'bcrypt'
// import {isEmpty} from 'lodash'

// let router = express.Router();

// function validateInput(data, otherValidations){
//   let {errors} = otherValidations(data);
  
//   // not necessary but if you want to check uniqueness for both username and email,
//   // use orWhere in the query. the purpose is to do only one query to the db.
//   return User.query({
//     where: {username: data.username}
//   }).fetch().then(user => {
//     if(user){
//       // bookshelf get method
//       if(user.get('username') === data.username){
//         errors.username = 'Username already exists';
//       } 
//     }

//     return {
//       errors,
//       isValid: isEmpty(errors)
//     };
//   });
// }

// router.get('/:identifier', (req, res) => {
//   User.query({
//     select: ['id','username'], // don't select the password!
//     where: {id: req.params.identifier},
//     orWhere: {username: req.params.identifier}
//   }).fetch().then(user => {
//     res.json({user});
//   });
// });

// router.post('/', (req, res)=>{
//   validateInput(req.body, commonValidations)
//     .then(({errors, isValid}) => {
//       if(isValid){
//         const {username, password} = req.body;
//         var plainTextPassword = password;
        
//         bcrypt.genSalt(10, (err, salt) => {
//           if(err) res.status(500).json({error: err});

//           bcrypt.hash(plainTextPassword, salt, (err, password) => {
//             User.forge({
//               username, password
//             }, {hasTimestamps: true}).save()
//             .then(user => res.json({success: true}))
//             .catch(err => res.status(500).json({error: err})); 
//           });
//         });
//       }else{
//         res.status(400).json(errors);
//       }
//     });
// });

// export default router