const express = require("express");
const app = express();
const dbUrl = "mongodb://127.0.0.1:27017/blogDB";
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./Routes/routes");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/blogAPI/v1", routes);

//Routes not specified then goes to this block

app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

app.use((req, res, next) => {
  next({
    status: 404,
    msg: "Not found",
  });
});

//Error handler

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let msg = err.msg || "Server Error";
  console.error(err);

  res.status(status).json({
    result: "null",
    msg: msg,
    status: false,
  });
});

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: true,
    autoIndex: true,
  })
  .then((result) => {
    console.log("DB connected succesfully");

    app.listen(process.env.PORT || 8090, (err) => {
      if (err) {
        console.log("Errror connecting to server");
      } else {
        console.log("Server up and runnning");
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
