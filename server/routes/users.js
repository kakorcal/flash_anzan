import express from 'express'
import User from '../db/User'
const router = express.Router();

// router.post('/', (req, res) => {
//   User.create(req.body.user)
//     .then(user => {res.json(user)})
//     .catch(err => {res.status(500).json(err)});
// });

// TODO: Add authorization middleware for each end point
router.get('/:identifier', (req, res) => {
  User.findOne({username: req.params.identifier})
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
});

router.put('/:identifier', (req, res) => {
  User.findOneAndUpdate({username: req.params.identifier}, req.body.user)
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
});

router.delete('/:identifier', (req, res) => {
  User.remove({username: req.params.identifier})
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
});

export default router