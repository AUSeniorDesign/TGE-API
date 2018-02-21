const fs = require("fs");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', 'config', 'local'))[env];
const app = require('../server.js');

const sequelizeNoUpdateAttributes = require('sequelize-noupdate-attributes');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mainDb', null, null, {
  dialect: 'sqlite',
  storage: 'tge.sqlite',
  logging: false
});

sequelizeNoUpdateAttributes(sequelize);

var db = {};

/**
 * This script imports all models in 'models' directory, and creates relationships.
 * Establishes system-wide access to the 'models' module.
 * 
 * This is invoked via /server/server.js when sequelize is initialized.
 */
fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
