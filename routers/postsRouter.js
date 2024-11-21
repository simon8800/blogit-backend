const { Router } = require("express");
const postsRouter = Router();
const {
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postsController");

postsRouter.get("/:id", getPost);
postsRouter.post("/", createPost);
postsRouter.put("/:id", updatePost);
postsRouter.put("/:id/publish", (req, res) => {
  res.send("WIP publish post");
});
postsRouter.delete("/:id", deletePost);

module.exports = postsRouter;
