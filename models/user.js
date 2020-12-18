'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
    }
  }
  user.init(
    {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role_id: DataTypes.TINYINT,
      slug: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'user'
    }
  )
  return user
}
