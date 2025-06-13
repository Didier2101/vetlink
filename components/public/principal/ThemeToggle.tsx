"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(storedTheme || (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (theme === null) return;

    document.documentElement.classList.toggle("dark", theme === "dark");

    if (theme === "system") {
      localStorage.removeItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  if (theme === null) return null;

  return (
    <button
      onClick={toggleTheme}
      className="group relative p-2 rounded-2xl transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
      aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-all duration-300">
        {theme === "light" ? (
          <Moon
            size={20}
            className="text-gray-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
          />
        ) : (
          <Sun
            size={20}
            className="text-amber-400 group-hover:text-amber-300 transition-colors duration-300"
          />
        )}
      </div>
    </button>
  );
};