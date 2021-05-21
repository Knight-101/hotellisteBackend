const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
  },
  Rating: {
    type: Number,
    required: true,
  },
  location: {
    cityName: { type: String },
    longitude: { type: Number },
    latitude: { type: Number },
  },
  State: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);
