//React
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { set } from "../redux/themeSlice.ts";
//Utility modules
import { THEME } from "../types";

const ThemeButton = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    dispatch(set(next));
  };

  return (
    <div className="theme-container">
      <div className="switch-button-wrapper" onClick={toggleTheme}>
        <div className="dark">{THEME.LIGHT}</div>
        <div className="light">{THEME.DARK}</div>
        <div
          className={`theme-switcher__dark ${
            theme === THEME.DARK
              ? "theme-switcher__dark"
              : "theme-switcher__light"
          }`}
        >
          {theme === THEME.DARK ? THEME.DARK : THEME.LIGHT}
        </div>
      </div>
    </div>
  );
};

export default ThemeButton;
