const { User } = require("../db/models");

class UserServices {
  static async addUser({ name, email, password, currency, favoriteMeme }) {
    try {
      const user = await User.create({
        name,
        email,
        password,
        currency,
        favoriteMeme,
      });
      return user ? user.get() : null;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user ? user.get() : null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserServices;
