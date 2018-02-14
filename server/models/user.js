module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        isAdmin: DataTypes.BOOLEAN
    });

    // This one-to-many relationship represents 
    // a user's shopping cart
    User.associate = function (models) {
        models.User.hasMany(models.Item);
        models.User.hasMany(models.Order);
        
        models.User.hasOne(models.Local);
        models.User.hasOne(models.Facebook);
        models.User.hasOne(models.Google);
    };

    return User;
};