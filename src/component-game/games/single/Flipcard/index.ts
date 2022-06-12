import FlipcardSetting from "./FlipcardSetting";
import FlipcardPlaying from "./FlipcardPlaying";

export type Card = {
  no: number;
  path: string;
  state:
    | "none"
    | "open"
    | "close"
    | "unmatch_temp_close"
    | "unmatch_target_close"
    | "re_unmatch_target_close";
  url: string;
  translate: {
    x: number;
    y: number;
  };
};

export type Difficulty = "3x3" | "5x5" | "7x7";

export { FlipcardSetting, FlipcardPlaying };
