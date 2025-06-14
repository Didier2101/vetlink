"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { registerUser } from "@/app/actions/auth";
import {
  Mail,
  Lock,
  ShieldCheck,
  Check,
  AlertTriangle,
  User2Icon,

} from "lucide-react";
import { RegistroFormData, registroSchema } from "@/schemas/auth/auth";




const RegistroForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [planInfo, setPlanInfo] = useState({
    planId: "",
    role: "",
    planTitle: "",
    planPrice: "0",
    planBasePrice: "0",
    planFinalPrice: "0",
    billingType: "MONTHLY",
    planDescription: "",
    planPeriod: "",
    features: [] as { name: string; id: string }[],
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegistroFormData>({
    resolver: zodResolver(registroSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      planId: 0,
      role: "owner",
    },
  });

  useEffect(() => {
    const planId = searchParams.get("planId") || "";
    const role = searchParams.get("role") || searchParams.get("roleName") || "owner";
    const planTitle = searchParams.get("planTitle") || "";
    const planBasePrice = searchParams.get("planBasePrice") || "0";
    const planFinalPrice = searchParams.get("planFinalPrice") || "0";
    const billingType = searchParams.get("billingType") || "MONTHLY";
    const planPeriod = searchParams.get("planPeriod") || "";
    const planDescription = searchParams.get("planDescription") || "";
    const featuresParam = searchParams.get("features");

    let features: { name: string; id: string }[] = [];

    if (featuresParam) {
      try {
        features = JSON.parse(featuresParam);
      } catch {
        features = [];
      }
    }

    setPlanInfo({
      planId,
      role,
      planTitle,
      planPrice: planFinalPrice,
      planBasePrice,
      planFinalPrice,
      billingType,
      planDescription,
      planPeriod,
      features,
    });

    if (planId) {
      setValue("planId", Number(planId));
    }

    if (role) {
      // Validar que el rol sea uno de los permitidos
      const validRoles = ["clinic", "owner", "store", "veterinarian", "walker"];
      const validRole = validRoles.includes(role.toLowerCase()) ? role.toLowerCase() : "owner";
      setValue("role", validRole as RegistroFormData["role"]);
    }

  }, [searchParams, setValue]);



  const onSubmit = async (data: RegistroFormData) => {
    console.log("data", data);
    const result = await registerUser(data);

    if (!result.success) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.message || "Algo salió mal. Intenta de nuevo.",
        confirmButtonColor: "#ef4444",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        html: `
          <div>
            <p>${result.message || "Tu cuenta ha sido creada exitosamente."}</p>
            <p class="mt-4">Hemos enviado un correo de verificación a <strong>${data.email}</strong>.</p>
            <p class="text-sm text-gray-500 mt-2">
              Por favor revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
            </p>
            <p class="text-sm text-gray-500 mt-1">
              ¿No recibiste el correo? <a href="/verify-email/resend" class="text-blue-500 hover:underline">Reenviar correo</a>
            </p>
          </div>
        `,
        confirmButtonColor: "#22c55e",
        confirmButtonText: "Entendido",
      }).then(() => {
        router.push("/auth/login");
      });
    }
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Regístrate para comenzar
        </h1>

      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Plan Summary */}
        <div className="lg:w-1/3">
          <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 flex items-center justify-center">
                <User2Icon />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Plan: {planInfo.planTitle}
                </h3>
              </div>
            </div>

            {planInfo.planPrice !== "0" && (
              <div className="mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-teal-400">
                  ${Number(planInfo.planPrice).toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm ml-1">
                  /{planInfo.planPeriod}
                </span>
              </div>
            )}

            {planInfo.planDescription && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {planInfo.planDescription}
              </p>
            )}

            <div className="space-y-2">
              {planInfo.features.map((feature, i) => (
                <div key={i} className="flex items-center">
                  <Check size={16} className="text-teal-600 mr-2" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <ShieldCheck
                size={16}
                className="text-blue-600 dark:text-blue-400 mr-2"
              />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                Tus datos están protegidos con encriptación de última generación
              </span>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="lg:w-2/3">
          <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Información de acceso
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correo electrónico *
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertTriangle size={14} className="mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertTriangle size={14} className="mr-1" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Términos */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  {...register("terms")}
                  className="w-4 h-4 mt-1 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-teal-500"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  Acepto los{" "}
                  <a href="#" className="text-teal-600 hover:underline">
                    términos y condiciones
                  </a>{" "}
                  *
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertTriangle size={14} className="mr-1" />
                  {errors.terms.message}
                </p>
              )}

              {/* Botón */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50"
              >
                <ShieldCheck size={18} className="mr-2" />
                {isSubmitting ? "Procesando..." : "Completar registro"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="text-teal-600 hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroForm;
