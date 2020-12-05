const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        writer: {
          type: Sequelize.STRING(20),
        },
        views: {
            type: Sequelize.INTEGER,
            allowNull:false,
		        defaultValue:0,
          },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Board",
        tableName: "board",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db){
    db.Board.belongsTo(db.User,{foreignKey:"userid",targetKey:"id"})
    db.Board.hasMany(db.Comment,{foreignKey:"userid",targetKey:"id"})
  }
};
