/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    type: {
      type: DataTypes.ENUM,
      values: ["admin", "employee", "customer"],
      defaultValue: "customer"
    }
  });

  User.associate = function(models) {
    // Shopping Cart
    models.User.hasMany(models.CartItem, { onDelete: "cascade" });

    // Order History
    models.User.hasMany(models.Order);

    // Saved Address
    models.User.hasOne(models.Address, {
      as: "savedAddress",
      onDelete: "cascade"
    });

    models.User.hasOne(models.Facebook, { onDelete: "cascade" });
    models.User.hasOne(models.Credential, { onDelete: "cascade" });
  };

  return User;
};
