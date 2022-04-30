import { IGame } from "./types";

const flipCardThumbnail = require("./assets/images/thumb-flip-card.jpg");
const authorThumbnail = require("./assets/images/author-thumb.png");

export const games: { puzzle: Array<IGame>; arcade: Array<IGame> } = {
  puzzle: [
    {
      code: "FLIPCARD",
      title: "Flip Card",
      grade: 3.3,
      category: "puzzle",
      thumbnail: flipCardThumbnail,
      author: { name: "Jaewoo", thumbnail: authorThumbnail },
    },
    {
      code: "ONETOFIFTY",
      title: "1 to 50",
      grade: 4.1,
      category: "puzzle",
      thumbnail: flipCardThumbnail,
      author: { name: "Jaewoo", thumbnail: authorThumbnail },
    },
  ],
  arcade: [],
};
