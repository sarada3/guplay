import styled, { useTheme } from "styled-components";
import { useState, useEffect, useCallback, useRef } from "react";

import { getUrl } from "../../../../utils/storage";
import { shuffleAndAddTranslateProps } from "./utils";
import useCountdown from "../../../utils/hooks/useCountdown";

import CardBoard from "./CardBoard";
import Timer from "../../../Timer";
import { FlexCenter } from "../../../../component-reuse/StyledComponent";

import { Card } from "./flipcardTypes";

// let canClick = false;

interface FlipcardProps {
  boardWidth: number;
  saveStarttime: () => void;
  handleGameEnd: () => void;
  startLoading: () => void;
  endLoading: () => void;
  invokeError: () => void;
  numOfCardPerLine: number;
}

function Flipcard(props: FlipcardProps) {
  const {
    boardWidth,
    saveStarttime,
    handleGameEnd,
    startLoading,
    endLoading,
    invokeError,
    numOfCardPerLine,
  } = props;
  const [cardList, setCardList] = useState<Array<Card>>([]);
  const [numOfMatch, setNumOfMatch] = useState(0);
  const [tempIndex, setTempIndex] = useState(-1);
  const [clickedIndex, setClickedIndex] = useState(-1);
  const slidingTotalDuration = (cardList.length - 1) / 20 + 0.1;
  const { countdown } = useCountdown(7, slidingTotalDuration);
  const canClick = useRef(false);
  const theme = useTheme();
  const isUnderMobileWidth = window.innerWidth <= theme.deviceSizes.mobile;

  // 카드 한개 길이:
  // mobile 이하- 보드길이 / 한줄당 카드수 => 화면이 작아서 게임하기 불편하므로 꽉채움
  // mobile 위 - 보드길이 / (한줄당 카드수 + 1) => 양쪽 합해서 카드 한개만큼의 패딩
  const cardWidth = isUnderMobileWidth
    ? boardWidth / numOfCardPerLine
    : boardWidth / (numOfCardPerLine + 1);
  const numOfCardTotal = (numOfCardPerLine * numOfCardPerLine - 1) / 2;

  const onClickCard2 = useCallback((indexValue: number) => {
    console.log("aa", canClick.current);
    if (canClick.current) {
      setClickedIndex(indexValue);
    }
  }, []);

  // card image url download
  // [todo] firebase v9 storage getBlob 알아보기
  useEffect(() => {
    const initCardList = async () => {
      startLoading();
      const promises = [];
      for (let i = 0; i < numOfCardTotal; i++) {
        promises.push(
          new Promise<Card>(async (resolve, reject) => {
            const url = await getUrl(`/games/flipcard/card${i}.png`);
            const card: Card = {
              no: i,
              path: `/games/flipcard/card${i}.png`,
              url,
              state: "none",
              translate: {
                x: 0,
                y: 0,
              },
            };
            resolve(card);
          })
        );
      }
      try {
        const result: Array<Card> = await Promise.all(promises);
        const preparedCardList = shuffleAndAddTranslateProps(
          [...result, ...result],
          numOfCardPerLine,
          numOfCardTotal,
          cardWidth
        );
        setCardList(preparedCardList);
        endLoading();
      } catch (error) {
        console.error(error);
        invokeError();
      }
    };
    initCardList();
  }, [
    numOfCardPerLine,
    numOfCardTotal,
    cardWidth,
    startLoading,
    endLoading,
    invokeError,
  ]);

  // countdown effect
  useEffect(() => {
    if (countdown === 0) {
      // game start.
      setCardList((prev) =>
        prev.map((card) => ({
          ...card,
          state: "close",
        }))
      );
      saveStarttime();
      canClick.current = true;
    } else if (countdown === 6) {
      setCardList((prev) =>
        prev.map((card) => ({
          ...card,
          state: "open",
        }))
      );
    }
  }, [countdown, cardList.length, saveStarttime]);

  // Main algorithm
  useEffect(() => {
    if (cardList.length > 0 && clickedIndex > -1) {
      canClick.current = false;
      let selector = "";
      // already opened. Do nothing.
      if (cardList[clickedIndex].state === "open") selector = "already_opened";
      // first card opened.
      else if (tempIndex === -1) {
        selector = "first";
      }
      // second card opened. Match
      else if (cardList[clickedIndex].no === cardList[tempIndex].no)
        selector = "match";
      // second card opened. no Match
      else if (cardList[clickedIndex].no !== cardList[tempIndex].no)
        selector = "unmatch";

      switch (selector) {
        case "first":
          const newCardList: Array<Card> = [
            ...cardList.slice(0, clickedIndex),
            {
              ...cardList[clickedIndex],
              state: "open",
            },
            ...cardList.slice(clickedIndex + 1),
          ];
          setCardList(newCardList);
          setTempIndex(clickedIndex);
          setClickedIndex(-1);
          break;
        case "match":
          // game complete
          if (numOfMatch === numOfCardTotal - 1) {
            handleGameEnd();
          } else {
            const newCardList2: Array<Card> = [
              ...cardList.slice(0, clickedIndex),
              {
                ...cardList[clickedIndex],
                state: "open",
              },
              ...cardList.slice(clickedIndex + 1),
            ];
            setCardList(newCardList2);
            setNumOfMatch((prev) => prev + 1);
            setTempIndex(-1);
            setClickedIndex(-1);
          }
          break;
        case "unmatch":
          const newCardList3 = cardList.map((card, index): Card => {
            if (index === clickedIndex) {
              return {
                ...card,
                state:
                  card.state === "unmatch_target_close"
                    ? "re_unmatch_target_close"
                    : "unmatch_target_close",
              };
            } else if (index === tempIndex) {
              return {
                ...card,
                state: "unmatch_temp_close",
              };
            } else {
              return card;
            }
          });
          setCardList(newCardList3);
          setTempIndex(-1);
          setClickedIndex(-1);
          break;
        default:
          break;
      }
      canClick.current = true;
    }
  }, [
    cardList,
    handleGameEnd,
    numOfCardTotal,
    numOfMatch,
    clickedIndex,
    tempIndex,
  ]);
  if (cardList.length === 0) {
    return null;
  }
  return (
    <Container>
      <Timer isActive={countdown < 1} />
      <CardBoard
        cardList={cardList}
        boardWidth={boardWidth}
        cardWidth={cardWidth}
        countdown={countdown}
        onClickCard={onClickCard2}
      />
    </Container>
  );
}

const Container = styled(FlexCenter)`
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export default Flipcard;
