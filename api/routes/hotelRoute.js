const express = require('express');
const router = express.Router();
const Post  = require('../models/Hotel');
const controller = require('../controllers/hotel.controller');

//GET all hotels
router.get('/list', controller.get);

router.get('/list/:state', controller.stateFilter);

// //GET a specific hotel
// router.get('/:postId', (req, res) => {
//     const { postId } = req.params;
//     Post.findById(postId)
//     .then( data => {
//         res.status(200).json(data);
//     })
//     .catch( err => {
//         res.status(404).json({ message : err })
//     })
// })

module.exports = router;