const express = require("express");

const listController = require("./controllers/listController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/lists", listController.getAllLists);
router.get("/lists/:id", listController.getOneList);

module.exports = router;
