const List = require("./List");
const Card = require("./Card");
const Tag = require("./Tag");

// List <-> Card
List.hasMany(Card, {
  foreignKey: "list_id",
  as: "cards",
});
Card.belongsTo(List, {
  foreignKey: "list_id",
  as: "list",
});

// Card <-> Tag
Card.belongsToMany(Tag, {
  foreignKey: "card_id",
  otherKey: "tag_id",
  as: "tags",
  through: "card_has_tag",
});
Tag.belongsToMany(Card, {
  foreignKey: "tag_id",
  otherKey: "card_id",
  as: "cards",
  through: "card_has_tag",
});

module.exports = { List, Card, Tag };
