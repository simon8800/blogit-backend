const expressAsyncHandler = require("express-async-handler");
const PostQueries = require("../db/postQueries");

const getPost = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const processedId = parseInt(id);
  const post = await PostQueries.findById(processedId);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  res.status(200).json(post);
});

const createPost = expressAsyncHandler(async (req, res) => {
  const { title, content, authorEmail } = req.body;
  try {
    const createdPost = await PostQueries.create({
      title,
      content,
      authorEmail,
    });
    res.status(200).json(createdPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const updatePost = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const processedId = parseInt(id);
    const { title, content } = req.body;
    const updatedPost = await PostQueries.update(processedId, title, content);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const deletePost = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const processedId = parseInt(id);
  try {
    const deletedPost = await PostQueries.deleteById(processedId);
    res.status(200).json({ message: "Successfully deleted post" });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete post" });
  }
});

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost,
};
