const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    var Local = sequelize.define('Local', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    Local.hashPassword = function (password) {
        bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
            Local.update({ password: hash }, {
                where: {
                    id: this.id
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

    Local.verifyPassword = function (password) {
        bcrypt.compare(myPlaintextPassword, self.password).then(function (res) {
            if (res) {
                return next();
            }
            res.status(401).end('Incorrect password');
        });
    }

    Local.associate = function (models) {
        // SSOs
        models.Local.belongsTo(models.User);
    };

    return Local;
};