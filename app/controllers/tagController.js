const { Tag, Card } = require("../models/index");

const tagController = {
  getAllTags: async (req, res) => {
    try {
      const tags = await Tag.findAll({
        order: [["name", "ASC"]],
      });

      res.status(200).json(tags);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneTag: async (req, res) => {
    try {
      const tagId = req.params.id;

      const existingTag = await Tag.findByPk(tagId, {
        include: [
          {
            association: "cards",
          },
        ],
      });

      if (!existingTag) {
        res.status(404).json(`Can't find tag ${tagId}`);
        return;
      }

      return res.status(200).json(existingTag);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  createTag: async (req, res) => {
    try {
      const { name, color } = req.body;
      const bodyErrors = [];

      if (!name) {
        bodyErrors.push("Name can't be empty");
      }

      if (bodyErrors.length) {
        res.status(422).json(bodyErrors);
        return;
      }

      const newTagData = {
        name: name,
      };

      if (color) {
        newTagData.color = color;
      }

      const newTag = await Tag.create(newTagData);

      res.status(201).json(newTag);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  modifyTag: async (req, res) => {
    try {
      const tagId = req.params.id;
      const { name, color } = req.body;

      const existingTag = await Tag.findByPk(tagId);
      if (!existingTag) {
        res.status(404).json(`Can't find tag ${tagId}`);
        return;
      }

      const updatedTag = await existingTag.update({
        name: name || existingTag.name,
        color: color || existingTag.color,
      });

      res.status(200).json(updatedTag);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  deleteTag: async (req, res) => {
    try {
      const tagId = req.params.id;

      const existingTag = await Tag.findByPk(tagId);
      if (!existingTag) {
        res.status(404).json(`Can't find tag ${tagId}`);
        return;
      }

      await existingTag.destroy();
      res.status(200).json("Tag successfully deleted");
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  associateTagToCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      const tagId = req.body.tag_id;

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

      const existingTag = await Tag.findByPk(tagId, {
        include: [
          {
            association: "cards",
          },
        ],
      });

      if (!existingTag) {
        res.status(404).json(`Can't find tag ${tagId}`);
        return;
      }

      await existingCard.addTag(existingTag);

      const updatedCard = await Card.findByPk(cardId, {
        include: [
          {
            association: "tags",
          },
        ],
        order: [["position", "ASC"]],
      });

      res.status(200).json(updatedCard);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  removeTagFromCard: async (req, res) => {
    try {
      const { cardId, tagId } = req.params;

      const existingCard = await Card.findByPk(cardId);
      if (!existingCard) {
        res.status(404).json(`Can't find card ${cardId}`);
        return;
      }

      const existingTag = await Tag.findByPk(tagId);
      if (!existingTag) {
        res.status(404).json(`Can't find tag ${tagId}`);
        return;
      }

      await existingCard.removeTag(existingTag);

      const updatedCard = await Card.findByPk(cardId, {
        include: [
          {
            association: "tags",
          },
        ],
        order: [["position", "ASC"]],
      });

      res.status(200).json(updatedCard);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
};

module.exports = tagController;
