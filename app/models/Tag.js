const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Tag extends Model {}

Tag.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "",
  },
  color: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "#149ECA",
  },
  sequelize,
  tableName: "tag",
});

module.exports = Tag;
