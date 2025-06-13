// src/components/navbar/AuthButton.tsx
"use client";

import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/auth/login")}
      className="flex items-center px-4 py-3 rounded-xl gap-2 transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 group"
    >
      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 transition-all duration-300">
        <LogIn
          size={18}
          className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
        />
      </div>
      <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        Iniciar Sesión
      </span>
    </button>
  );
};