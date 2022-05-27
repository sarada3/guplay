import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const useStorage = (path: string) => {
  const [src, setSrc] = useState("");
  useEffect(() => {
    const getData = async () => {
      const imageRef = ref(storage, path);
      const url = await getDownloadURL(imageRef);
      setSrc(url);
    };
    getData();
  }, [path]);
  return src;
};

export default useStorage;
