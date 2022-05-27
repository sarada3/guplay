import { useState, useCallback } from "react";

/**
 * HTTP통신에 따른 로딩, 에러 출력에 재사용
 */
function useLoadingAndError() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);
  const endLoading = useCallback(() => {
    setLoading(false);
  }, []);
  const invokeError = useCallback(() => {
    setError(true);
  }, []);
  return { loading, error, startLoading, endLoading, invokeError };
}

export default useLoadingAndError;
