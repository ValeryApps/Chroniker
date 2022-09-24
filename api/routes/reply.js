const express = require("express");
const { reply, getReplies } = require("../controllers/reply");
const { auth } = require("../middlewares/auth");

const router = express.Router();
router.post("/reply", auth, reply);
router.get("/reply/:commentId", auth, getReplies);

module.exports = router;
