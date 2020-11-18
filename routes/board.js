const express = require("express");
const User = require("../models/user");
const Board = require('../models/board');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn}=require('./middleware');

router.use('*',isLoggedIn);

router.get('/',async(req,res,next)=>{
    
    try{
    const boards=await Board.findAll();
    res.render('board',{boards});
    }catch(err){
        console.error(err);
        next(err);
    }
})
router.get('/create',(req,res)=>{
    console.log(req.user)
    res.render('board_create',{writer:req.user.nick});
        
})

router.post('/create_process',(req,res)=>{
    console.log('req.user',req.user)
    const {title,content,writer}=req.body;
    console.log(writer);
    
    Board.create({
        title,
        content,
        writer:req.user.nick,
        userid:req.user.id
    }).then(result=>{
        console.log('글추가완료');
        res.redirect('/board');
    }).catch(err=>{
        console.error(err);
    }) 
});

router.get('/:id',async(req,res,next)=>{
    
    try{
    const board=await Board.findOne({where:{id:req.params.id}});
    console.log('board',board)
    res.render('board_content',{board});
    }catch(err){
        console.error(err);
        next(err);
    }
})


module.exports=router;