'use strict'

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class conversation extends Model {
    static associate(models) {
      
    }
  };
  conversation.init({
    id: DataTypes.INTEGER,
    user_one: DataTypes.INTEGER,
    user_two: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'conversation',
  })
  return conversation
}