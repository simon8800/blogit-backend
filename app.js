require("dotenv").config();
const express = require("express");
const app = express();
const { login, logout, signup } = require("./controllers/authController");
const userRouter = require("./routers/usersRouter");
const postsRouter = require("./routers/postsRouter");
const logger = require("./customMiddleware/logger");
const errorHandler = require("./customMiddleware/errorHandler");

/*
 * ------> MIDDLEWARES <------
 */
app.use(logger);
app.use(express.json());

/*
 * ------> ROUTERS <------
 */
app.use("/users", userRouter);
app.use("/posts", postsRouter);

// Hello World
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

/*
 * ------> AUTHENTICATION <------
 */
app.post("/login", login);

app.post("/signup", signup);

app.get("/logout", logout);

// Error handler middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
});
