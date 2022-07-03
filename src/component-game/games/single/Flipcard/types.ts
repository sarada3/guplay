/**
 * none: 초기값
 * open: 열림(앞면)
 * close: 닫힘(뒷면)
 * unmatch_temp_close: 이전 클릭으로 인해 열려있는데
 *                     현재 클릭이 unmatch된 경우
 *                     현재 클릭한 카드와 동시에 닫히기 위해 조금 delay후 닫힘
 * unmatch_target_close: 클릭했는데 unmatch라 바로 다시 닫힘
 * re_unmatch_target_close: 위와 동일하나 같은 state값은 memo로 인해 재랜더링 방지해놓았으므로 새로운 state으로 주기 위함
 */
export type CardState =
  | "none"
  | "open"
  | "close"
  | "unmatch_temp_close"
  | "unmatch_target_close"
  | "re_unmatch_target_close";

export type Card = {
  no: number;
  path: string;
  state: CardState;
  url: string;
  translate: {
    x: number;
    y: number;
  };
};
