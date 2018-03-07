/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

module.exports = (sequelize, DataTypes) => {
    var CartItem = sequelize.define('CartItem', {});

    CartItem.associate = function (models) {
        models.CartItem.belongsTo(models.User);
        models.CartItem.belongsTo(models.Item);
    };

    return CartItem;
};