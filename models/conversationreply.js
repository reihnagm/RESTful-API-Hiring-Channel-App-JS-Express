'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class conversationreply extends Model {
    static associate(models) {
     
    }
  }
  conversationreply.init({
    id: DataTypes.INTEGER,
    reply: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    conversation_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'conversationreply',
  })
  return conversationreply
}