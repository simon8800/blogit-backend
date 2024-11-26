const userQueries = require("../db/userQueries");
const passwordUtils = require("../utils/passwordUtils");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// POST /login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userQueries.findByEmail(email);
  if (await passwordUtils.isValidPassword(password, user.hash)) {
    const opts = {};
    opts.expiresIn = "14 days"; // expires in 14 days
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: user.email, id: user.id }, secret, opts);
    return res.status(200).json({
      message: "Auth passed",
      token,
    });
  }

  return res.status(401).json({ message: "Auth failed" });
};

// GET /logout
const logout = async (req, res) => {
  res.status(200).json({ message: "Please logout user from client-side" });
};

// POST /signup
const signup = async (req, res) => {
  const { email, name, password } = req.body;
  const hash = await passwordUtils.genPassword(password);
  const user = await userQueries.create({ email, name, hash });
  if (!user) {
    return res
      .status(401)
      .json({ message: "There was an issue creating a new user" });
  }
  return res.status(200).json({ message: "User created!", user: user });
};

module.exports = { login, logout, signup };
