'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint('post_tags', {
      fields: ['post_id'],
      type: 'foreign key',
      name: 'post_tag_post_association',
      references: {
        table: 'posts',
        field: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint('post_tags', {
      fields: ['post_id'],
      type: 'foreign key',
      name: 'post_tag_post_association',
      references: {
        table: 'posts',
        field: 'id'
      }
    })
  }
};
