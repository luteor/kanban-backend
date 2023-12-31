const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class List extends Model {}

List.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "list",
  }
);

module.exports = List;
