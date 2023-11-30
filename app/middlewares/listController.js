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
};
