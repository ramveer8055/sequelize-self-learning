'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue(`name`, value + ' Singh')
      },
      get() {
        return this.getDataValue('name') + ' SS ' + this.email
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        // equals: "M",
        // equals:{
        //   args:'Male',
        //   msg: 'Please enter only Male'
        // },
        // isIn: [['M','F']],
        isIn:{
          args: [['M', 'F']],
          msg: 'Please enter M/F'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'user',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return User;
};