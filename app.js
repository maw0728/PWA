const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");
const passportConfig = require("./passport");

dotenv.config();
const pageRouter = require("./routes/index");
const registerRouter = require("./routes/register");
const movie = require("./routes/movie");
const { sequelize, User } = require("./models");
// const passportConfig = require("./passport");

const app = express();
passportConfig();
// passportConfig(); // 패스포트 설정
app.set("port", process.env.PORT || 3000);
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
app.use("/movie", express.static(path.join(__dirname, "videos/movie")));
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

app.use("/", pageRouter);
app.use("/register", registerRouter);
app.use("/movie", movie);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
