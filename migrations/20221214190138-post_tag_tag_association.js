'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint('post_tags', {
      fields: ['tag_id'],
      type: 'foreign key',
      name: 'post_tag_tag_association',
      references: {
        table: 'tags',
        field: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint('post_tags', {
      fields: ['tag_id'],
      type: 'foreign key',
      name: 'post_tag_tag_association',
      references: {
        table: 'tags',
        field: 'id'
      }
    })
  }
};
