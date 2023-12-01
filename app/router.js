const express = require("express");

const listController = require("./controllers/listController");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Hello");
});

router.get("/lists", listController.getAllLists);
router.get("/lists/:id", listController.getOneList);
router.post("/lists", listController.createList);
router.put("lists/:id", listController.modifyList);
router.delete("lists/:id", listController.deleteList);

module.exports = router;
