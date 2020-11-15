const express = require("express");
const axios = require("axios").default;
const User = require("../models/user");
const router = express.Router();
const {isLoggedIn,isNotLoggedIn}=require('./middleware');

router.get("/",isNotLoggedIn, (req, res) => {
  res.render("register");
});


router.post("/register_process",isNotLoggedIn, (req, res) => {
  User.create({
    userId: req.body.id,
    password: req.body.password,
    nick: req.body.nick,
  });
  res.redirect("/");
});

router.post("/idCheck", isNotLoggedIn,async (req, res, next) => {
  console.log(req.body.ids);
  try {
    const maxId = await User.findAll({
      attributes: ["id"],
    });

    const checkId = req.body.ids;
    let users;
    let check = false;

    for (let i = 1; i < maxId.length + 1; i++) {
      users = await User.findOne({
        attributes: ["userId"],
        where: {
          id: i,
        },
      });
      if (checkId === users.userId) {
        check = true;
      }
    }

    console.log(check);
    res.send({ check: check });
  } catch (error) {
    next(error);
  }
});

router.post("/nickCheck", isNotLoggedIn, async (req, res, next) => {
  try {
    const maxId = await User.findAll({
      attributes: ["id"],
    });

    const checkId = req.body.nicks;
    let users;
    let check = false;

    for (let i = 1; i < maxId.length + 1; i++) {
      users = await User.findOne({
        attributes: ["nick"],
        where: {
          id: i,
        },
      });
      if (checkId === users.nick) {
        check = true;
      }
    }

    console.log(check);
    res.send({ check: check });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
