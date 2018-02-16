module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        isAdmin: {
            type: DataTypes.BOOLEAN,
            noUpdate: true
        }
    });

    User.associate = function (models) {
        // Shopping Cart
        models.User.hasMany(models.Item, { as: 'shoppingCart' });

        // Order History
        models.User.hasMany(models.Order, { as: 'orderHistory' });
        
        // SSOs
        models.User.hasOne(models.Local);
        models.User.hasOne(models.Facebook);
        models.User.hasOne(models.Google);
    };

    return User;
};