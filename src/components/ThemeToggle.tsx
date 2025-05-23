import { useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(localStorage.theme == "dark");

  const updateThemeClass = () => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  };

  const toggleTheme = () => {
    if (isDark) {
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      localStorage.theme = "dark";
      setIsDark(true);
    }
    updateThemeClass();
  };

  return (
    <div>
      <button onClick={toggleTheme}>{isDark ? "Light" : "Dark"}</button>
    </div>
  );
};

export default ThemeToggle;
