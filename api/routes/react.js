const express = require("express");
const { react, getReacts } = require("../controllers/react");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/react", auth, react);
router.get("/react/:postId", auth, getReacts);

module.exports = router;
