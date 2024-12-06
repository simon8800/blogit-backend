const { Router } = require("express");
const usersRouter = Router();
const passport = require("passport");
const {
  getUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  getCurrentUserPosts,
} = require("../controllers/usersController");

// Get current user's information
usersRouter.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

// Get current user's posts
usersRouter.get(
  "/me/posts",
  passport.authenticate("jwt", { session: false }),
  getCurrentUserPosts
);

usersRouter.get("/", (req, res) => {
  res.send("Hello from user router!");
});

usersRouter.get("/:id", getUser);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
