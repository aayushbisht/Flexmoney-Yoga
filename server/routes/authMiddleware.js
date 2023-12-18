const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    console.log("hello");
  const token = req.header("Authorization").split(" ")[1];

  console.log(token)

  if (!token) return res.status(401).send("Access denied. No token provided.");
console.log("sup");
  try {
    console.log("lal");
    // console.log(process.env.JWTPRIVATEKEY);
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log("lal");
    res.status(400).send("Invalid token.");
  }
};
// const jwt = require("jsonwebtoken");
// module.exports = function (req, res, next) {
//   console.log("hello");
//   const token = req.header("Authorization");
//   console.log(token)

//   if (!token) return next(errorHandler(401, 'Unauthorized'));

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(errorHandler(403, 'Forbidden'));

//     req.user = user;
//     next();
//   });
// };

