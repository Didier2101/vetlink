"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

// Define theme types
export type ThemeMode = "light" | "dark" | "system";

// Create theme context with expanded options
export const ThemeContext = createContext({
  themeMode: "system" as ThemeMode,
  isDarkMode: false,
  setThemeMode: (mode: ThemeMode) => {},
  toggleDarkMode: () => {},
  theme: {
    bgColor: "",
    bgColorTransparent: "",
    textColor: "",
    logoColor: "",
    hoverColor: "",
    activeColor: "",
    buttonBg: "",
    borderColor: "",
    inputBg: "",
    cardBg: "",
    shadowColor: "",
  },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // States for theme mode and dark mode status
  const [themeMode, setThemeModeSetting] = useState<ThemeMode>("system");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Determine if system prefers dark mode
  const getSystemPreference = (): boolean => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  // Set theme mode and update UI
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeSetting(mode);
    localStorage.setItem("vetlink-theme-mode", mode);

    // Apply appropriate dark mode setting based on mode
    if (mode === "system") {
      const systemPrefersDark = getSystemPreference();
      setIsDarkMode(systemPrefersDark);
      updateDocumentClass(systemPrefersDark);
    } else {
      const isDark = mode === "dark";
      setIsDarkMode(isDark);
      updateDocumentClass(isDark);
    }
  };

  // Helper to update document class
  const updateDocumentClass = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Toggle between light and dark (if in system mode, switch to specific mode)
  const toggleDarkMode = () => {
    if (themeMode === "system") {
      setThemeMode(isDarkMode ? "light" : "dark");
    } else {
      setThemeMode(isDarkMode ? "light" : "dark");
    }
  };

  // Initialize theme on first load
  useEffect(() => {
    // Load saved theme mode preference
    const savedThemeMode =
      (localStorage.getItem("vetlink-theme-mode") as ThemeMode) || "system";
    setThemeModeSetting(savedThemeMode);

    // Apply appropriate dark setting based on mode
    if (savedThemeMode === "system") {
      setIsDarkMode(getSystemPreference());
    } else {
      setIsDarkMode(savedThemeMode === "dark");
    }

    // Update document class
    updateDocumentClass(
      savedThemeMode === "system"
        ? getSystemPreference()
        : savedThemeMode === "dark"
    );

    // Listen for system preference changes
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleDarkModeChange = (e: MediaQueryListEvent): void => {
      if (themeMode === "system") {
        setIsDarkMode(e.matches);
        updateDocumentClass(e.matches);
      }
    };

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);
    return () =>
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
  }, [themeMode]);

  // Theme colors object
  const theme = {
    bgColor: isDarkMode ? "bg-gray-900" : "bg-white",
    bgColorTransparent: isDarkMode ? "bg-gray-900/80" : "bg-white/80",
    textColor: isDarkMode ? "text-gray-300" : "text-gray-600",
    logoColor: isDarkMode ? "text-teal-400" : "text-teal-600",
    hoverColor: isDarkMode ? "hover:text-teal-400" : "hover:text-teal-600",
    activeColor: isDarkMode ? "bg-gray-800" : "bg-gray-100",
    buttonBg: isDarkMode
      ? "bg-teal-700 hover:bg-teal-800"
      : "bg-teal-600 hover:bg-teal-700",
    borderColor: isDarkMode ? "border-gray-800" : "border-gray-100",
    inputBg: isDarkMode ? "bg-gray-800" : "bg-gray-50",
    cardBg: isDarkMode ? "bg-gray-800" : "bg-white",
    shadowColor: isDarkMode ? "shadow-gray-900/30" : "shadow-gray-300/30",
  };

  return (
    <ThemeContext.Provider
      value={{ themeMode, isDarkMode, setThemeMode, toggleDarkMode, theme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

// Icon mapping to use throughout the application
export const ThemeIcons = {
  light: <Sun size={18} className="text-yellow-500" />,
  dark: <Moon size={18} className="text-blue-400" />,
  system: <Monitor size={18} className="text-gray-500" />,
};
