require("dotenv").config();
const jwt = require("jsonwebtoken");

// контролер
function verifyAccessToken(req, res, next) {
  try {
    console.log(req.headers);

    const accessToken = req.headers.authorization.split(" ")[1];
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // хранилище пользователя (res.locals)
    res.locals.user = user;

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(403).send("Invalid access token");
  }
}

module.exports = verifyAccessToken;
