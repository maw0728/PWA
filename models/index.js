const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
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
db.Movie = Movie;

User.init(sequelize);
Movie.init(sequelize);

User.associate(db);
Movie.associate(db);

module.exports = db;
