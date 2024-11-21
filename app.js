const express = require("express");
const app = express();
const userRouter = require("./routers/usersRouter");
const logger = require("./customMiddleware/logger");
const errorHandler = require("./customMiddleware/errorHandler");

app.use(logger);
app.use(express.json());
// User router
// WIP
app.use("/users", userRouter);

/*
TBD
Blog router
User auth
*/

// Hello World
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// Error handler middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
