const Users = require("../models/Users");
const bcryptjs = require("bcryptjs");
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

const userSignup = async (req, res, next) => {
  try {
    const { fullname, email, password, confrimpassword } = req.body;

    const exist = await Users.findOne({ email });
    if (exist) {
      return res.status(200).send("user already exist");
    }

    if (password != confrimpassword) {
      return res.status(200).send("password not matched");
    }

    if (
      !fullname &&
      fullname.trim() === "" &&
      !email &&
      email.trim() == "" &&
      !password &&
      password.trim() === "" &&
      !confrimpassword &&
      confrimpassword.trim() === ""
    ) {
      return res.status(200).send("invalid inputs");
    }
    const hashpassword = bcryptjs.hashSync(password);
    let signup = new Users({
      fullname,
      email,
      password: hashpassword,
      confrimpassword: hashpassword,
    });
    signup.save();

    return res.status(200).send("account created successfully");
  } catch (err) {
    console.log(err);
    return res.status(404).send("server error");
  }
};

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && email.trim() == "" && !password && password.trim() === "") {
      return res.status(200).send("invalid inputs");
    }
    const exist = await Users.findOne({ email });
    if (!exist) {
      return res.status(404).send("user not found");
    }
    const hashpaasword = bcryptjs.compareSync(password, exist.password);
    if (!hashpaasword) {
      return res.status(404).send("invalid password");
    }

    let login = new Users({ email, password });
    login.save();
    return res.status(200).send("user logined successfully");
  } catch (err) {
    console.log(err);
    return res.status(404).send("server error");
  }
};
module.exports = { getAllusers, userSignup, userlogin };
