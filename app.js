// Modules imports
require("dotenv").config();

// Express imports
const express = require("express");
const app = express();

// Routers imports
const userRouter = require("./routers/usersRouter");
const postsRouter = require("./routers/postsRouter");

// Controllers imports
const { login, logout, signup } = require("./controllers/authController");

// Middleware imports
const logger = require("./customMiddleware/logger");
const errorHandler = require("./customMiddleware/errorHandler");
const cors = require("cors");

/*
 * ------> MIDDLEWARES <------
 */
app.use(logger); // logs request method and request route
app.use(express.json()); // enables parsing json in req.body
app.use(cors());

/*
 * ------> PassportJS SETUP <------
 */
const passport = require("passport");
const jwtStrategy = require("./strategies/jwtStrategy");
app.use(passport.initialize());
passport.use(jwtStrategy);

/*
 * ------> ROUTERS <------
 */
app.use("/api/users", userRouter);
app.use("/api/posts", postsRouter);

/*
 * ------> AUTHENTICATION <------
 */
app.post("/api/login", login);
app.post("/api/signup", signup);
app.get(
  "/api/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req:", req.user);
    return res.status(200).send("Access to protected route granted");
  }
);

// Error handler middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
