import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config/env'
import db from '../db/index'

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if(authorizationHeader){
    token = authorizationHeader.split(' ')[1];
  }
  
  if(token){
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err){
        res.status(401).json({error: 'Failed to authenticate'});
      }else{
        // Check if user exists
        db.User.findOne({username: data.username})
          .select('-password_digest')
          .then(user => {
            if(!user){
              res.status(404).json({error: 'No such user'});
            }else{
              req.currentUser = user;
            }
            next();
          })
          .catch(err => {
            res.status(500).json({error: 'Server down'});
          });
      }
    });
  }else{
    // 403 forbidden status
    res.status(403).json({error: 'No token provided'});
  }
}