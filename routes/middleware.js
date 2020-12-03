exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.nick = req.user.nick;
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
