import {
  onSnapshot,
  query,
  orderBy,
  limit,
  where,
  getDocs,
} from "firebase/firestore";
import { gameCollection } from "../firebase";

import { IGame, GameCategoryType } from "../types";

export const getGames = async (category: GameCategoryType) => {
  try {
    const q = query(gameCollection, where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const result: Array<IGame> = [];
    querySnapshot.forEach((doc) => {
      const docData: IGame = doc.data();
      result.push(docData);
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
