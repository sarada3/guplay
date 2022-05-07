export type GameCategoryType = "puzzle" | "arcade";
export type PageRouteType = "web" | "mobile" | "mypage";
export type LoginRouteType = "signup" | "signin" | "forgotpassword";
export type GamecodeType = "flipcard" | "onetofifty" | "fortress" | string;
export type GameStateType = "init" | "playing" | "end";

export interface IUser {
  id: string; // auto
  name: string;
  email: string;
  thumbnail: string;
}

export interface IGame {
  id: string; // auto
  code: GamecodeType;
  category: string;
  title: string;
  description: string;
  like: Array<string>;
  thumbnail: string;
  creator: {
    name: string;
    thumbnail: string;
  };
}

// collection: ranking-[game.code]
export interface IRanking {
  id: string; // auto
  userId: string;
  result: string;
  createdAt: any; // todo firebase timestamp로 변경
}
