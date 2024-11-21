const { Router } = require("express");
const userRouter = Router();

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

userRouter.get("/", (req, res) => {
  res.send("Hello from user router!");
});

userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
