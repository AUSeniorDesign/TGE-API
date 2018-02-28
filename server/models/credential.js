/**
 * @author Haven Barnes <hab0020@auburn.edu>
 */

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    var Credential = sequelize.define('Credential', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    ////////////////////////////
    // Instance Methods
    ////////////////////////////
    Credential.prototype.verifyPassword = function (plaintext) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plaintext, this.password).then(function(res) {
                resolve(res);
            });
        });
    }

    // Static Methods

    Credential.associate = function (models) {
        models.Credential.belongsTo(models.User);
    };

    // This hook applies hash to plain text password before inserting into db.
    Credential.beforeUpdate((credential, options) => {
        return bcrypt.hash(credential.password, saltRounds).then( hash => {
            credential.password = hash;
        });
    });

    return Credential;
};