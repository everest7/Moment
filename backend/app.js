const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
// Password NetGKO6qoNkRr6UJ
mongoose.connect("mongodb+srv://vincent:NetGKO6qoNkRr6UJ@cluster0-wys5y.mongodb.net/node-angular", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database.");
  })
  .catch(() => {
    console.log("Connection failed.");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
// grant permission to image folder
app.use("/images", express.static(path.join("backend/images")));

// "*" means no matter which domain sending request is allowed
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Redirect to api/post
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;

