"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Kostislav",
          email: "kostik@mail.ru",
          password: await bcrypt.hash("123", 8),
          currency: "RUB",
          favoriteMeme:
            "https://memi.klev.club/uploads/posts/2024-04/memi-klev-club-b5k3-p-memi-sobaka-v-bolote-1.jpg",
        },
        {
          name: "Polina",
          email: "polina_ne@mail.ru",
          password: await bcrypt.hash("123", 8),
          currency: "RUB",
          favoriteMeme:
            "https://cs12.pikabu.ru/post_img/2019/04/15/9/1555339015135017638.jpg",
        },
        {
          name: "Artur",
          email: "artur@mail.ru",
          password: await bcrypt.hash("123", 8),
          currency: "RUB",
          favoriteMeme:
            "https://i.pinimg.com/originals/2d/f6/54/2df654cc10fb8b4427e33869f9417fac.jpg",
        },
        {
          name: "Arsen",
          email: "arsen@mail.ru",
          password: await bcrypt.hash("123", 8),
          currency: "RUB",
          favoriteMeme:
            "https://a.d-cd.net/rVuYPKLXodS17Y8xHi768VdndJs-1920.jpg",
        },
        {
          name: "Natasha",
          email: "natasha@mail.ru",
          password: await bcrypt.hash("123", 8),
          currency: "RUB",
          favoriteMeme:
            "https://i.pinimg.com/564x/9b/ab/e1/9babe1716a0dcb32a1a703afcf275644.jpg",
        },
        {
          name: "Dima",
          email: "dima@mail.ru",
          password: await bcrypt.hash("123", 8),
          currency: "RUB",
          favoriteMeme:
            "https://memi.klev.club/uploads/posts/2024-05/memi-klev-club-cq6c-p-memi-sereznii-chelovek-20.jpg",
        },
        {
          name: "GegorGan",
          email: "egor@mail.ru",
          password: await bcrypt.hash("123", 8),
          currency: "RUB",
          favoriteMeme:
            "https://avatars.mds.yandex.net/i?id=24dbed72625cc3bbdc27d8f5141720cf_l-8514130-images-thumbs&n=13",
        },
        {
          name: "Anya",
          email: "anya@mail.ru",
          password: await bcrypt.hash("123", 8),
          currency: "RUB",
          favoriteMeme:
            "https://sun1-93.userapi.com/impg/oMGqqQN071MUCpdPjqhNph_5q2c8bi5Ef5YUtg/uE45PT15bx4.jpg?quality=95&as=32x31,48x47,72x71,108x106,160x157,240x236,360x354,480x472,540x531,640x629,720x708,837x823&sign=597b4675da54795dabbf35a582f42bb5&from=bu&u=MUUAvRC-LymhIhqJPjXWb0GwKReXRmioZ0bvZSUn0GM&cs=837x823",
        },
        {
          name: "Vova",
          email: "vova@mail.ru",
          password: await bcrypt.hash("123", 8),
          currency: "RUB",
          favoriteMeme:
            "https://news.store.rambler.ru/img/a2edff0f8534a3d5b671d43c41ca8e29?img-1-resize=width%3A1280%2Cheight%3A960%2Cfit%3Acover&img-format=auto",
        },
        {
          name: "Amantur",
          email: "amantur@mail.ru",
          password: await bcrypt.hash("123", 8),
          currency: "RUB",
          favoriteMeme:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRApJnQiWmVExji0QRh54hdVmDO6xUMmXflmbyBgbNx3uYXwRBQW5JlQleEZu9SrFV8fTY&usqp=CAU",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
