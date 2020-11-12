const passport=require('passport');
const local=require('./localStrategy');

module.exports=()=>{
passport.serializeUser((user,done)=>{
    console.log('serializeUser',user)
    done(null,user);
  });
  passport.deserializeUser((id,done)=>{
    console.log('deserializeUser',id);
    /* User.findOne({where:{id}}).then(id=>done(null,user)).catch(err=>done(err)) */
    done(null,id);
  })
  local();
}