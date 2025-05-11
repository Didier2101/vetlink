"use client";

import {
  ThemeIcons,
  ThemeMode,
  useTheme,
} from "@/components/principal/ThemeProvider";
import React, { useState, useEffect } from "react";

interface ThemeToggleProps {
  variant?: "desktop" | "mobile" | "icon-only";
  className?: string;
  menuPosition?: "top" | "bottom" | "left" | "right" | "auto";
}

const ThemeToggle = ({
  variant = "desktop",
  className = "",
  menuPosition = "auto",
}: ThemeToggleProps) => {
  const { isDarkMode, themeMode, setThemeMode, theme } = useTheme();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const themeOptions: {
    label: string;
    value: ThemeMode;
    icon: React.ReactNode;
  }[] = [
    { label: "Claro", value: "light", icon: ThemeIcons.light },
    { label: "Oscuro", value: "dark", icon: ThemeIcons.dark },
    { label: "Sistema", value: "system", icon: ThemeIcons.system },
  ];

  const getCurrentThemeIcon = () => {
    return (
      ThemeIcons[themeMode] || (isDarkMode ? ThemeIcons.dark : ThemeIcons.light)
    );
  };

  const handleThemeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsThemeMenuOpen(!isThemeMenuOpen);
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    setIsThemeMenuOpen(false);
  };

  // Cerrar el menú al hacer clic fuera o al presionar ESC
  useEffect(() => {
    const handleClickOutside = () => {
      setIsThemeMenuOpen(false);
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsThemeMenuOpen(false);
      }
    };

    if (isThemeMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
      return () => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [isThemeMenuOpen]);

  // Determinar la estructura basada en la variante
  const renderToggleButton = () => {
    if (variant === "icon-only") {
      return (
        <button
          onClick={handleThemeClick}
          className={`relative flex items-center justify-center ${className}`}
          aria-label="Cambiar tema"
        >
          {getCurrentThemeIcon()}
        </button>
      );
    }

    return (
      <button
        onClick={handleThemeClick}
        className={`relative flex items-center border border-amber-50 gap-2 rounded-lg px-3 py-2 ${
          isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
        } ${className}`}
        aria-label="Cambiar tema"
      >
        {getCurrentThemeIcon()}
        {variant === "desktop" && (
          <span className={theme.textColor}>
            {themeOptions.find((opt) => opt.value === themeMode)?.label ||
              "Tema"}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="relative">
      {renderToggleButton()}

      {isThemeMenuOpen && (
        <div
          className={`absolute w-44 rounded-md ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 
          transform transition-all duration-200 ease-out scale-100 opacity-100
          ${
            menuPosition === "auto"
              ? "right-0 mt-2 origin-top-right"
              : menuPosition === "top"
              ? "bottom-full mb-2 right-0 origin-bottom-right"
              : menuPosition === "left"
              ? "right-full mr-2 top-0 origin-top-right"
              : menuPosition === "right"
              ? "left-full ml-2 top-0 origin-top-left"
              : menuPosition === "bottom"
              ? "top-full mt-2 right-0 origin-top-right"
              : "right-0 mt-2 origin-top-right"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-1">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className={`w-full flex items-center px-4 py-3 ${
                  theme.textColor
                } ${theme.hoverColor} ${
                  themeMode === option.value
                    ? isDarkMode
                      ? "bg-gray-700 text-teal-400"
                      : "bg-gray-100 text-teal-600"
                    : ""
                } ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
              >
                <span className="mr-2">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
