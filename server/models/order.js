/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define("Order", {
    type: {
      type: DataTypes.ENUM,
      values: ["pending", "cancelled", "shipped", "delivered"],
      defaultValue: "pending"
    }
  });

  Order.associate = function(models) {
    models.Order.hasMany(models.OrderItem, { onDelete: "cascade" });
    models.Order.belongsTo(models.User);

    models.Order.hasOne(models.Address, {
      as: "billingAddress",
      onDelete: "cascade"
    });
    models.Order.hasOne(models.Address, {
      as: "shippingAddress",
      onDelete: "cascade"
    });
  };

  return Order;
};
