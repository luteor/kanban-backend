const { List } = require("../models/index");

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

      if (!list) {
        return res.status(404).json(`Can't find list ${listId}`);
      }

      return res.status(200).json(list);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  createList: async (req, res) => {
    try {
      const { name, position } = req.body;
      const bodyErrors = [];

      if (!name) {
        bodyErrors.push("Name can't be empty");
      }

      if (bodyErrors.length) {
        res.status(422).json(bodyErrors);
      }

      const newList = await List.create({
        name: name,
        position: position,
      });

      res.status(201).json(newList);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  modifyList: async (req, res) => {
    try {
      const listId = req.params.id;
      const { name, position } = req.body;

      const existingList = await List.findByPk(listId);
      if (!existingList) {
        res.status(404).send(`Can't find list ${listId}`);
      }

      const updatedList = await existingList.update({
        name: name || existingList.name,
        position: isNaN(position) ? existingList.position : position,
      });

      res.status(200).json(updatedList);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
};

module.exports = listController;
