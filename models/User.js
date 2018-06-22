//User, has multiple inventory items
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username already in use!'
            }
        },
        password: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Please enter a valid email'
                }
            },
        },
    });

    User.associate = function (models) {
        User.hasMany(models.InventoryItem, {
            onDelete: "cascade"
        });
    };

    return User;
};