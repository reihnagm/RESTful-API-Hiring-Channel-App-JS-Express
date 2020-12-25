'use strict'

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('engineers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      uid: {
        type: Sequelize.uid
      }
      description: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      showcase: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      date_created: {
        type: Sequelize.DATE
      },
      date_updated: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('engineers')
  }
  
}
