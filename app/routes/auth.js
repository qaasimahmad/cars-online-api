const router = require("express").Router();
const User = require("../models/User");
const userSchema = require("../schemas/user");
const authSchema = require("../schemas/auth");
const validator = require("../middleware/Validator");
const CryptoJS = require("crypto-js");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

router.post("/register", validator(userSchema), async (req, res) => {
  const password = CryptoJS.AES.encrypt(
    `${req.body.password}`,
    config.passSecret
  ).toString();
  const newUserDetails = { ...req.body, password };
  const newUser = new User(newUserDetails);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", validator(authSchema), async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      res.status(404).json(`No user with name ${req.body.username} exists!`);
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      config.passSecret
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      config.jwtSecret,
      { expiresIn: "2d" }
    );
    const { password, ...others } = user._doc;
    req.body.password !== originalPassword
      ? res.status(401).json("Invalid Password Supplied")
      : res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
