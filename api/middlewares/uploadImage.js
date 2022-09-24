const fs = require("fs");
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No file was selected" });
    }
    const files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "File format not supported" });
      }
      if (file.size > 1024 * 1024 * 5) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "File size is too big" });
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({ message: "There was a server error" });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
