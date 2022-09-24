const express = require("express");
const { createGroup, getUserGroups } = require("../controllers/group");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/group", auth, createGroup);
router.get("/groups", auth, getUserGroups);

module.exports = router;
