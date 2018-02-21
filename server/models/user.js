const Item = require('./item');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        type: {
            type: DataTypes.ENUM,
            values: ['admin', 'employee', 'customer'],
            noUpdate: true
          }
    });

    User.associate = function (models) {
        // Shopping Cart
        models.User.belongsToMany(models.Item, { through: 'ShoppingCart' });
        // Order History
        models.User.hasMany(models.Order, { as: 'OrderHistory' });
    };

    return User;
};