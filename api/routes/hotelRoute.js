const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Hotel");
const controller = require("../controllers/hotel.controller");
const verify = require("../verifyToken");

//GET all hotels
router.get("/list", controller.get);
//GET hotels by state
router.get("/list/:state", controller.stateFilter);
//GET hotels by ratings
router.get("/list/rating/:rating", controller.rateFilter);

router.post("/book", verify, controller.book);

module.exports = router;
