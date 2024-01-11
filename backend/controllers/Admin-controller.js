const Admin = require("../models/Admin");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Addadmin = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const exist = await Admin.findOne({ email });
    if (exist) {
      return res.status(400).send("admin already exists");
    }
    const hashpassword = bcryptjs.hashSync(password);
    let admin;
    admin = new Admin({
      email,
      password: hashpassword,
      confirmPassword: hashpassword,
    });

    admin.save();
    return res.status(200).send("admin account created");
  } catch (err) {
    return next(err);
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const exist = await Admin.findOne({ email });
    if (!exist) {
      return res.status(400).send("admin not found");
    }

    const hashpaasword = bcryptjs.compareSync(password, exist.password);
    if (!hashpaasword) {
      return res.status(404).send("invalid password");
    }
    const token = jwt.sign({ id: exist._id }, process.env.secretkey, {
      expiresIn: 360000,
    });
    return res
      .status(200)
      .json({ message: "athentication sucessfull", token, id: exist._id });
    let login;
    login = new Admin({ email, password: hashpaasword });
    login.save();
    return res.status(200).send("admin successfully logged in");
  } catch (err) {
    return next(err);
  }
};

module.exports = { Addadmin, adminLogin };
