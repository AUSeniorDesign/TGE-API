const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    var Local = sequelize.define('Local', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    Local.hashPassword = async function hashPassword(password) {
        await bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
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

    Local.verifyPassword = function verifyPassword(password) {
        bcrypt.compare(myPlaintextPassword, self.password).then(function (res) {
            if (res) {
                return next();
            }
            res.status(401).end('Incorrect password');
        });
    }

    return Local;
};