// http://sequelize.readthedocs.io/en/v3/
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        facebookId: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    });

    // This one-to-many relationship represents 
    // a user's shopping cart
    User.associate = function (models) {
        models.User.hasMany(models.Item);
    };

    User.hashPassword = async function hashPassword(password) {
        await bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
            User.update({ password: hash }, {
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

    User.verifyPassword = function verifyPassword(password) {
        bcrypt.compare(myPlaintextPassword, self.password).then(function (res) {
            if (res) {
                return next();
            }
            res.status(401).end('Incorrect password');
        });
    }

    return User;
};