const Sequelize = require("sequelize");

module.exports = class Point extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        // 포인트 내역
        title: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        //포인트
        point: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Point",
        tableName: "points",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Point.belongsTo(db.User, { foreignKey: "userid", sourceKey: "id" });
  }
};
