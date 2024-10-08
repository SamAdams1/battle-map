const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // console.log(req.body);

  // Get token from header
  const token = req.body.token;

  // Check if no token
  if (!token) {
    console.log("no token");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        console.log(decoded);
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
