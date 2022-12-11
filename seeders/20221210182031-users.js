'use strict';
const faker = require('faker');
const users = [...Array(10)].map((user) => (
  {
    first_name: faker.unique(faker.name.firstName),
    last_name: faker.unique(faker.name.lastName),
    email: faker.internet.email(),
    user_name: faker.internet.userName(),
    password: faker.internet.password(),
    job_title: faker.name.jobTitle(),
    // status: faker.random.arrayElement(["Single", "Married"]),
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
