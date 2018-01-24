module.exports = (sequelize, DataTypes) => {
    var Item = sequelize.define('Item', {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      shippingCost: DataTypes.VIRTUAL,
      // TODO: Make condition an ENUM type once we get a defined list
      condition: DataTypes.STRING,
      // TODO: Make category an ENUM type once we get a defined list
      category: DataTypes.STRING
    });
  
    return Item;
};