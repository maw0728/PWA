const express = require("express");
const User = require("../models/user");
const router = express.Router();
const passport=require('passport');

router.get('/main',(req,res)=>{
  res.render('main',{user:req.user});
})

router.get("/", (req, res) => {
  res.render("login");
});

router.post('/login_process',
  passport.authenticate('local', { successRedirect: '/main',
                                   failureRedirect: '/' }));

router.get('/logout', (req, res)=> {
  
  req.logout();
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
})});




module.exports = router;
