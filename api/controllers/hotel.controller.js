const Hotel = require('../models/Hotel');

exports.get = async (req, res, next) => {
    try {
        await Hotel.find()
        .then( hotels => { 
            res.status(200).json(hotels)
        })
        .catch(err => {
            res.status(404).json({ message: err })
        })
  
    //   await user.updateOne(newUserObject, { override: true, upsert: true });
    //   const savedUser = await User.findById(user._id);
  
     
    } catch (error) {
        console.log(error)
        next();
    }
  };

  exports.stateFilter = async (req, res, next) => {
    try {
        await Hotel.find({State: req.params.state})
        .then( hotels => { 
            res.status(200).json(hotels)
        })
        .catch(err => {
            res.status(404).json({ message: err })
        })
  
    //   await user.updateOne(newUserObject, { override: true, upsert: true });
    //   const savedUser = await User.findById(user._id);
  
     
    } catch (error) {
        console.log(error)
        next();
    }
  };

  exports.rateFilter = async (req, res, next) => {
    try {
        await Hotel.find({Rating: req.params.rating})
        .then( hotels => { 
            res.status(200).json(hotels)
        })
        .catch(err => {
            res.status(404).json({ message: err })
        })
  
    //   await user.updateOne(newUserObject, { override: true, upsert: true });
    //   const savedUser = await User.findById(user._id);
  
     
    } catch (error) {
        console.log(error)
        next();
    }
  };

  