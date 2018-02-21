module.exports = (sequelize, DataTypes) => {
    var Item = sequelize.define('Item', {
      name: DataTypes.STRING,
      // Decimal for quantity field on the OFF chance something is sold in a weight unit
      quantity: DataTypes.DECIMAL(10, 2),
      price: DataTypes.DECIMAL(10, 2),
      sku: DataTypes.STRING,
      description: DataTypes.STRING,
      images: DataTypes.STRING,
      productIdType: DataTypes.STRING,
      brand: DataTypes.STRING,
      
      // Categories based on eBay Store
      category: {
        type:   DataTypes.ENUM,
        values: ['Toys & Games', 'Comic Books', 'Music', 'Books & Magazines',
                'Collectibles & Memorabilia', 'Movies & TV', 'Collector Supplies', 'Other']
      }
    });

    Item.associate = function (models) {
      models.Item.hasMany(models.CartItem);
      models.Item.hasMany(models.Order);
    };

    return Item;
};