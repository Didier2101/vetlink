"use client";

import React from "react";
import { Check, HeartPulse, Home, User, ShoppingBag } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { useRouter } from "next/navigation";
import { PlanType } from "@/types/planType";

interface PlanCardProps {
  pl: PlanType;
  isDarkMode: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ pl, isDarkMode }) => {
  const isBestPlan = pl.title === "Dueño Premium";
  const router = useRouter();
  const { theme } = useTheme();

  // Asignar iconos según la categoría
  const getIcon = () => {
    switch (pl.category) {
      case "owner":
        return <User size={20} className="mr-2" />;
      case "vet":
        return <HeartPulse size={20} className="mr-2" />;
      case "clinic":
        return <Home size={20} className="mr-2" />;
      case "store":
        return <ShoppingBag size={20} className="mr-2" />;
      default:
        return <User size={20} className="mr-2" />;
    }
  };

  const handleRegisterClick = () => {
    // Verificar que estamos en el cliente
    if (typeof window !== "undefined") {
      // Guardar en localStorage
      localStorage.setItem("selectedPlanId", pl.id.toString());
      localStorage.setItem("selectedCategory", pl.category);
      localStorage.setItem("selectedPlanTitle", pl.title);

      console.log("Datos guardados en localStorage:", {
        planId: pl.id,
        category: pl.category,
        title: pl.title,
      });

      // Redirigir después de asegurar que los datos están guardados
      setTimeout(() => {
        router.push("/auth/register");
      }, 100);
    }
  };

  return (
    <div
      className={`relative h-full p-6 rounded-2xl border transition-all duration-300 group
      ${
        isBestPlan
          ? isDarkMode
            ? "border-teal-400 shadow-teal-800/40"
            : "border-blue-600 shadow-blue-100"
          : isDarkMode
          ? "border-gray-700 shadow-black/20"
          : "border-gray-200 shadow-sm"
      }
      ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
      hover:shadow-lg ${
        isDarkMode ? "hover:shadow-teal-900/30" : "hover:shadow-blue-100"
      }`}
    >
      {/* Badge de mejor opción */}
      {isBestPlan && (
        <div
          className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold uppercase rounded-full
          ${isDarkMode ? "bg-teal-500 text-black" : "bg-blue-600 text-white"}`}
        >
          Mejor opción
        </div>
      )}

      {/* Encabezado con ícono y título */}
      <div className="flex items-center mb-4 space-x-2">
        {getIcon()}
        <h3
          className={`text-2xl font-semibold tracking-tight ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {pl.title}
        </h3>
      </div>

      {/* Descripción del plan */}
      <p
        className={`mb-4 leading-relaxed ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {pl.description}
      </p>

      {/* Precio y período */}
      <div className="my-6 flex items-baseline space-x-2">
        <span
          className={`text-4xl font-bold ${
            isDarkMode ? "text-teal-400" : "text-blue-600"
          }`}
        >
          ${pl.price.toLocaleString()}
        </span>
        <span
          className={`${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } text-sm`}
        >
          {pl.period}
        </span>
      </div>

      {/* Lista de características */}
      <div
        className={`mb-6 space-y-2 ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {pl.features.map((fac) => (
          <div key={fac.id} className="flex items-start">
            <Check
              size={18}
              className={`flex-shrink-0 mt-0.5 mr-2 ${
                isDarkMode ? "text-teal-400" : "text-green-500"
              }`}
            />
            <span>{fac.name}</span>
          </div>
        ))}
      </div>

      {/* Botón de acción */}
      <button
        onClick={handleRegisterClick}
        className={`w-full py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2
    ${
      isBestPlan
        ? isDarkMode
          ? "bg-teal-500 text-black hover:bg-teal-400"
          : "bg-blue-600 text-white hover:bg-blue-500"
        : pl.category === "store"
        ? `${theme.buttonBg} text-white hover:opacity-90`
        : isDarkMode
        ? "bg-gray-700 text-white hover:bg-gray-600"
        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
    focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      isDarkMode ? "focus:ring-teal-500" : "focus:ring-blue-500"
    }`}
      >
        <span>
          {pl.category === "store"
            ? "Registrar tienda"
            : pl.title.includes("Premium")
            ? "Contratar plan"
            : "Registrarse"}
        </span>
      </button>
    </div>
  );
};

export default PlanCard;
