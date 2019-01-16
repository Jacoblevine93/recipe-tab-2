'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
     title: {
       type: DataTypes.STRING,
       allowNull: false
     },
     description: {
       type: DataTypes.STRING,
       allowNull: false
     }
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
  };
  return Recipe;
};