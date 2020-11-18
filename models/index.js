const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Board = require("./board");
const Movie = require("./movie");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Board = Board;
db.Movie = Movie;
User.init(sequelize);
Board.init(sequelize);
Movie.init(sequelize);
User.associate(db);
Board.associate(db);
Movie.associate(db);

module.exports = db;
