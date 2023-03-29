const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: checkEmail.email, _id: checkEmail._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );
    res
      .status(200)
      .json({ token, email: checkEmail.email, _id: checkEmail._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = loginUser;
