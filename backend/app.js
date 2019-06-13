const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const postsRoutes = require("./routes/posts");
const app = express();
// Password NetGKO6qoNkRr6UJ
mongoose.connect("mongodb+srv://vincent:NetGKO6qoNkRr6UJ@cluster0-wys5y.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database.");
  })
  .catch(() => {
    console.log("Connection failed.");
  });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));
// grant permission to image folder
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  // "*" means no matter which domain sending request is allowed
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
  next();
});

// Redirect to api/post
app.use("/api/posts", postsRoutes);

module.exports = app;
