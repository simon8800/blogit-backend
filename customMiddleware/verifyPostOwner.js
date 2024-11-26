const postQueries = require("../db/postQueries");
const asyncHandler = require("express-async-handler");

const verifyPostOwner = asyncHandler(async (req, res, next) => {
  const userId = req.user.id; // Available by PassportJS
  const postId = parseInt(req.params.id);

  // Get post by id
  const post = await postQueries.findById(postId);

  // Post not found
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // User ID does not match Post's author ID
  if (post.authorId !== userId) {
    return res
      .status(403)
      .json({ message: "Forbidden: You do not own this post" });
  }

  // User ID matches Post's author ID
  next();
});

module.exports = verifyPostOwner;
