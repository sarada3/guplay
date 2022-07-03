export type BlockEffect = "none" | "in" | "out";

export type Block = {
  num: number;
  effect: BlockEffect;
};
