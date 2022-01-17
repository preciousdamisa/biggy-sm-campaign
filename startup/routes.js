const user = require("../routes/user");
const winner = require("../routes/winner");
const error = require("../middleware/error");

module.exports = (app) => {
  app.use("/api/users", user);
  app.use("/api/winners", winner);
  app.use(error);
};
