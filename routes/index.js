const express = require("express");
const User = require("../models/user");
const router = express.Router();
const passport=require('passport');
const {isLoggedIn,isNotLoggedIn}=require('./middleware');



router.get('/main',isLoggedIn,(req,res)=>{
  res.render('main',{user:req.user});
})

router.get("/",isNotLoggedIn, (req, res) => {
  res.render("login");
});

router.post('/login_process',isNotLoggedIn,
  passport.authenticate('local', { successRedirect: '/main',
                                   failureRedirect: '/' }));

router.get('/logout',isLoggedIn, (req, res)=> {
  
  req.logout();
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
})});


module.exports = router;
