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
