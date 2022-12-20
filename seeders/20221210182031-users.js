'use strict';
const faker = require('faker');
const users = [...Array(10)].map((user) => (
  {
    name: faker.unique(faker.name.firstName),
    // last_name: faker.unique(faker.name.lastName), does not present column table
    email: faker.internet.email(),
    // user_name: faker.internet.userName(), does not present column table
    // password: faker.internet.password(), does not present column table
    // job_title: faker.name.jobTitle(), does not present column table
    status: faker.random.arrayElement([1, 0]),
    gender: faker.random.arrayElement(['M', 'F']),
    created_at: faker.date.between('2022-01-01', '2022-12-31'),
    updated_at: new Date()
  }
))

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
