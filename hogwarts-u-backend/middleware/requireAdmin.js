const jwt = require("jsonwebtoken");
require("dotenv").config();

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization header" });
  }

  const token = authHeader.replace("Bearer ", "");
  console.log("Raw token:", token); //// DELETE CONSOLE LOG


  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified user:", user);  //// DELETE CONSOLE LOG

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = requireAdmin;
