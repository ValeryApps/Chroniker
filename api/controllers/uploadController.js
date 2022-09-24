const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
exports.upload = async (req, res) => {
  try {
    const { path } = req.body;

    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTemp(file.tempFilePath);
    }
    return res.json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getImages = async (req, res) => {
  const { path, sort, max } = req.body;
  try {
    const result = await cloudinary.v2.search
      .expression(`${path}`)
      .sort_by("uploaded_at", `${sort}`)
      .max_results(`${max}`)
      .execute();
    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const uploadToCloudinary = (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: path },
      (err, res) => {
        if (err) {
          removeTemp(file.tempFilePath);
          return res?.status(400).json({ message: "Upload image failed" });
        }
        resolve({ url: res.secure_url });
      }
    );
  });
};

const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
