module.exports = (sequelize, DataTypes) => {
  var OrderItem = sequelize.define('OrderItem', {});

  OrderItem.associate = function(models) {
    models.OrderItem.belongsTo(models.Order);
    models.OrderItem.belongsTo(models.Item);
  };

  return OrderItem;
};
