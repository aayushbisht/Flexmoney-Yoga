const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    console.log("hello");
  const token = req.header("Authorization").split(" ")[1];

  console.log(token)

  if (!token) return res.status(401).send("Access denied. No token provided.");
console.log("sup");
  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log("lal");
    res.status(400).send("Invalid token.");
  }
};
