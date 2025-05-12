"use client";

import { useRouter } from "next/navigation";
import { logout } from "../lib/auth";
import Swal from "sweetalert2";
import { useTheme } from "@/components/principal/ThemeProvider";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const { isDarkMode, theme } = useTheme();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión actual.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f", // rojo
      cancelButtonColor: isDarkMode ? "#4b5563" : "#9ca3af", // gris oscuro o claro según tema
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      background: isDarkMode ? "#1f2937" : "#fff",
      color: isDarkMode ? "#f9fafb" : "#111827",
    });

    if (result.isConfirmed) {
      const res = await logout();
      if (res.success) {
        await Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          background: isDarkMode ? "#1f2937" : "#fff",
          color: isDarkMode ? "#f9fafb" : "#111827",
        });
        router.push("/");
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo cerrar la sesión.",
          icon: "error",
          confirmButtonColor: "#e3342f",
          background: isDarkMode ? "#1f2937" : "#fff",
          color: isDarkMode ? "#f9fafb" : "#111827",
        });
      }
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`
        group flex items-center justify-center 
        px-4 py-2 rounded-lg font-medium 
        transition-all duration-200
        ${theme.buttonBg}
      `}
      aria-label="Cerrar sesión"
    >
      <LogOut
        size={20}
        className={`
         text-white
          group-hover:scale-110 transition-transform duration-200
        `}
      />
    </button>
  );
}
