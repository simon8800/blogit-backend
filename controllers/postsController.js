const expressAsyncHandler = require("express-async-handler");
const PostQueries = require("../db/postQueries");

const getLatestPosts = expressAsyncHandler(async (req, res) => {
  try {
    const { limit } = req.query;
    const posts = await PostQueries.getLatestPosts(limit);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch latest posts" });
  }
});

const getPost = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const processedId = parseInt(id);

    if (isNaN(processedId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const post = await PostQueries.findById(processedId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // If post is published, return it
    if (post.published) {
      return res.status(200).json(post);
    }

    // For unpublished posts, check if user is the author
    if (post.author.id !== req.user.id) {
      return res.status(403).json({ error: "You can only view your own unpublished posts" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

const createPost = expressAsyncHandler(async (req, res) => {
  const { title, content, published = false } = req.body;

  // Ensure user is authenticated
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    // Create post with published state
    const createdPost = await PostQueries.create({
      title,
      content,
      authorId: req.user.id,
      published: Boolean(published) // Ensure published is a boolean
    });

    res.status(201).json(createdPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

const updatePost = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const processedId = parseInt(id);

    if (isNaN(processedId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    // Find the post first
    const post = await PostQueries.findById(processedId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user is the author
    if (post.author.id !== req.user.id) {
      return res.status(403).json({ error: "You can only update your own posts" });
    }

    // Update the post
    const updatedPost = await PostQueries.update(processedId, req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

const publishPost = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Ensure valid ID
    const processedId = parseInt(id);
    if (isNaN(processedId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    // Check if post exists
    const existingPost = await PostQueries.findById(processedId);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Verify user owns the post
    if (existingPost.author.id !== req.user.id) {
      return res.status(403).json({ error: "You can only publish/unpublish your own posts" });
    }

    // Toggle publish state
    const updatedPost = await PostQueries.togglePublish(processedId);

    res.status(200).json({
      message: updatedPost.published ? "Post published successfully" : "Post unpublished successfully",
      post: updatedPost
    });
  } catch (error) {
    console.error('Error toggling post publish state:', error);
    res.status(500).json({ error: "Failed to update post publish state" });
  }
});

const deletePost = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const processedId = parseInt(id);

    if (isNaN(processedId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    // Find the post first
    const post = await PostQueries.findById(processedId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user is the author
    if (post.author.id !== req.user.id) {
      return res.status(403).json({ error: "You can only delete your own posts" });
    }

    // Delete the post
    await PostQueries.deleteById(processedId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = {
  getPost,
  getLatestPosts,
  createPost,
  updatePost,
  deletePost,
  publishPost
};
