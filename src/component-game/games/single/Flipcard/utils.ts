import { Card } from "./flipcardTypes";

const getCardTranslate = (
  index: number,
  numOfCardPerLine: number,
  numOfCardTotal: number,
  cardWidth: number
) => {
  const indexForPosition = index < numOfCardTotal ? index : index + 1;
  const translateX =
    ((indexForPosition % numOfCardPerLine) - Math.floor(numOfCardPerLine / 2)) *
    cardWidth;
  const translateY =
    (Math.floor(indexForPosition / numOfCardPerLine) -
      Math.floor(numOfCardPerLine / 2)) *
    cardWidth;
  return { translateX, translateY };
};

// [todo] upgrade shuffle과 add translate property를 루프 한번으로 해결하기
export const shuffleAndAddTranslateProps = (
  array: Array<Card>,
  numOfCardPerLine: number,
  numOfCardTotal: number,
  cardWidth: number
) => {
  // shuffle
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  // add translate property
  const result = array.map((card, index) => {
    const { translateX, translateY } = getCardTranslate(
      index,
      numOfCardPerLine,
      numOfCardTotal,
      cardWidth
    );
    return {
      ...card,
      translate: {
        x: translateX,
        y: translateY,
      },
    };
  });

  return result;
};
