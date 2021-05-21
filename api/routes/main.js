const router = require("express").Router();
const verify = require("../verifyToken");
const User = require("../models/User");

router.get("/", verify, (req, res) => {
  User.findOne({ email: req.userEmail })
    .then((currentUser) => {
      res.send(currentUser);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
