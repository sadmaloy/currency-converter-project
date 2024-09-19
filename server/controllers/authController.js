const UserServices = require("../services/UserServices");
const generateTokens = require("../utils/authUtils");
const bcrypt = require("bcrypt");
const jwtConfig = require("../config/jwtConfig");

exports.registration = async (req, res) => {
  try {
    const { name, email, password, currency, favoriteMeme } = req.body;
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      currency.trim() === "" ||
      favoriteMeme.trim() === ""
    ) {
      console.log("Fill in all the blanks!");
      return res.status(400).json({ message: "Fill in all the blanks!" });
    }
    let user = await UserServices.getUserByEmail(email);
    if (!user) {
      user = await UserServices.addUser({
        name,
        email,
        password: await bcrypt.hash(password, 8),
        currency,
        favoriteMeme,
      });

      delete user.password;
      res.locals.user = user;
      const { accessToken, refreshToken } = generateTokens({ user });
      res
        .status(201)
        .cookie(jwtConfig.refresh.type, refreshToken, {
          httpOnly: true,
          maxAge: jwtConfig.refresh.expiresIn,
        })
        .json({ message: "success", user, accessToken });
      return;
    }
    res
      .status(400)
      .json({ message: "There is already a user with such an email!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.authorization = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.trim() === "" || password.trim() === "") {
      console.log("Fill in all the blanks!");
      return;
    }
    const user = await UserServices.getUserByEmail(email);
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        delete user.password;
        res.locals.user = user;
        const { accessToken, refreshToken } = generateTokens({ user });
        res
          .status(200)
          .cookie(jwtConfig.refresh.type, refreshToken, {
            httpOnly: true,
            maxAge: jwtConfig.refresh.expiresIn,
          })
          .json({ message: "success", user, accessToken });
        return;
      }
    }
    res.status(400).json({ message: "Email or password is not correct!" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.locals.user = null;
    res
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: "Success log out!" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};
