const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const dbUrl = config.get("dbUrl");
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log(`Connected to ${dbUrl}`))
    .catch((e) => console.log("Error in connecting to db: " + e));
};
