import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from '../db/User'
import bcrypt from 'bcrypt'

const router = express.Router();

router.post('/new', (req, res) => {
  
});

router.post('/login', (req, res) => {

});

export default router