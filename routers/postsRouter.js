const { Router } = require("express");
const postsRouter = Router();
const passport = require("passport");
const verify = require("../customMiddleware/verify");
const {
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postsController");

postsRouter.get("/:id", getPost);
postsRouter.post("/", createPost);
postsRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verify.postOwner,
  updatePost
);
postsRouter.put("/:id/publish", (req, res) => {
  res.send("WIP publish post");
});
postsRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verify.postOwner,
  deletePost
);

module.exports = postsRouter;
