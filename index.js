const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const hotelRoutes = require("./api/routes/hotelRoute");
const mainRoutes = require("./api/routes/main");
const authRoutes = require("./api/routes/authRoute");

dotenv.config();
// require db
require("./config/mongoose.js");

const app = express();

app.use(bodyParser.json());
//handled CORS
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-Methods", "*");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

// set up routes
app.use("/hotels", hotelRoutes);
app.use("/auth", authRoutes);
app.use("/main", mainRoutes);

//server listening on port
app.listen(process.env.PORT || 8000, function () {
  console.log("server started on port 8000");
});
