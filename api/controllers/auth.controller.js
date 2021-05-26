const User = require("../models/User");
const dotenv = require("dotenv");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const oauthpipeline = require("../../config/OauthSetup");

dotenv.config();

const saltRounds = 10;

exports.postRegistrationData = async (req, res) => {
  // validate the data. The joi.validate thing send error as the 1st object in its response and there is also a message in the details.
  const { error } = registerValidation(req.body);
  if (error) {
    return res.send(error.details[0].message);
  } else {
    //check if email already exists
    User.findOne({ email: req.body.email }, async (err, foundEmail) => {
      if (foundEmail) {
        res.send("Email already exists");
      } else {
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
          //create a user
          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            wallet: 25000,
          });
          try {
            const savedUser = await user.save();
            res.send(savedUser);
          } catch (err) {
            res.status(400).send(err);
          }
        });
      }
    });
  }
};

exports.postLoginData = async (req, res) => {
  //lets validate the data. The joi.validate thing send error as the 1st object in its response and there is also a message in the details.
  const { error } = loginValidation(req.body);
  if (error) {
    return res.send(error.details[0].message);
  } else {
    //check if email doesn't exist
    User.findOne({ email: req.body.email }, async (err, foundUser) => {
      const email = req.body.email;
      if (!foundUser) {
        res.send("Email doesn't match our records");
      } else {
        //check password
        bcrypt.compare(
          req.body.password,
          foundUser.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                { email: email },
                process.env.TOKEN_SECRET,
                {
                  expiresIn: "1hr",
                }
              );
              res.send(token);
            } else {
              res.send("invalid password");
            }
          }
        );
      }
    });
  }
};

exports.postOuthLogin = async (req, res, next) => {
  try {
    // the oauthpipeline verifies the user and returns the email
    const { given_name, family_name, email, sub } = await oauthpipeline(
      req,
      next
    );

    // check if user already exists in our own db
    await User.findOne({ googleId: sub }).then((currentUser) => {
      if (!currentUser) {
        // already have this user
        new User({
          googleId: sub,
          firstName: given_name,
          lastName: family_name,
          email: email,
          wallet: 25000,
        }).save();
      }
      // const { email } = await oauthpipeline(req, next);
      const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
        expiresIn: "1hr",
      });
      res.json({ ok: 1, token });
    });
  } catch (err) {
    console.log(err);
  }
};
