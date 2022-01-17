const config = require("config");

module.exports = function () {
  if (!config.get("dbUrl")) {
    throw new Error("FATAL ERROR: dbUrl is not defined.");
  }
};
