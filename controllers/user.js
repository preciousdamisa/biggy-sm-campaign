const _ = require("lodash");

const {
  User,
  validateSignupReqBody,
  validateLoginReqBody,
  validateGetEntriesReqBody,
} = require("../models/user");

const signup = async (req, res, next) => {
  try {
    const { error } = validateSignupReqBody(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { firstName, lastName, email, phone } = req.body;

    let user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user)
      return res.status(400).send({ message: "User already registered" });

    user = User({ firstName, lastName, email, phone });
    await user.save();

    const { refId } = req.query;
    if (refId) {
      const referrer = await User.findById(refId);
      if (referrer) {
        await User.updateOne({ _id: refId }, { $inc: { entries: 1 } });
      }
    }

    res.status(201).send({
      message: "Signup successful",
      data: _.pick(user, ["_id", "firstName", "lastName", "email", "phone"]),
    });
  } catch (e) {
    next(new Error("Error in signing up: " + e));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, phone } = req.body;

    if (!(email || phone))
      return res
        .status(400)
        .send({ message: "Email or phone is required to login" });

    const { error } = validateLoginReqBody(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (!user) return res.status(404).send({ message: "User not registered" });

    res.send({
      message: "Login successful",
      data: _.pick(user, ["_id", "firstName", "lastName", "email", "phone"]),
    });
  } catch (e) {
    next(new Error("Error in logging in: " + e));
  }
};

const getEntries = async (req, res, next) => {
  try {
    const { error } = validateGetEntriesReqBody(req.params);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.params.userId).select(
      "firstName lastName entries"
    );
    if (!user) return res.status(404).send({ message: "User not found" });

    res.send({
      message: "Entries gotten successfully",
      data: {
        name: `${user.firstName} ${user.lastName}`,
        entries: user.entries,
      },
    });
  } catch (e) {
    next(new Error("Error in getting entries: " + e));
  }
};

exports.signup = signup;
exports.login = login;
exports.getEntries = getEntries;
