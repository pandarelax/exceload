'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('records', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      gridId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'grids',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createTable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('records');
  },
};
