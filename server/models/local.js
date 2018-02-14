module.exports = (sequelize, DataTypes) => {
    var Local = sequelize.define('Local', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    return Local;
};