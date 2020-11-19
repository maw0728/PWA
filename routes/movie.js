const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//영화 전용 폴더 확인
try {
  fs.readdirSync("videos/movie");
} catch (error) {
  console.error("movie 폴더가 없어 movie 폴더를 생성합니다.");
  fs.mkdirSync("videos");
  fs.mkdirSync("videos/movie");
}

//영화 업로드
const movie = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "videos/movie/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

// 영화 목록 조회
router.get("/", async (req, res) => {
  try {
    const movie = await Movie.findAll();
    res.render("movie/movieList", { type: "list", movie });
  } catch (error) {
    console.log(error);
  }
});

// 영화 생성 페이지
router.get("/create", (req, res) => {
  res.render("movie/movieDetail", { type: "create" });
});

//영화 생성 하기
router.post("/create", movie.single("movie"), (req, res) => {
  const { name, director, actor, year, country, category } = req.body;
  console.log(req.body);
  Movie.create({
    name,
    director,
    actor,
    year,
    country,
    category,
    class: req.body.clas,
    runningTime: null,
    note: null,
    userid: req.user.id,
    original: req.file.filename,
  });
  res.redirect(301, "/movie");
});

//영화보기
router.get(`/?:id`, async (req, res) => {
  try {
    const movie = await Movie.findOne({ where: { id: req.params.id } });
    res.render("movie/movieDetail.html", { type: "read", movie });
  } catch (error) {
    console.log(error);
  }
});

// 영화 수정 페이지
router.get("/update/:id", (req, res) => {
  res.render("movie/movieDetail.html", { type: "update" });
});

//영화 수정 하기
router.post("/update/:id", (req, res) => {
  res.render("movie/movieDetail.html", { type: "update" });
});

//영화 삭제 하기
router.get("/delete/:id", async (req, res) => {
  try {
    await Notice.destroy({
      where: { id: req.params.id },
    });
    res.redirect("movie/movieList");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
