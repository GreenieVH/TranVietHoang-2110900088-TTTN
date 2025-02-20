import { useState, useEffect } from "react";

export const useDelayedLoadings = (loadingStates, minTime = 1000) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (loadingStates.some(Boolean)) {
      setShowLoading(true);
    } else {
      const timer = setTimeout(() => setShowLoading(false), minTime);
      return () => clearTimeout(timer);
    }
  }, [loadingStates, minTime]);

  return showLoading;
};
