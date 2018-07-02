//Tags belong to inventory items
module.exports = function (sequelize, DataTypes) {
    var Tag = sequelize.define("Tag", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Tag already in use!'
            }
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        txtColor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        }
    });

    Tag.associate = function (models) {
        Tag.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Tag;
};