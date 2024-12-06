const { Router } = require("express");
const postsRouter = Router();
const passport = require("passport");
const {
  getPost,
  getLatestPosts,
  createPost,
  updatePost,
  deletePost,
  publishPost,
} = require("../controllers/postsController");

postsRouter.get("/latest", getLatestPosts);

postsRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getPost
);

postsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createPost
);

postsRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updatePost
);

postsRouter.put(
  "/:id/publish",
  passport.authenticate("jwt", { session: false }),
  publishPost
);

postsRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

module.exports = postsRouter;
