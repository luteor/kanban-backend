const { List, Card, Tag } = require("./index");

async function testModels() {
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

  // for (const list of lists) {
  //   console.log(`The list "${list.name}" contains the following cards:`);

  //   list.cards.forEach((card) => {
  //     console.log(
  //       `"${card.title}" with tags: ${card.tags
  //         .map((tag) => tag.name)
  //         .join(", ")}`
  //     );
  //   });
  // }

  const list = await List.findByPk(1, {
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

  console.log(`The list "${list.name}" contains the following cards:`);
  list.cards.forEach((card) => {
    console.log(
      `"${card.title}" with tags: ${card.tags
        .map((tag) => tag.name)
        .join(", ")}`
    );
  });
}

testModels();
