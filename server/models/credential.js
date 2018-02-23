const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    var Credential = sequelize.define('Credential', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    Credential.hashPassword = function (password) {
        bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
            Credential.update({ password: hash }, {
                where: {
                    id: self.id
                }
            })
                .then(function (updatedRecords) {
                    console.log(updatedRecords)
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    Credential.verifyPassword = function (password) {
        bcrypt.compare(myPlaintextPassword, self.password).then(function (res) {
            if (res) {
                return next();
            }
            res.status(401).end('Incorrect password');
        });
    }

    Credential.associate = function (models) {
        // SSOs
        models.Credential.belongsTo(models.User);
    };

    return Credential;
};