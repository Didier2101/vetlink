"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { ArrowRight, User, HeartPulse } from "lucide-react";

const CTASection = () => {
  const { isDarkMode, theme } = useTheme();

  return (
    <section
      className={`py-16 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-800"
      } text-white`}
    >
      <div className="container mx-auto px-4 text-center">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-white"
          }`}
        >
          ¿Listo para unirte a VetLink?
        </h2>
        <p
          className={`text-xl mb-8 max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-gray-200"
          }`}
        >
          Regístrate ahora y empieza a disfrutar de todos los beneficios para el
          cuidado de tu mascota.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => alert("¡Pronto disponible!")}
            className={`${theme.buttonBg} text-white font-bold py-3 px-6 rounded-lg transition duration-300 hover:opacity-90 flex items-center justify-center`}
          >
            <User size={18} className="mr-2" />
            Registrarse como Dueño
            <ArrowRight size={16} className="ml-2" />
          </button>

          <button
            onClick={() => alert("¡Pronto disponible!")}
            className={`${
              isDarkMode
                ? "bg-white hover:bg-gray-100 text-gray-900"
                : "bg-white hover:bg-gray-50 text-gray-800"
            } font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center`}
          >
            <HeartPulse size={18} className="mr-2" />
            Registrarse como Veterinario
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
