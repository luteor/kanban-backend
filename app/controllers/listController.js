const { List, Card, Tag } = require("../models/index");

const listController = {
  getAllLists: async (req, res) => {
    try {
      const lists = await List.findAll({
        include: [
          {
            association: "cards",
            include: [
              {
                association: "tags",
              },
            ],
          },
        ],
        order: [
          ["position", "ASC"],
          ["cards", "position", "ASC"],
        ],
      });
      res.status(200).json(lists);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneList: async (req, res) => {
    try {
      const listId = req.params.id;
      const list = await List.findByPk(listId, {
        include: [
          {
            association: "cards",
            include: [
              {
                association: "tags",
              },
            ],
          },
        ],
        order: [["cards", "position", "ASC"]],
      });
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).json(`Can't find list ${listId}`);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = listController;
