import { createContext, ReactNode, useState } from "react";
import { Theme } from "../types/Theme";

type ThemeContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, _setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "light",
  );

  const setTheme = (theme: Theme) => {
    _setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
