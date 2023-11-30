const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class List extends Model {}

List.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  sequelize,
  tableName: "list",
});

module.exports = List;
