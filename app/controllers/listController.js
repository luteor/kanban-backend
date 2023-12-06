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

      const existingList = await List.findByPk(listId, {
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

      if (!existingList) {
        res.status(404).json(`Can't find list ${listId}`);
        return;
      }

      return res.status(200).json(existingList);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  createList: async (req, res) => {
    try {
      const { name } = req.body;
      const bodyErrors = [];

      if (!name) {
        bodyErrors.push("Name can't be empty");
      }

      if (bodyErrors.length) {
        res.status(422).json(bodyErrors);
        return;
      }

      const lastPosition = await List.max("position");

      const newListData = {
        name: name,
        position: lastPosition !== null ? lastPosition + 1 : 0,
      };

      const newList = await List.create(newListData);

      res.status(201).json(newList);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  modifyList: async (req, res) => {
    try {
      const listId = req.params.id;
      const { name, position } = req.body;

      const existingList = await List.findByPk(listId);
      if (!existingList) {
        res.status(404).json(`Can't find list ${listId}`);
        return;
      }

      const updatedList = await existingList.update({
        name: name || existingList.name,
        position: isNaN(position) ? existingList.position : position,
      });

      res.status(200).json(updatedList);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  deleteList: async (req, res) => {
    try {
      const listId = req.params.id;

      const existingList = await List.findByPk(listId);
      if (!existingList) {
        res.status(404).json(`Can't find list ${listId}`);
        return;
      }

      await existingList.destroy();
      res.status(200).json("List successfully deleted");
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
};

module.exports = listController;
