import express from 'express'
import User from '../db/User'
const router = express.Router();

// router.post('/', (req, res) => {
//   User.create(req.body.user)
//     .then(user => {res.json(user)})
//     .catch(err => {res.status(500).json(err)});
// });

// TODO: Add authorization middleware for each end point
router.get('/:id', (req, res) => {
  User.findOne({google_id: req.params.id})
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
});

router.put('/:id', (req, res) => {
  User.findOneAndUpdate({google_id: req.params.id}, req.body.user)
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
})

router.delete('/:id', (req, res) => {
  User.remove({google_id: req.params.id})
    .then(user => {res.json(user)})
    .catch(err => {res.status(500).json(err)});
})

export default router