const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = req.body.userId;
    const extension = "jpg";

    callback(null, name + "." + extension);
  },
});

module.exports = multer({ storage }).single("image");