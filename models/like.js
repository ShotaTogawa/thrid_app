'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'Like',
    {
      user_id: DataTypes.INTEGER,
      photo_id: DataTypes.INTEGER
    },
    {}
  );
  Like.associate = function(models) {
    // associations can be defined here
  };
  return Like;
};
