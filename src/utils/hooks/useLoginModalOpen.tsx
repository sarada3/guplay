import { useState, useCallback } from "react";

/**
 * toggle을 쓰는것보다 open, close 두객를 쓰는게 가독성 좋고 안전.
 */
const useLoginModalOpen = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const openLoginModal = useCallback(() => {
    setLoginModalOpen(true);
  }, []);
  const closeLoginModal = useCallback(() => {
    setLoginModalOpen(false);
  }, []);
  return { loginModalOpen, openLoginModal, closeLoginModal };
};

export default useLoginModalOpen;
