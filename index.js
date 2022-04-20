require('events').EventEmitter.prototype._maxListeners = 100;
const express = require("express");

const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const userRoute = require("./app/routes/users");

const authRoute = require("./app/routes/auth");

const config = require("./app/config/config");

const dbUrl = config.dbUrl;

const appPort = config.appPort;

dotenv.config();

mongoose
  .connect(`${dbUrl}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/v1/users", userRoute);

app.use("/api/v1/auth", authRoute);

app.listen(appPort, () => {
  console.log(`Server running on port ${appPort}`);
});
