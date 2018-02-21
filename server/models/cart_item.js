module.exports = (sequelize, DataTypes) => {
    var CartItem = sequelize.define('CartItem', {});

    CartItem.associate = function (models) {
        models.CartItem.belongsTo(models.User);
        models.CartItem.belongsTo(models.Item);
    };

    return CartItem;
};