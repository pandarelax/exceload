'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('recordValues', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      recordId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'records',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      fieldId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'fields',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('recordValues');
  },
};
