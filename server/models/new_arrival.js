module.exports = (sequelize, DataTypes) => {
    var NewArrival = sequelize.define('NewArrival', {
      // Description of recently arrived items
      description: DataTypes.STRING,
      // Images of recently arrived items 
      images: DataTypes.STRING,
      // Location of branch that is posting the items
      store: DataTypes.STRING,
    });
  
    return NewArrival;
};