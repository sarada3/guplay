import styled, { useTheme } from "styled-components";
import { useState, useEffect, useCallback, useRef } from "react";

import { getUrl } from "../../../../utils/storage";
import { shuffleAndAddTranslateProps } from "./utils";
import useCountdown from "../../../utils/hooks/useCountdown";

import CardBoard from "./CardBoard";
import Timer from "../../../Timer";
import { FlexCenter } from "../../../../component-reuse/StyledComponent";

import { Card } from "./flipcardTypes";

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
  // 정답 맞춘 카드 수
  const [numOfMatch, setNumOfMatch] = useState(0);
  // 두번째 뒤집은 카드가 첫번째 뒤집은 카드와 같은지 비교하기 위해 첫번째카드를 temp에 저장
  const [tempIndex, setTempIndex] = useState(-1);
  // 현재 클릭한 카드
  const [clickedIndex, setClickedIndex] = useState(-1);
  const totalSlidingDuration = (cardList.length - 1) * 0.1;
  const { countdown } = useCountdown(7, totalSlidingDuration);
  /**
   * 세마포(semaphore)
   */
  const canClick = useRef(false);
  const theme = useTheme();
  const isUnderMobileWidth = window.innerWidth <= theme.deviceSizes.mobile;

  /**
   * 카드 한개 길이
   */
  const cardWidth = isUnderMobileWidth
    ? boardWidth / numOfCardPerLine
    : boardWidth / (numOfCardPerLine + 1);
  /**
   * The number of card 종류
   */
  const numOfCardTotal = (numOfCardPerLine * numOfCardPerLine - 1) / 2;

  const onClickCard = useCallback((indexValue: number) => {
    if (canClick.current) {
      setClickedIndex(indexValue);
    }
  }, []);

  // card image url download
  // [todo] firebase v9 storage getBlob 활용하여 더 간단하게 만들어보기
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
      // 게임 시작 전 6초동안 카드를 보여주기 위함
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
      if (cardList[clickedIndex].state === "open") {
        // already opened. Do nothing.
        selector = "already_opened";
      } else if (tempIndex === -1) {
        // first card opened.
        selector = "first";
      } else if (cardList[clickedIndex].no === cardList[tempIndex].no) {
        // second card opened. Match
        selector = "match";
      } else if (cardList[clickedIndex].no !== cardList[tempIndex].no) {
        // second card opened. no Match
        selector = "unmatch";
      }

      let newCardList: Array<Card>;
      switch (selector) {
        case "first":
          newCardList = [
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
          if (numOfMatch === numOfCardTotal - 1) {
            // game complete
            handleGameEnd();
          } else {
            newCardList = [
              ...cardList.slice(0, clickedIndex),
              {
                ...cardList[clickedIndex],
                state: "open",
              },
              ...cardList.slice(clickedIndex + 1),
            ];
            setCardList(newCardList);
            setNumOfMatch((prev) => prev + 1);
            setTempIndex(-1);
            setClickedIndex(-1);
          }
          break;
        case "unmatch":
          newCardList = cardList.map((card, index): Card => {
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
          setCardList(newCardList);
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
      <Timer isActive={countdown < 1} size={4} />
      <CardBoard
        cardList={cardList}
        boardWidth={boardWidth}
        cardWidth={cardWidth}
        countdown={countdown}
        onClickCard={onClickCard}
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
