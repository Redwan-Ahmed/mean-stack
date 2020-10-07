const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");

//mongoDB Pass: AXRj9NRvEU0EWzI5 (user=redwan)

const app = express();

mongoose.connect("mongodb+srv://redwan:" + process.env.MONGO_ATLAS_PW + "@cluster0.glzef.mongodb.net/mean-stack?retryWrites=true&w=majority")
.then(() => {
  console.log('Connection Established!');
})
.catch(() => {
  console.log('Connection Failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", authRoutes);

module.exports = app;

