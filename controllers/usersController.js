const asyncHandler = require("express-async-handler");
const UserQueries = require("../db/userQueries");

/*
GET /users/:id
Supply ID
*/
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const processedId = parseInt(id);
  const user = await UserQueries.findById(processedId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(user);
});

/*
POST /users/
*/
const createUser = asyncHandler(async (req, res) => {
  try {
    const { email, name } = req.body;
    const createdUser = await UserQueries.create({ email, name });
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(404).json({ error: error.mestr567sage });
  }
});

/*
PUT /users/:id
Supply ID and name
*/
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const processedId = parseInt(id);
  try {
    const updatedUser = await UserQueries.update(processedId, name);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/*
DELETE /users/:id
Supply ID
*/
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const processedId = parseInt(id);
  try {
    await UserQueries.deleteById(processedId);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
