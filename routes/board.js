const express = require("express");
const User = require("../models/user");
const Board = require('../models/board');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn}=require('./middleware');


router.use('*',isLoggedIn);

//board list
router.get('/',async(req,res,next)=>{
    
    try{
    const boards=await Board.findAll();
    res.render('board',{boards,type:"list"});
    }catch(err){
        console.error(err);
        next(err);
    }
})

//board createForm
router.get('/create',(req,res)=>{
    console.log(req.user)
    res.render('board',{writer:req.user.nick,type:"create"});
        
})

//board createComplete
router.post('/create_process',(req,res)=>{
    const {title,content,writer}=req.body;
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

//title click => detail page
router.get('/:id',async(req,res,next)=>{
    try{
    const boards=await Board.findOne({where:{id:req.params.id}});
    boards.views=boards.views+1;
    boards.save();
    res.render('board',{boards,type:"view"});
    }catch(err){
        console.error(err);
        next();
    }
});

//board updateForm
router.post("/update/:id", async (req, res, next) => {
    try {
      const boards = await Board.findOne({ where: { id: req.params.id } });
      res.render("board", { boards, type: "update" });
    } catch (error) {
      console.log(error);
      next();
    }
  });

//board updateComplete
router.post('/update_process/:id',async(req,res,next)=>{
    try{
        const boards =await Board.update({
            title:req.body.updateTitle,
            content:req.body.updateContent,
        },{where:{id:req.params.id},});
        res.redirect(`/board/${req.params.id}`);
}catch(err){
    console.error(err);
    next(err);
}
});

//board delete
router.post('/delete/:id',async(req,res,next)=>{
    try{
        await Board.destroy({where:{id:req.params.id},force:true});
        res.redirect('/board');
    }catch(err){
        console.error(err);
        next();
    }
})


module.exports=router;