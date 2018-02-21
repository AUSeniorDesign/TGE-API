module.exports = (sequelize, DataTypes) => {
    var Order = sequelize.define("Order", {
        status: {
            type: DataTypes.ENUM,
            values: ["pending", "cancelled", "shipped", "delivered"]
        }
    });

    Order.associate = function(models) {
        models.Order.hasMany(models.OrderItem);
        models.Order.belongsTo(models.User);

        models.Order.hasOne(models.Address, { as: "billingAddress" });
        models.Order.hasOne(models.Address, { as: "shippingAddress" });
    };

    return Order;
};
