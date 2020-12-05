const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        commentWriter: {
          type: Sequelize.STRING(20),
          allowNull:true,
        },
        comments: {
            type: Sequelize.TEXT,
            allowNull:true,
          },
          
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Comment",
        tableName: "comment",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db){
    db.Comment.belongsTo(db.User,{foreignKey :"userid",targetKey:"id"});
    db.Comment.belongsTo(db.Board,{foreignKey:"userid",targetKey:"id"})
  }
};