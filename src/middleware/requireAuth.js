const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(403).send("Access Denied");
  if (token.startsWith("Bearer")) token = token.split(" ")[1];
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id, name, email } = await User.findOne({ _id: payload.userId });
    req.user = { userId: _id, name, email };
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};
module.exports = requireAuth;
