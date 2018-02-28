/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

module.exports = (sequelize, DataTypes) => {
    var Address = sequelize.define('Address', {
        name: DataTypes.STRING,
        streetAddressOne: DataTypes.STRING,
        streetAddressTwo: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        country: { type: DataTypes.STRING,
                    defaultValue: 'United States'}
    });

    return Address;
};

