const { User } = require("../models/user");

const getWinners = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("firstName lastName email phone entries")
      .sort({ entries: -1 })
      .limit(10);

    res.send({
      message: "Winners gotten successfully",
      winnerCount: users.length,
      data: users,
    });
  } catch (e) {
    next(new Error("Error in getting winners: " + e));
  }
};

exports.getWinners = getWinners;
