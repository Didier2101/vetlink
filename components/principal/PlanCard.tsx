"use client";

import React from "react";
import {
  ArrowRight,
  Check,
  HeartPulse,
  Home,
  User,
  ShoppingBag,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Plan } from "@/data/plans";

interface PlanCardProps {
  plan: Plan;
  isDarkMode: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isDarkMode }) => {
  const { theme } = useTheme();

  // Asignar iconos según la categoría
  const getIcon = () => {
    switch (plan.category) {
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
    const categorias = {
      owner: "para Dueños",
      vet: "para Veterinarios",
      clinic: "para Clínicas",
      store: "para Tiendas",
    };

    alert(`Plan "${plan.title}" ${categorias[plan.category]} - Próximamente!`);
  };
  return (
    <div
      className={`h-full p-6 rounded-xl transition-all duration-300 ${
        isDarkMode
          ? plan.popular
            ? "border-2 border-teal-500 bg-gray-800"
            : "border border-gray-700 bg-gray-800"
          : plan.popular
          ? "border-2 border-blue-500 bg-white"
          : "border border-gray-200 bg-white"
      } hover:shadow-lg ${
        isDarkMode ? "hover:shadow-teal-900/20" : "hover:shadow-blue-100"
      }`}
    >
      {plan.popular && (
        <div
          className={`absolute top-0 right-0 ${
            isDarkMode ? "bg-teal-500" : "bg-blue-500"
          } text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg`}
        >
          POPULAR
        </div>
      )}
      <div className="flex items-center mb-2">
        {getIcon()}
        <h3
          className={`text-xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {plan.title}
        </h3>
      </div>
      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        {plan.description}
      </p>
      <div className="my-6">
        <span
          className={`text-4xl font-bold ${
            isDarkMode ? "text-teal-400" : "text-blue-600"
          }`}
        >
          {plan.price}
        </span>
        <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          {plan.period}
        </span>
      </div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check
              size={18}
              className={`flex-shrink-0 mt-0.5 mr-2 ${
                isDarkMode ? "text-teal-400" : "text-green-500"
              }`}
            />
            <span
              className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleRegisterClick}
        className={`w-full font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center ${
          plan.buttonVariant === "primary"
            ? `${theme.buttonBg} text-white hover:opacity-90`
            : isDarkMode
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        }`}
      >
        {plan.buttonText}
        {plan.buttonVariant === "primary" && (
          <ArrowRight size={16} className="ml-2" />
        )}
      </button>
    </div>
  );
};

export default PlanCard;
