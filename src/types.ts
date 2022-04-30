export type CategoryRouteType = "puzzle" | "arcade";
export type PageRouteType = "web" | "mobile";
export type GamecodeType = "FLIPCARD" | "ONETOFIFTY" | "FORTRESS" | string;

export interface IUser {
  name: string;
  thumbnail: string;
}

export interface IGame {
  code: GamecodeType;
  title: string;
  grade: number;
  category: string;
  thumbnail: string;
  author: {
    thumbnail: string;
    name: string;
  };
}
