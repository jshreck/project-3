// Inventory items, belong ot a user and have many tags
module.exports = function(sequelize, DataTypes) {
    var InventoryItem = sequelize.define("InventoryItem", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
    });
  
    InventoryItem.associate = function(models) {
      InventoryItem.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });

      InventoryItem.hasMany(models.Tag, {
          onDelete: "cascade"
      });
    };


  
    return InventoryItem;
  };