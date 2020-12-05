const User = require("../models/user");
exports.isLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const person = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    res.locals.nick = person.nick;
    const point = person.point;

    if (point < 250) {
      res.locals.medal = "bronze_4";
    } else {
      res.locals.medal = "gold_1";
    }

    if (point >= 1000000000) {
      res.locals.medal = "challenger_1";
    } else if (point >= 100000000) {
      res.locals.medal = "grandmaster_1";
    } else if (point >= 10000000) {
      res.locals.medal = "mastre";
    } else if (point >= 7500000) {
      res.locals.medal = "diamond_1";
    } else if (point >= 5000000) {
      res.locals.medal = "diamond_2";
    } else if (point >= 2500000) {
      res.locals.medal = "diamond_3";
    } else if (point >= 1000000) {
      res.locals.medal = "diamond_4";
    } else if (point >= 750000) {
      res.locals.medal = "platinum_1";
    } else if (point >= 500000) {
      res.locals.medal = "platinum_2";
    } else if (point >= 250000) {
      res.locals.medal = "platinum_3";
    } else if (point >= 100000) {
      res.locals.medal = "platinum_4";
    } else if (point >= 75000) {
      res.locals.medal = "gold_1";
    } else if (point >= 50000) {
      res.locals.medal = "gold_2";
    } else if (point >= 25000) {
      res.locals.medal = "gold_3";
    } else if (point >= 10000) {
      res.locals.medal = "gold_4";
    } else if (point >= 7500) {
      res.locals.medal = "silver_1";
    } else if (point >= 5000) {
      res.locals.medal = "silver_2";
    } else if (point >= 2500) {
      res.locals.medal = "silver_3";
    } else if (point >= 1000) {
      res.locals.medal = "silver_4";
    } else if (point >= 750) {
      res.locals.medal = "bronze_1";
    } else if (point >= 500) {
      res.locals.medal = "bronze_2";
    } else if (point >= 250) {
      res.locals.medal = "bronze_3";
    } else if (point >= 100) {
      res.locals.medal = "bronze_4";
    } else if (point >= 75) {
      res.locals.medal = "iron_1";
    } else if (point >= 50) {
      res.locals.medal = "iron_2";
    } else if (point >= 25) {
      res.locals.medal = "iron_3";
    } else {
      res.locals.medal = "iron_4";
    }
    res.locals.point = point;
    next();
  } else {
    res.redirect("/");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};
