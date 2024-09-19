require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateTokens(payload) {
  return {
    // восковый билет
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: `${1000 * 60 * 5}`,
    }),
    // чек
    refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: `${1000 * 60 * 60 * 12}`,
    }),
  };
}

module.exports = generateTokens;
