import { useEffect, useState } from "react";
import { useTheme } from "../context/themeContext";
import { getCSSVar } from "../utils/getCssVar";

export const useColorTheme = (defaultColor: string | undefined = "#fff000") => {
  const [primaryColor, setPrimaryColor] = useState(defaultColor);
  const { theme } = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const color = getCSSVar("--color-primary");
      if (color) setPrimaryColor(color);
    }, 50);
    return () => clearTimeout(timeout);
  }, [theme]);

  return primaryColor;
};
