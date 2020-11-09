const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("register");
});
router.post("/register_process", (req, res) => {
  User.create({
    userId: req.body.id,
    password: req.body.password,
    nick: req.body.nick,
  });
  res.redirect("/");
});

module.exports = router;
