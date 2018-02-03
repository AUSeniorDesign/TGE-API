// http://sequelize.readthedocs.io/en/v3/
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
      name: DataTypes.STRING,
      facebookId: DataTypes.STRING,
    });

    // This one-to-many relationship represents 
    // a user's shopping cart
    User.associate = function(models) {
      models.User.hasMany(models.Item);
    };

    return User;
};