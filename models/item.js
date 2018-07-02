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
    tags: {
      type: DataTypes.STRING
    },
    exp_date: {
      type: DataTypes.DATE
    },
    note: {
      type: DataTypes.TEXT
    },createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
  },
  updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
  }
  });

  Item.associate = function (models) {
    Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Item;
};