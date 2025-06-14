"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Info,
  ShieldCheck,
} from "lucide-react";
import { LoginFormData, loginSchema } from "@/schemas/auth/auth";
import Swal from "sweetalert2";
import Link from "next/link";

import { loginUser, resendVerificationEmail } from "@/app/actions/auth";

const Login = () => {
  const router = useRouter();
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
      const result = await loginUser(loginData);

      if (!result.success) {
        // Mensaje especial para email no verificado
        if (result.message?.includes("verifica tu email")) {
          return Swal.fire({
            icon: "warning",
            title: "Verificación requerida",
            html: `
                        <div>
                            <p>${result.message}</p>
                            <p class="mt-3">¿No recibiste el correo?</p>
                            <button id="resend-btn" class="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                                Reenviar correo de verificación
                            </button>
                        </div>
                    `,
            confirmButtonColor: "#3b82f6",
            didOpen: () => {
              document.getElementById('resend-btn')?.addEventListener('click', async () => {
                Swal.showLoading();
                const resendResult = await resendVerificationEmail(loginData.email);
                Swal.fire({
                  icon: resendResult.success ? "success" : "error",
                  title: resendResult.success ? "Correo reenviado" : "Error",
                  text: resendResult.message,
                });
              });
            }
          });
        }

        // Mensaje de error normal para otros casos
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
          confirmButtonColor: "#ef4444",
        });
      }

      // Éxito en el login (manteniendo tu lógica original)
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: result.message,
        showConfirmButton: false,
        timer: 1500,
        background: "#f8fafc",
      }).then(() => {
        if (result.success) {
          const route = !result.user?.isProfileComplete
            ? `/${result.user?.role}/complete-profile`
            : `/${result.user.role}/dashboard`;
          console.log(`redirigiendo a ${route}`);
          router.push(route);
        }
      });
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error inesperado. Por favor, intenta nuevamente.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="pb-10">
      {/* Header centrado */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Inicia sesión en VetLink
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Conecta con los mejores profesionales para el cuidado de tu mascota
        </p>
      </div>

      {/* Contenedor principal responsive */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
        {/* Tarjeta de beneficios (solo en desktop) */}
        <div className=" md:mb-4 w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            Beneficios de tu cuenta
          </h2>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 flex-shrink-0">
                <Info size={18} className="text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  Historial completo
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Accede al historial médico completo de tus mascotas desde
                  cualquier dispositivo
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 flex-shrink-0">
                <Info size={18} className="text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  Agenda inteligente
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Programa y gestiona citas con veterinarios y cuidadores
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 flex-shrink-0">
                <Info size={18} className="text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  Comunidad exclusiva
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Conéctate con otros dueños de mascotas y profesionales
                </p>
              </div>
            </div>
          </div>

          <div className=" p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-900/30">
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={24}
                className="text-teal-600 dark:text-teal-400 flex-shrink-0"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Tus datos están protegidos con encriptación de última generación
              </span>
            </div>
          </div>
        </div>

        {/* Formulario centrado */}
        <div className="w-full max-w-md  bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Ingresa a tu cuenta
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                    }`}
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Recordar y olvidar contraseña */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-teal-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Recordar sesión
                </label>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70"
            >
              {isSubmitting ? (
                "Iniciando sesión..."
              ) : (
                <>
                  Iniciar sesión <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Enlace a registro */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/register"
              className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
            >
              Regístrate ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
