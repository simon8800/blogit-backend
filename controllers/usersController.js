const asyncHandler = require("express-async-handler");
const userQueries = require("../db/userQueries");

/*
GET /users/:id
Supply ID
*/
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const processedId = parseInt(id);
  const user = await userQueries.findById(processedId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(user);
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
    const updatedUser = await userQueries.update(processedId, name);
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
    await userQueries.deleteById(processedId);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
