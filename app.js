const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");
const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');

dotenv.config();
const pageRouter = require("./routes/index");
const registerRouter = require("./routes/register");
const { sequelize, User } = require("./models");
// const passportConfig = require("./passport");

const app = express();
// passportConfig(); // 패스포트 설정
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser((user,done)=>{
  console.log('serializeUser',user.userId)
  done(null,user.userId);
});
passport.deserializeUser((id,done)=>{
  console.log('deserializeUser',id);
  User.findOne({where:{id}}).then(id=>done(null,id)).catch(err=>done(err))
})

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
      if(password===exUser.password){
        done(null,exUser);
      }else{
        done(null,false,{message:'비밀번호가 일치하지 않습니다.'});
      }
    }else{
      done(null,false,{message:'가입되지 않은 회원입니다.'});
    }
    
  }catch(err){
    console.error(err);
    done(err);
  }
  }));

  app.post('/login_process',
  passport.authenticate('local', { successRedirect: '/main',
                                   failureRedirect: '/' }));
  

app.use("/", pageRouter);
app.use("/register", registerRouter);
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
