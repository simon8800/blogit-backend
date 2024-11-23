const { create: createUser } = require("../db/userQueries");
const passwordUtils = require("../utils/passwordUtils");

// POST /login
const login = async (req, res) => {
  res.send("hello from login");
};

// GET /logout
const logout = async (req, res) => {
  res.send("hello from logout");
};

// POST /signup
const signup = async (req, res) => {
  const { email, name, password } = req.body;
  const hash = await passwordUtils.genPassword(password);
  const user = await createUser({ email, name, hash });
  res.status(200).json({ message: "User created!", user: user });
};

module.exports = { login, logout, signup };
