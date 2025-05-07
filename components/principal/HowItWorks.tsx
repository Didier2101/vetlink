"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const { isDarkMode, theme } = useTheme();

  const steps = [
    {
      number: 1,
      title: "Regístrate gratis",
      description:
        "Crea tu cuenta y añade el perfil de tus mascotas con sus datos básicos.",
    },
    {
      number: 2,
      title: "Conecta con veterinarios",
      description: "Busca profesionales cerca de ti y programa citas en línea.",
    },
    {
      number: 3,
      title: "Mantén todo organizado",
      description:
        "Accede al historial médico, recetas y recordatorios en un solo lugar.",
    },
  ];

  return (
    <section className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold text-center mb-12 ${theme.textColor}`}
        >
          ¿Cómo funciona VetLink?
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Imagen de la app */}
          <div className="hidden md:block lg:w-2/1 w-full max-w-[400px] mx-auto lg:mx-0">
            <div className="relative  overflow-hidden  aspect-[3/4]">
              <Image
                src="/foto-app.png"
                alt="Pantalla de la aplicación VetLink"
                fill
                className="object-contain"
                quality={80}
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 35vw, 400px"
              />
            </div>
          </div>
          {/* Pasos */}
          <div className="lg:w-1/2 w-full space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="group">
                <div className="flex items-start gap-4 transition-all duration-300 group-hover:translate-x-2">
                  <span
                    className={`${
                      isDarkMode ? "bg-teal-700" : "bg-blue-600"
                    } text-white rounded-full w-8 h-8 flex items-center justify-center mt-1 flex-shrink-0`}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => alert("¡Pronto disponible!")}
              className={`${theme.buttonBg} text-white font-bold py-3 px-6 rounded-lg transition duration-300 hover:opacity-90 flex items-center mt-6`}
            >
              Comenzar ahora
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
