'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class engineerskill extends Model {
    static associate(models) {
      
    }
  }
  engineerskill.init({
    id: DataTypes.INTEGER,
    engineer_id: DataTypes.INTEGER,
    skill_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'engineerskill',
  })
  return engineerskill
}