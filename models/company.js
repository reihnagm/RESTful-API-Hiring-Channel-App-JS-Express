'use strict'

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    static associate(models) {
     
    }
  };
  company.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'company',
  })
  return company
}