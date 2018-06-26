//Tags belong to inventory items
module.exports = function (sequelize, DataTypes) {
    var Tag = sequelize.define("Tag", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username already in use!'
            }
        },
        color: DataTypes.STRING
    });

    Tag.associate = function (models) {
        Tag.belongsTo(models.Item, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Tag;
};