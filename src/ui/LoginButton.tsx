// src/components/navbar/AuthButton.tsx
"use client";

import { useTheme } from "@/components/principal/ThemeProvider";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
  const { isDarkMode, theme } = useTheme();

  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/auth/login")}
      className={`flex items-center px-4 py-3 rounded-lg gap-2 ${
        theme.textColor
      } ${theme.hoverColor} ${
        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
      }`}
    >
      <LogIn size={16} />
      {/* <span className=" hidden md:block">Iniciar Sesión</span> */}
    </button>
  );
};
