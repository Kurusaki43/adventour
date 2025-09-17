import { useEffect } from "react";

export function useResetTheme() {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add("light");
  }, []);
}
