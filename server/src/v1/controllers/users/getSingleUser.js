const User = require("../../models/User");

const getSingleUser = async (req, res) => {
  if (!req.params.userId) {
    return res.status(400).json({ message: "User Id is required" });
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = getSingleUser;
