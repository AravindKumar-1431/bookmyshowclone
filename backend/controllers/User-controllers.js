const Users = require("../models/Users");

const getAllusers = async (req, res, next) => {
  let users;

  try {
    users = await Users.find();
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(500).json({ message: "error" });
  }

  return res.status(200).json({ users });
};
module.exports = { getAllusers };
