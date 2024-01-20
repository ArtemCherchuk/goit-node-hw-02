const { User } = require("../models/user");
const { httpError, ctrWrapper } = require("../helpers");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { SECRET_KEY } = process.env;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }
  const passwordCompare = bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw httpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res
    .status(200)
    .json({ token, email: user.email, subscription: user.subscription });
};

const userCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const userLogOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "Logout success" });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate({ _id }, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  registerUser: ctrWrapper(registerUser),
  loginUser: ctrWrapper(loginUser),
  userCurrent: ctrWrapper(userCurrent),
  userLogOut: ctrWrapper(userLogOut),
  updateSubscription: ctrWrapper(updateSubscription),
};
