module.exports = (sequelize, DataTypes) => {
    var Facebook = sequelize.define('Facebook', {
        facebookId: DataTypes.STRING,
        token: DataTypes.STRING,
        email: DataTypes.STRING,
        name: DataTypes.STRING
    });

    Facebook.associate = function (models) {
        // SSOs
        models.Facebook.belongsTo(models.User);
    };

    return Facebook;
};