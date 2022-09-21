const express = require("express");
const app = express();
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const tagRoutes = require("./tagRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

app.use(authRoutes);
app.use("/user", userRoutes);
app.use("/tag", tagRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

module.exports = app;
