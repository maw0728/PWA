const Sequelize = require("sequelize");

module.exports = class Movie extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      // 영화 이름
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      // 제작 년도
      year: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      // 제작 국가
      country: {
        type: Sequelize.STRING(30),
        allowNull: true,
        defaultValue: null,
      },
      // 영화 장르
      category: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null,
      },
      // 관람 등급
      class: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null,
      },
      // 상영시간
      runningTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      // 비고
      note: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
        defaultValue: null,
      },
    });
  }
};
