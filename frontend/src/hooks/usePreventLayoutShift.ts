import { useEffect } from "react";

export function usePreventLayoutShift(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // compensate layout shift
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);
}
