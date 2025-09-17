import { useState, useEffect, useCallback } from "react";

export const useSticky = (threshold: number = 250) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = useCallback(() => {
    const shouldBeSticky = window.scrollY > threshold; // set your threshold
    if (shouldBeSticky !== isSticky) {
      setIsSticky(shouldBeSticky);
    }
  }, [isSticky, threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return isSticky;
};
