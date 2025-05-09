"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { ArrowRight, Heart, Shield } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  const { isDarkMode, theme } = useTheme();

  return (
    <section
      className={`relative ${theme.bgColor} py-24 md:py-24 lg:py-32 overflow-hidden min-h-[80vh] flex items-center`}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? "bg-gradient-to-b from-teal-900/30 to-gray-900"
            : "bg-gradient-to-b from-teal-50 to-white"
        } z-0`}
      ></div>
      {/* Background pattern/decoration */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-teal-500 filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500 filter blur-3xl"></div>
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center relative z-10 gap-8 lg:gap-12">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Cuidamos de tu mascota como tú lo harías
          </h1>
          <p
            className={`text-lg md:text-xl mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            La plataforma veterinaria más completa con historial médico digital,
            citas en línea y sistema de recuperación.
          </p>

          {/* Feature highlights */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`flex items-center p-3 rounded-lg ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/80"
              } backdrop-blur-sm shadow-sm`}
            >
              <div
                className={`p-2 rounded-full mr-3 ${
                  isDarkMode ? "bg-teal-900" : "bg-teal-100"
                }`}
              >
                <Shield
                  size={20}
                  className={isDarkMode ? "text-teal-400" : "text-teal-600"}
                />
              </div>
              <p className={theme.textColor}>Historial médico seguro</p>
            </div>
            <div
              className={`flex items-center p-3 rounded-lg ${
                isDarkMode ? "bg-gray-800/50" : "bg-white/80"
              } backdrop-blur-sm shadow-sm`}
            >
              <div
                className={`p-2 rounded-full mr-3 ${
                  isDarkMode ? "bg-teal-900" : "bg-teal-100"
                }`}
              >
                <Heart
                  size={20}
                  className={isDarkMode ? "text-teal-400" : "text-teal-600"}
                />
              </div>
              <p className={theme.textColor}>Cuidado personalizado</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => alert("¡Pronto disponible!")}
              className={`${theme.buttonBg} text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center hover:opacity-90`}
            >
              Regístrate Gratis
              <ArrowRight size={16} className="ml-2" />
            </button>
            <button
              onClick={() => alert("¡Pronto disponible!")}
              className={`border-2 ${
                isDarkMode
                  ? "border-teal-700 text-teal-400 hover:bg-teal-900/40"
                  : "border-teal-600 text-teal-600 hover:bg-teal-50"
              } font-bold py-3 px-6 rounded-lg transition duration-300`}
            >
              Soy Veterinario
            </button>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full  max-w-[280px] md:max-w-[400px]">
            <Image
              width={500}
              height={500}
              src="/mascotas.jpg" // Cambia esta ruta por tu imagen real
              alt="Mascotas felices"
              className="w-full rounded-lg shadow-xl relative z-10 object-cover"
            />
            {/* Decorative elements */}
            <div
              className={`absolute -bottom-4 -right-4 w-full h-full rounded-lg ${
                isDarkMode ? "bg-teal-800" : "bg-teal-200"
              } -z-10`}
            ></div>
            <div
              className={`absolute -top-4 -left-4 w-32 h-32 rounded-full ${
                isDarkMode ? "bg-blue-800/50" : "bg-blue-100"
              } -z-10`}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
