"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, ShoppingCart } from "lucide-react";

const SmartTagSection = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);

  const features = [
    "Notificación inmediata cuando alguien encuentre a tu mascota",
    "Diseño resistente y duradero",
    "Personalizable con el nombre de tu mascota",
    "Compatible con cualquier collar",
    "Tecnología avanzada con codigo QR",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 10000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`py-16 ${
        isDarkMode ? "bg-teal-900" : "bg-blue-600"
      } text-white`}
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Contenido de texto */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Placa Inteligente VetLink
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Protege a tu mascota con nuestra placa con ID único que permite a
            cualquier persona reportarla como encontrada sin revelar tu
            información personal.
          </p>

          {/* Lista de características */}
          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check
                  size={24}
                  className={`mr-3 mt-1 flex-shrink-0 ${
                    isDarkMode ? "text-teal-300" : "text-blue-200"
                  }`}
                />
                <span className="opacity-95">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Botón de compra */}
          <button
            onClick={() => router.push("/placa")}
            className={`flex items-center font-bold py-3 px-6 rounded-lg transition duration-300 ${
              isDarkMode
                ? "bg-white text-teal-900 hover:bg-teal-100"
                : "bg-white text-blue-600 hover:bg-blue-50"
            }`}
          >
            <ShoppingCart size={20} className="mr-2" />
            Comprar Placa ($25.000)
          </button>
        </div>

        {/* Contenedor de imágenes con efecto de volteo */}
        <div className="lg:w-1/2 flex justify-center relative ">
          <div className="relative w-auto h-auto perspective-1000 ">
            {/* Imagen frontal */}
            <div
              className={`relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${
                currentImage === 0 ? "rotate-y-0" : "rotate-y-180"
              }`}
            >
              <Image
                src="/placa-frente.jpg"
                alt="Frente de la placa inteligente VetLink"
                width={500}
                height={500}
                className=" shadow-2xl w-full h-auto object-contain rounded-[80px] md:rounded-[102px] backface-hidden"
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 35vw, 400px"
                quality={90}
              />
            </div>

            {/* Imagen trasera */}
            <div
              className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${
                currentImage === 1 ? "rotate-y-0" : "rotate-y-180"
              }`}
            >
              <Image
                src="/placa-reverso.jpg"
                alt="Respaldo de la placa inteligente VetLink"
                width={500}
                height={500}
                className="w-full h-auto object-contain rounded-[70px] md:rounded-[80px] shadow-lg backface-hidden"
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 35vw, 400px"
                quality={90}
              />
            </div>

            {/* Efecto de brillo */}
            <div
              className={`absolute inset-0 ${
                isDarkMode
                  ? "bg-gradient-to-b from-teal-900/30 via-transparent to-teal-900/20"
                  : "bg-gradient-to-b from-blue-600/20 via-transparent to-blue-600/10"
              } pointer-events-none rounded-7xl`}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartTagSection;
