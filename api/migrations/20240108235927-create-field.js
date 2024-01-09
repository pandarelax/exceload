'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('fields', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gridId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'grids',
          key: 'id',
        },
      },
      isPrimary: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isUnique: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('fields');
  },
};
