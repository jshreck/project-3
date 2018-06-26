// Inventory items, belong ot a user and have many tags
module.exports = function (sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    barcode: {
      type: DataTypes.STRING
    },
    exp_date: {
      type: DataTypes.DATE
    },
    exp_range: {
      type: DataTypes.INTEGER
    }
  });

  Item.associate = function (models) {
    Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Item.hasMany(models.Tag, {
      onDelete: "cascade"
    });
  };

  return Item;
};