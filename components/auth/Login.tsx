"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useTheme } from "../principal/ThemeProvider";
import { LoginFormData, loginSchema } from "@/schemas/auth/register";
import Swal from "sweetalert2";
import { login } from "@/server/auth/login";

const Login = () => {
  const router = useRouter();
  const { isDarkMode, theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = async (loginData: LoginFormData) => {
    try {
      const result = await login(loginData); // Asegúrate de tener esta función definida

      if (!result.success) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
        });
        return;
      } else {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: result.message,
          showConfirmButton: false,
          timer: 1500,
        });
        switch (result.category) {
          case "owner":
            router.push("/perfiles/owner");
            break;
          case "vet":
            router.push("/perfiles/vet");
            break;
          case "clinic":
            router.push("/perfiles/clinic");
            break;
          case "store":
            router.push("/perfiles/store");
            break;
          default:
            router.push("/");
        }
      }
    } catch (err) {
      console.error("Error de inicio:", err);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-all duration-300 ease-in-out 
        ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Iniciar sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1">Correo electrónico</label>
            <div className="relative">
              <input
                type="email"
                autoComplete="email"
                {...register("email")}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tu.email@ejemplo.com"
              />
              <Mail
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div className="mb-4">
            <label className="block mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full p-3 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="******"
              />
              <Lock
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3.5 text-gray-400"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Recordarme y olvidaste */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              Recordarme
            </label>
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-blue-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Botón de login */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center transition duration-300
              ${theme.buttonBg} text-white hover:opacity-90 
              ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {isSubmitting ? (
              "Procesando..."
            ) : (
              <>
                <span>Iniciar sesión</span>
                <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
