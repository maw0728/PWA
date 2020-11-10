const express = require("express");
const User = require("../models/user");
const router = express.Router();


router.get('/main',(req,res)=>{
  console.log('req.user',req.user)
  res.render('main');
})

router.get("/", (req, res) => {
  
  res.render("login");
});



module.exports = router;
