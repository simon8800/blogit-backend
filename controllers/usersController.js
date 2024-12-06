const expressAsyncHandler = require("express-async-handler");
const UserQueries = require("../db/userQueries");
const PostQueries = require("../db/postQueries");

/*
GET /users/:id
Supply ID
*/
const getUser = expressAsyncHandler(async (req, res) => {
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
PUT /users/:id
Supply ID and name
*/
const updateUser = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const processedId = parseInt(id);
    const { name } = req.body;
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
const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const processedId = parseInt(id);
  try {
    const deletedUser = await UserQueries.deleteById(processedId);
    res.status(200).json({ message: "Successfully deleted user" });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete user" });
  }
});

const getCurrentUser = expressAsyncHandler(async (req, res) => {
  // Ensure user is authenticated
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const user = await UserQueries.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      handle: user.handle
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: "Failed to fetch user information" });
  }
});

const getCurrentUserPosts = expressAsyncHandler(async (req, res) => {
  // Ensure user is authenticated
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const posts = await PostQueries.findByAuthorId(req.user.id);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  getCurrentUserPosts
};
