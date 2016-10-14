import express from 'express'

const router = express.Router();

router.get('/google', (req, res) => {
  res.send('ok');
});

router.get('/google/callback', (req, res) => {
  res.send('ok');
});