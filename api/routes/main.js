const router = require("express").Router();
const verify = require("../verifyToken");
const User = require("../models/User");

router.get("/", verify, (req, res) => {
  User.findById(req.userId)
    .then((result) => {
      // res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
