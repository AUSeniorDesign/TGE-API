module.exports = (sequelize, DataTypes) => {
    var Order = sequelize.define('Order', {
      shippingAddress: DataTypes.JSON,
      billingAddress: DataTypes.JSON,
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'cancelled', 'shipped', 'delivered']
      }
    });
  
    Order.associate = function(models) {
      models.Order.hasMany(models.Item, { as: 'contents' });
      models.Order.belongsTo(models.User, { as: 'owner' });
    };
  
    return Order;
};