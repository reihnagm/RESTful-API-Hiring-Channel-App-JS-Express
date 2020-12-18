'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class skill extends Model {
    static associate(models) {
      
    }
  };
  skill.init({
    id: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'skill',
  })
  return skill
}