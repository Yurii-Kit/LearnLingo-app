import { useTheme } from "../ThemeContext/ThemeContext";

import css from "./ThemeSwitcher.module.css";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      aria-label="theme toggle"
      title={`theme switch - ${theme === "dark" ? "light" : "dark"}`}
      className={css.btnToggle}
      onClick={toggleTheme}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
