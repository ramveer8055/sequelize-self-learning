'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addConstraint('posts',{
      fields:['user_id'],
      type: 'foreign key',
      name: 'post_user_association',
      references:{
        table: 'users',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeConstraint('posts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'post_user_association',
      references: {
        table: 'users',
        field: 'id'
      }
    })
  }
};
