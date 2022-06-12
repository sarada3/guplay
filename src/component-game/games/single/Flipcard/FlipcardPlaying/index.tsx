import styled, { useTheme } from "styled-components";
import { useState, useEffect, useRef } from "react";

import useLoadingAndError from "../../../../../utils/hooks/useLoadingAndError";
import { shuffleAndAddTranslateProps } from "../../../../../utils";
import { getUrl } from "../../../../../utils/storage";

import CardBoard from "./CardBoard";
import Timer from "../../../../Timer";
import { FlexCenter } from "../../../../../component-reuse/StyledComponent";

import { Card } from "../index";

interface PlayingProps {
  saveStarttime: () => void;
  boardWidth: number;
  numOfCardPerLine: number;
  handleGameEnd: () => void;
  startLoading: () => void;
  endLoading: () => void;
  invokeError: () => void;
}

function FlipcardPlaying(props: PlayingProps) {
  console.log("FlipcardPlaying");
  const {
    numOfCardPerLine,
    boardWidth,
    saveStarttime,
    handleGameEnd,
    startLoading,
    endLoading,
    invokeError,
  } = props;
  const [cardList, setCardList] = useState<Array<Card>>([]);
  const [countdown, setCountdown] = useState(7);
  const [numOfMatch, setNumOfMatch] = useState(0);
  const [tempIndex, setTempIndex] = useState(-1);
  const theme = useTheme();
  const isUnderMobileWidth = window.innerWidth <= theme.deviceSizes.mobile;

  const countdownTimer = useRef<ReturnType<typeof setInterval>>();

  // 카드 한개 길이:
  // mobile 이하- 보드길이 / 한줄당 카드수 => 화면이 작아서 게임하기 불편하므로 꽉채움
  // mobile 위 - 보드길이 / (한줄당 카드수 + 1) => 양쪽 합해서 카드 한개만큼의 패딩
  const cardWidth = isUnderMobileWidth
    ? boardWidth / numOfCardPerLine
    : boardWidth / (numOfCardPerLine + 1);
  const numOfCardTotal = (numOfCardPerLine * numOfCardPerLine - 1) / 2;

  /**
   * cardList state의 변경 연산이 과하므로
   * setCardList([prev => {...}]) 식으로 하지 않고
   * newCardList를 먼저 연산한 후 setState을 날려준다.
   */
  const onClickCard = (targetIndex: number) => {
    if (countdown > 0) {
      return;
    }
    let selector = "";
    // already opened. Do nothing.
    if (cardList[targetIndex].state === "open") selector = "already_opened";
    // first card opened.
    else if (tempIndex === -1) {
      selector = "first";
    }
    // second card opened. Match
    else if (cardList[targetIndex].no === cardList[tempIndex].no)
      selector = "match";
    // second card opened. no Match
    else if (cardList[targetIndex].no !== cardList[tempIndex].no)
      selector = "unmatch";

    switch (selector) {
      case "first":
        console.log("first");
        const newCardList: Array<Card> = [
          ...cardList.slice(0, targetIndex),
          {
            ...cardList[targetIndex],
            state: "open",
          },
          ...cardList.slice(targetIndex + 1),
        ];
        setCardList(newCardList);
        setTempIndex(targetIndex);
        break;
      case "match":
        console.log("match");
        // game complete
        if (numOfMatch === numOfCardTotal - 1) {
          handleGameEnd();
        } else {
          const newCardList2: Array<Card> = [
            ...cardList.slice(0, targetIndex),
            {
              ...cardList[targetIndex],
              state: "open",
            },
            ...cardList.slice(targetIndex + 1),
          ];
          setCardList(newCardList2);
          setNumOfMatch((prev) => prev + 1);
          setTempIndex(-1);
        }
        break;
      case "unmatch":
        console.log("unmatch", tempIndex);
        const newCardList3 = cardList.map((card, index): Card => {
          if (index === targetIndex) {
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
        break;
      default:
        break;
    }
  };

  // card image url download [todo] firebase v9 storage getBlob 알아보기
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
    return () => {
      // 게임 도중 dependencies에 의해 발생할일이 없음. 따라서 여기서 clearInterval
      if (countdownTimer.current) {
        clearInterval(countdownTimer.current);
      }
    };
  }, [
    numOfCardPerLine,
    numOfCardTotal,
    cardWidth,
    startLoading,
    endLoading,
    invokeError,
  ]);
  useEffect(() => {
    if (countdown < 0) {
      // clear countdownTimer
      if (countdownTimer.current) {
        clearInterval(countdownTimer.current);
      }
    } else if (countdown === 0) {
      // game start.
      setCardList((prev) =>
        prev.map((card) => ({
          ...card,
          state: "close",
        }))
      );
      saveStarttime();
    } else if (countdown === 6) {
      setCardList((prev) =>
        prev.map((card) => ({
          ...card,
          state: "open",
        }))
      );
    } else if (countdown === 7) {
      if (cardList.length !== 0) {
        const Sec_slidingTotalDuration = (cardList.length - 1) / 20 + 0.1;
        setTimeout(() => {
          countdownTimer.current = setInterval(() => {
            if (countdown > 0) {
              setCountdown((prev) => prev - 1);
            }
          }, 1000);
        }, Sec_slidingTotalDuration * 1000);
      }
    }
  }, [countdown, cardList.length, saveStarttime]);

  return (
    <Container>
      <Timer isActive={countdown < 1} />
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

export default FlipcardPlaying;
