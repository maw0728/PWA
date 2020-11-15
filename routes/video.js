const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("videoList");
});
router.get("create", (req, res) => {
  res.render("videoDetail", { req: "create" });
});
router.get;
module.exports = router;
