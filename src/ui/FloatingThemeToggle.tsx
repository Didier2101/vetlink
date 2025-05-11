"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/components/principal/ThemeProvider";

interface FloatingThemeToggleProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const FloatingThemeToggle = ({
  position = "bottom-right",
}: FloatingThemeToggleProps) => {
  const { isDarkMode } = useTheme();

  // Definir las clases de posición
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <div className={`fixed bottom-0 ${positionClasses[position]} z-50`}>
      <div
        className={`rounded-full p-3  flex items-center justify-center ${
          isDarkMode
            ? "bg-gray-800 text-white shadow-gray-900/30"
            : "bg-white text-gray-800 shadow-gray-200/70"
        } transition-all duration-300 hover:scale-110`}
      >
        <ThemeToggle
          variant="icon-only"
          menuPosition={
            position === "bottom-right" || position === "bottom-left"
              ? "top"
              : position === "top-right" || position === "top-left"
              ? "bottom"
              : "auto"
          }
        />
      </div>
    </div>
  );
};

export default FloatingThemeToggle;
