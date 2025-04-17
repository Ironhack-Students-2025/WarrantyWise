const express = require("express");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
