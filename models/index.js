const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
<<<<<<< HEAD
const Board = require('./board');
=======
const Movie = require("./movie");
>>>>>>> feature/videoDatabase

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
<<<<<<< HEAD
db.Board=Board;
User.init(sequelize);
Board.init(sequelize);

User.associate(db);
Board.associate(db);
=======
db.Movie = Movie;

User.init(sequelize);
Movie.init(sequelize);

User.associate(db);
Movie.associate(db);
>>>>>>> feature/videoDatabase

module.exports = db;
