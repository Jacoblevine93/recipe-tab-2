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
     },
     userId: {
       type: DataTypes.INTEGER,
       allowNull: false
     }          
  }, {});
  Recipe.associate = function(models) {
    Recipe.belongsTo(models.User, {
       foreignKey: "userId",
       onDelete: "CASCADE"
   });
  };
  return Recipe;
};