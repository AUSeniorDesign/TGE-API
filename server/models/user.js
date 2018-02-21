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
        models.User.hasMany(models.CartItem);
        // Order History
        models.User.hasMany(models.Order);
        // Saved Address
        models.User.hasOne(models.Address, { as: 'savedAddress' })
    };

    return User;
};