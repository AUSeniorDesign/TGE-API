module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
      name: DataTypes.STRING,
      googleId: DataTypes.STRING,
      facebookId: DataTypes.STRING,
    });

    return User;
};