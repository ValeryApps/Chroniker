const express = require("express");
const { upload, getImages } = require("../controllers/uploadController");
const { uploadImage } = require("../middlewares/uploadImage");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/upload", auth, uploadImage, upload);
router.post("/images", auth, getImages);

module.exports = router;
