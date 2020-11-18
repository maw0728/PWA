const Sequelize = require("sequelize");

module.exports = class Movie extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 영화 이름
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        //영화감독
        director: {
          type: Sequelize.STRING(30),
          allowNull: true,
          defaultValue: null,
        },
        //출연자
        actor: {
          type: Sequelize.STRING(30),
          allowNull: true,
          defaultValue: null,
        },
        // 제작 년도
        year: {
          type: Sequelize.STRING(20),
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
          allowNull: true,
          defaultValue: null,
        },
        // 비고
        note: {
          type: Sequelize.TEXT("long"),
          allowNull: true,
          defaultValue: null,
        },
        original: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Moive",
        tableName: "movies",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Movie.belongsTo(db.User, { foreignKey: "userid", sourceKey: "id" });
  }
};
