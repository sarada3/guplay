import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const getUrl = async (path: string) => {
  const url = await getDownloadURL(ref(storage, path));
  return url;
};
