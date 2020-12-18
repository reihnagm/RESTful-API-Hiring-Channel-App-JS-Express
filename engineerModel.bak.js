'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class engineer extends Model {

    static associate(models) {
     
    }
  };
  engineer.init({
    id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    showcase: DataTypes.STRING,
    telephone: DataTypes.STRING,
    salary: DataTypes.STRING,
    avatar: DataTypes.STRING,
    user_id: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'engineer',
  });
  return engineer;
};