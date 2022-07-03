import { FieldValue } from "firebase/firestore";

export type GameCategoryType = "single" | "multi";
export type PageRouteType =
  | "web"
  | "mobile"
  | "mypage"
  | "xbox"
  | "playstation";
export type LoginRouteType = "signup" | "signin" | "forgotpassword";
export type GamecodeType = "flipcard" | "onetofifty" | "fortress" | string;
export type GameStateType = "intro" | "playing" | "result";

export interface IUser {
  id: string; // auto
  name: string;
  email: string;
  thumbnail: string;
  // likes: Array<string> // userId
  // rankings: Array<string>; // rankingId
}

export interface IGame {
  id: string; // auto
  code: string; // 프로젝트에서 구분을 쉽게하기 위해 id와 별도로 추가.
  category: string;
  title: string;
  thumbnail: string;
  description: string;
  trailer: string;
  creator: {
    name: string;
    thumbnail: string;
  };
  difficulties: Array<string>;
  likes: Array<string>; // userId
  rankings: Array<IRanking>; // rankingId
}

export interface IRanking {
  id?: string; // auto;
  gameId: string;
  userId: string;
  difficulty: string;
  record: number;
  recordToRender: string;
  createdAt: FieldValue;
  topTen: number; // firebase server monitoring, 순위밖: -1
}
