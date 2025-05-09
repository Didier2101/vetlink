"use client";

import { useTheme } from "./ThemeProvider";
import { useRouter } from "next/navigation";
import { Check, ShoppingCart } from "lucide-react";
import ImagePlaca from "@/src/ui/ImagePlaca";

const SmartTagSection = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const features = [
    "Notificación inmediata cuando alguien encuentre a tu mascota",
    "Diseño resistente y duradero",
    "Personalizable con el nombre de tu mascota",
    "Compatible con cualquier collar",
    "Tecnología avanzada con codigo QR",
  ];

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
          <div className="relative w-auto h-auto ">
            <ImagePlaca />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartTagSection;
