const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) { // if the user does not exist
        return res.status(401).json({
          message: "Auth failed1"
        });
      }
      fetchedUser = user;
      // compares the input password and password in db, checks if they generate the same hashcode. 
      // Return a promise
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed2"
        });
      }
      // We know at this point we have a valid input, generate a token in the server
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id }, 
        'secret_this_should_be_longer', 
        {expiresIn: '1h'}
      );
      // return the token to front-end
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id // parse the user id to front end
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Auth failed3"
      });
    })
});

module.exports = router;
