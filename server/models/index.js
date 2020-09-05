const Sequelize = require('sequelize');
const env = process.env.NOD_ENV || 'development';
const config = require('../config/mysql')[env];
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);

let sequelize;
const db = {};

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Adding models to database
fs
  .readdirSync(__dirname)
  .filter(file => { return file.indexOf('.' !==0) && (file !== basename) && (file.slice(-3) === '.js')})
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    sequelize[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

