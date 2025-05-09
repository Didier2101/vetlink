"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useTheme } from "../principal/ThemeProvider";
import { RegistroFormData, registroSchema } from "@/schemas/auth/register";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createUser } from "@/server/auth/register";

const RegistroForm = () => {
  const router = useRouter();
  const { isDarkMode, theme } = useTheme();
  const [planInfo, setPlanInfo] = useState({
    planId: "",
    category: "",
    title: "", // Added title property
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
      planId: 0, // Lo actualizaremos después con useEffect
      category: "", // Lo actualizaremos después con useEffect
    },
  });

  useEffect(() => {
    const planId = localStorage.getItem("selectedPlanId");
    const category = localStorage.getItem("selectedCategory");
    const title = localStorage.getItem("selectedPlanTitle");

    if (planId && category && title) {
      // Actualizamos el estado local
      setPlanInfo({
        planId: planId,
        category: category,
        title: title,
      });

      // También actualizamos los valores del formulario directamente
      setValue("planId", Number(planId));
      setValue("category", category);

      console.log("Datos cargados desde localStorage:", {
        planId: Number(planId),
        category: category,
        title: title,
      });
    } else {
      console.error("No se encontraron datos en localStorage.");
    }
  }, [setValue]);

  const onSubmit = async (data: RegistroFormData) => {
    try {
      // Preparamos los datos de registro
      const registroData = {
        email: data.email,
        password: data.password,
        planId: Number(planInfo.planId),
        category: planInfo.category,
      };

      // Mostramos en consola los datos que se enviarán y sus tipos
      console.log("DATOS DEL FORMULARIO:");
      console.log("Email:", data.email, "- Tipo:", typeof data.email);
      console.log("Password:", "******", "- Tipo:", typeof data.password);
      console.log("PlanId:", data.planId, "- Tipo:", typeof data.planId);
      console.log(
        "Category:",
        planInfo.category,
        "- Tipo:",
        typeof planInfo.category
      );

      // Mostramos el objeto completo para debug
      console.log("Objeto completo:", {
        formularioData: data,
        planInfoState: planInfo,
        registroDatos: registroData,
      });

      // Comentamos temporalmente la llamada a createUser para aislar el problema
      // const result = await createUser(registroData);

      // Simulamos éxito para verificar que el botón funciona correctamente
      alert(
        "Formulario enviado correctamente - Revisa la consola para ver los datos"
      );

      /* Comentamos temporalmente el resto del código para simplificar la depuración
      if (!result.success) {
        // Show error message
        Swal.fire({
          title: "Error",
          text: result.message || "Ocurrió un error durante el registro",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });
      } else {
        // Show success message and redirect
        Swal.fire({
          title: "¡Registro exitoso!",
          text: "Tu cuenta ha sido creada correctamente",
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          // Redirect based on category when user clicks the button
          if (result.isConfirmed) {
            console.log("Redirigiendo según categoría:", planInfo.category);

            switch (planInfo.category) {
              case "owner":
                router.push("/perfil/dueno");
                break;
              case "vet":
                router.push("/perfil/veterinario");
                break;
              case "clinic":
                router.push("/perfil/clinica");
                break;
              case "store":
                router.push("/perfil/tienda");
                break;
              default:
                router.push("/dashboard");
            }
          }
        });
      }
      */
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error en el formulario - Revisa la consola para más detalles");
    }
  };

  return (
    <div
      className={`min-h-screen py-24 md:py-24 lg:py-32 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div
            className={`p-8 rounded-xl shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h1
              className={`text-2xl font-bold mb-6 text-center ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {planInfo.category === "owner"
                ? "Registro de Dueño de Mascota"
                : planInfo.category === "vet"
                ? "Registro de Veterinario"
                : planInfo.category === "clinic"
                ? "Registro de Clínica"
                : planInfo.category === "store"
                ? "Registro de Tienda"
                : "Registro"}
            </h1>

            {planInfo.title && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-blue-50"
                }`}
              >
                <p
                  className={`text-center ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Registrándote como:{" "}
                  <span className="font-semibold capitalize">
                    {planInfo.category}
                  </span>
                </p>
                <p
                  className={`text-center mt-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Plan:{" "}
                  <span className="font-medium">
                    {planInfo.title.replace(/-/g, " ")}
                  </span>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Cambiado para asegurar que el valor se registre correctamente */}
              <input
                type="hidden"
                {...register("planId", {
                  setValueAs: (value) => Number(value) || 0,
                })}
                defaultValue={planInfo.planId}
              />
              <input
                type="hidden"
                {...register("category")}
                defaultValue={planInfo.category}
              />
              <div className="mb-4">
                <label
                  className={`block mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full p-3 pl-10 rounded-lg border border-gray-300"
                    placeholder="tu.email@ejemplo.com"
                  />
                  <Mail
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  className={`block mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type="password"
                    className="w-full p-3 pl-10 rounded-lg border border-gray-300"
                    placeholder="******"
                  />
                  <Lock
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition duration-300 font-bold
                  ${theme.buttonBg} text-white hover:opacity-90
                  ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
                `}
              >
                {isSubmitting ? (
                  "Procesando..."
                ) : (
                  <>
                    <span>Completar registro</span>
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroForm;
