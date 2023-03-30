const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "You are not authorized" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "You are not authorized" });
    req.user = user;
    next();
  });
};
module.exports = authenticateUser;
