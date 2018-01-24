// http://sequelize.readthedocs.io/en/v3/
module.exports = (sequelize, DataTypes) => {
    var Order = sequelize.define('Order', {
      shippingAddress: DataTypes.JSON,
      billingAddress: DataTypes.JSON
    });
  
    Order.associate = function(models) {
      models.Order.hasMany(models.Item);
      models.Order.hasOne(models.User)
    };
  
    return Order;
};