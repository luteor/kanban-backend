const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Card extends Model {}

Card.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "",
  },
  color: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "#f6f7f9",
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  sequelize,
  tableName: "card",
});

module.exports = Card;
