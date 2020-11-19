const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt= require('bcrypt');

module.exports=()=>{
passport.use(new LocalStrategy(
    {
      usernameField: 'userId',
    passwordField: 'password'
    },
  async(userId, password, done)=> {
    console.log('LocalStrategy',userId,password);
    try{
    const exUser=await User.findOne({where:{userId}});
    console.log('exUser',exUser);
    if(exUser){
        bcrypt.hash(password,10,(err,hash)=>{
          bcrypt.compare(exUser.password, hash, function(err, result){
            if(result){
              done(null,exUser);
            }else{
              done(null,false,{message:'비밀번호가 일치하지 않습니다.'});
            }
        })})
    }else{
      done(null,false,{message:'가입되지 않은 회원입니다.'});
    }
    
  }catch(err){
    console.error(err);
    done(err);
  }
  }));
};