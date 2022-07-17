import {
  DocumentReference,
  onSnapshot,
  query,
  orderBy,
  limit,
  doc,
  where,
  serverTimestamp,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { userCollection, gameCollection, rankingCollection } from "../firebase";

import { IUser, GameCategoryType, IRanking, IGame } from "../types";

// ===================================  User  ===================================
export const createUser = async (user: IUser) => {
  const userRef = doc(userCollection, user.id);
  await setDoc(userRef, user);
};

export const readUser = async (userId: string) => {
  const userRef = doc(userCollection, userId);
  const documentSnapshot = await getDoc(userRef);
  if (documentSnapshot.exists()) {
    return { ...documentSnapshot.data(), id: documentSnapshot.id };
  } else {
    return null;
  }
};

export const updateUser = async (userId: string, payload: IUser) => {
  const userRef = doc(userCollection, userId);
  await updateDoc(userRef, payload);
};

// ===================================  Game  ===================================

export const readGames = async () => {
  try {
    const q = query(gameCollection);
    const querySnapshot = await getDocs(q);
    const result: Array<IGame> = [];
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateGameLike = async (
  gameId: string,
  userId: string,
  currentLike: boolean
) => {
  const gameRef = doc(gameCollection, gameId);
  try {
    const arrayBehavior = currentLike ? arrayRemove : arrayUnion;
    await updateDoc(gameRef, {
      likes: arrayBehavior(userId),
    });
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

// ===================================  Ranking  ===================================

export const updateRankingSingle = async (
  user: IUser,
  gameId: string,
  difficulty: string,
  record: number,
  recordToRender: string
) => {
  const response: {
    status: "new" | "update" | "noupdate"; // 처음기록, 기록갱신, 기록갱신X
    ranking: IRanking | null;
  } = {
    status: "noupdate", // default는 발생빈도가 가장 높은 noupdate.
    ranking: null,
  };
  try {
    const q = query(
      rankingCollection,
      where("gameId", "==", gameId),
      where("userId", "==", user.id),
      where("difficulty", "==", difficulty)
    );
    const querySnapshot = await getDocs(q);
    const payload: IRanking = {
      gameId,
      userId: user.id,
      difficulty,
      record,
      recordToRender,
      createdAt: serverTimestamp(),
      topTen: -1,
    };
    let newDocRef: DocumentReference;
    // 기록이 없거나, 이전 기록보다 좋은 경우에만 업데이트.
    if (querySnapshot.empty) {
      newDocRef = await addDoc(rankingCollection, payload);
      response.ranking = { ...payload, id: newDocRef.id };
      response.status = "new";
    } else if (record < querySnapshot.docs[0].data().record) {
      await setDoc(querySnapshot.docs[0].ref, payload, {
        merge: true,
      });
      response.ranking = { ...payload, id: querySnapshot.docs[0].id };
      response.status = "update";
    }
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const readRankings = async (game: IGame) => {
  try {
    const _orderBy = game.category === "single" ? "asc" : "desc";
    const q = query(
      rankingCollection,
      where("gameId", "==", game.id),
      orderBy("record", _orderBy)
    );
    const querySnapshot = await getDocs(q);
    const result: Array<IRanking> = [];
    querySnapshot.forEach((documentSnapshot) => {
      result.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
