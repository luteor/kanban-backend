const { Card } = require("../models/index");

const cardController = {
  getAllCardsInOneList: async (req, res) => {
    try {
      const listId = req.params.id;
      const cards = await Card.findAll({
        where: [
          {
            list_id: listId,
          },
        ],
        include: [
          {
            association: "tags",
          },
        ],
        order: [["position", "ASC"]],
      });

      res.status(200).json(cards);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneCard: async (req, res) => {
    try {
      const cardId = req.params.id;

      const existingCard = await Card.findByPk(cardId, {
        include: [
          {
            association: "tags",
          },
        ],
        order: [["position", "ASC"]],
      });

      if (!existingCard) {
        res.status(404).json(`Can't find card ${cardId}`);
        return;
      }

      return res.status(200).json(existingCard);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  createCard: async (req, res) => {
    try {
      const { title, color, list_id, position } = req.body;
      const bodyErrors = [];

      if (!title) {
        bodyErrors.push("Title can't be empty");
      }

      if (!list_id) {
        bodyErrors.push("List_id can't be empty");
      }

      if (bodyErrors.length) {
        res.status(422).json(bodyErrors);
        return;
      }

      const lastPosition = await Card.max("position", {
        where: {
          list_id: list_id,
        },
      });

      const newCardData = {
        title: title,
        list_id: list_id,
        position: lastPosition !== null ? lastPosition + 1 : 0,
      };

      if (color) {
        newCardData.color = color;
      }

      const newCard = await Card.create(newCardData);

      res.status(201).json(newCard);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  modifyCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      const { title, color, list_id, position } = req.body;

      const existingCard = await Card.findByPk(cardId);
      if (!existingCard) {
        res.status(404).json(`Can't find card ${cardId}`);
        return;
      }

      const updatedCard = await existingCard.update({
        title: title || existingCard.title,
        color: color || existingCard.color,
        list_id: isNaN(list_id) ? existingCard.list_id : list_id,
        position: isNaN(position) ? existingCard.position : position,
      });

      res.status(200).json(updatedCard);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  deleteCard: async (req, res) => {
    try {
      const cardId = req.params.id;

      const existingCard = await Card.findByPk(cardId);
      if (!existingCard) {
        res.status(404).json(`Can't find card ${cardId}`);
        return;
      }

      await existingCard.destroy();
      res.status(200).json("Card successfully deleted");
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
};

module.exports = cardController;
