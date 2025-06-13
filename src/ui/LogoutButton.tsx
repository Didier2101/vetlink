"use client";

import { useRouter } from "next/navigation";
import { logout } from "../lib/auth";
import Swal from "sweetalert2";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión actual.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6", // blue-500
      cancelButtonColor: "#6b7280", // gray-500
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
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
        });
        router.push("/");
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo cerrar la sesión.",
          icon: "error",
          confirmButtonColor: "#3b82f6",
        });
      }
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-3 rounded-xl gap-2 transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 group"
    >
      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 transition-all duration-300">
        <LogOut
          size={18}
          className="text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400"
        />
      </div>
      <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
        Cerrar Sesión
      </span>
    </button>
  );
}