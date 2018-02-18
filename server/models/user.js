module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        type: {
            type: DataTypes.ENUM,
            values: ['admin', 'employee', 'customer']
          }
    });

    User.associate = function (models) {
        // Shopping Cart
        models.User.hasMany(models.Item, { as: 'Cart' });

        // Order History
        models.User.hasMany(models.Order, { as: 'OrderHistory' });
        
        // SSOs
        models.User.belongsTo(models.Local, { as: 'Credentials' });
        models.User.belongsTo(models.Facebook);
        models.User.belongsTo(models.Google);
    };

    return User;
};