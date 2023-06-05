require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const {
  uploadImage,
  imageUploadController,
  getImageController,
} = require("../controller/fileupload");
const passport = require("../controller/authController");
const { User } = require("../models/UserSchema");
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

// Route to handle user login
router.post("/login", passport.authenticate("local"), (req, res) => {
  // User authentication succeeded, redirect or send a success response
  console.log('>>>',res)
  res.json({ message: "Login successful" });
});

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }
    console.log('>>>',password,username,email, req.body)
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('>>>',hashedPassword)

    // Create a new user
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Route to handle image upload
router.post("/upload", upload.single("Image"), imageUploadController);

// GET API route
router.get("/getImages", getImageController);

module.exports = router;
