const multer = require("multer");
const path = require("path");

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

// file filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed"), false);
  }

  cb(null, true);
};

// multer config
const upload = multer({
  storage,
  limits: {
    files: 3,
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

module.exports = upload;