module.exports = (sequelize, DataTypes) => {
    var Google = sequelize.define('Google', {
        googleId: DataTypes.STRING,
        token: DataTypes.STRING,
        email: DataTypes.STRING,
        name: DataTypes.STRING
    });

    Google.associate = function (models) {
        // SSOs
        models.Google.belongsTo(models.User);
    };
    
    return Google;
};