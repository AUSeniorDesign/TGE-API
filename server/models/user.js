module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
      facebookId: DataTypes.STRING,
      name: DataTypes.STRING,
    });

    return User;
};