const jwt = require("jsonwebtoken");
exports.generateToken = (payload, expiredIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiredIn });
};
