const Hotel = require("../models/Hotel");
const User = require("../models/User");

exports.get = async (req, res, next) => {
  try {
    await Hotel.find()
      .then((hotels) => {
        res.status(200).json(hotels);
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });

    //   await user.updateOne(newUserObject, { override: true, upsert: true });
    //   const savedUser = await User.findById(user._id);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.stateFilter = async (req, res, next) => {
  try {
    await Hotel.find({ State: req.params.state })
      .then((hotels) => {
        res.status(200).json(hotels);
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });

    //   await user.updateOne(newUserObject, { override: true, upsert: true });
    //   const savedUser = await User.findById(user._id);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.rateFilter = async (req, res, next) => {
  try {
    await Hotel.find({ Rating: req.params.rating })
      .then((hotels) => {
        res.status(200).json(hotels);
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });

    //   await user.updateOne(newUserObject, { override: true, upsert: true });
    //   const savedUser = await User.findById(user._id);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.book = async (req, res) => {
  await User.findOne({ _id: req.userId }, (err, foundUser) => {
    try {
      if (foundUser) {
        const newBook = req.body;
        foundUser.bookings.push(newBook);
        foundUser.save();
        res.json({ ok: 1 });
      } else {
        res.send("User Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  });
  //   User.updateOne(
  //     { _id: req.userId },
  //     { bookings: req.body.booking },
  //     function (err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send(req.body.booking);
  //       }
  //     }
  //   );
};
