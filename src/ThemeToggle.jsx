import { useState, useEffect } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem("theme");
    // Check system preference if no saved theme
    if (!savedTheme) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return savedTheme;
  });

  useEffect(() => {
    // Apply theme to document element
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <i class="fa-solid fa-cloud-moon" style={{ fontSize: "15px" }}></i>
      ) : (
        <i
          class="fa-solid fa-sun"
          style={{ fontSize: "15px", color: "white" }}
        ></i>
      )}
    </button>
  );
}

export default ThemeToggle;
