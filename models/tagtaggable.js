'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagTaggable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TagTaggable.init({
    tag_id: DataTypes.INTEGER,
    taggable_id: DataTypes.INTEGER,
    taggable_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tag_taggable',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return TagTaggable;
};