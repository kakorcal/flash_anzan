import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config/env'
import User from '../db/User'

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
        // User.query({
        //   where: {id: decoded.id},
        //   select: ['username']
        // }).fetch().then(user => {
        //   if(!user){
        //     res.status(404).json({error: 'No such user'});
        //   }else{
        //     req.currentUser = user;
        //   }
        //   next();
        // });
      }
    });
  }else{
    // 403 forbidden status
    res.status(403).json({
      error: 'No token provided'
    });
  }
}