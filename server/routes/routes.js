require("dotenv").config();
const express = require("express");
const multer = require("multer");
const {
  uploadImage,
  imageUploadController,
} = require("../controller/fileupload");
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// Route to handle image upload
router.post("/upload", upload.single('Image'), imageUploadController);

// GET API route
router.get("/getImages", (req, res) => {
  res.send({ message: "GET Iamges example" });
});

module.exports = router;
