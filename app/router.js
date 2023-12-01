const express = require("express");

const listController = require("./controllers/listController");
const cardController = require("./controllers/cardController");
const tagController = require("./controllers/tagController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/lists", listController.getAllLists);
router.get("/lists/:id", listController.getOneList);
router.post("/lists", listController.createList);
router.put("/lists/:id", listController.modifyList);
router.delete("/lists/:id", listController.deleteList);

router.get("/lists/:id/cards", cardController.getAllCardsInOneList);
router.get("/cards/:id", cardController.getOneCard);
router.post("/cards", cardController.createCard);
router.put("/cards/:id", cardController.modifyCard);
router.delete("/cards/:id", cardController.deleteCard);

router.get("/tags", tagController.getAllTags);
router.get("/tags/:id", tagController.getOneTag);
router.post("/tags", tagController.createTag);
router.put("/tags/:id", tagController.modifyTag);
router.delete("/tags/:id", tagController.deleteTag);
router.post("/cards/:id/tags", tagController.associateTagToCard);
router.delete("/cards/:cardId/tags/:tagId", tagController.removeTagFromCard);

module.exports = router;
