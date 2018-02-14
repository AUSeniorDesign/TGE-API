module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        isAdmin: DataTypes.BOOLEAN
    });

    // This one-to-many relationship represents 
    // a user's shopping cart
    User.associate = function (models) {
        models.User.hasMany(models.Item);
        models.User.hasMany(models.Order);
        models.User.hasOne(models.Local);
        models.User.hasOne(models.Facebook);
        models.User.hasOne(models.Google);
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