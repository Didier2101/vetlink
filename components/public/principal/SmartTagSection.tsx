"use client";

import { useRouter } from "next/navigation";
import { Check, ShoppingCart } from "lucide-react";
import ImagePlaca from "@/src/ui/ImagePlaca";
import { concert_one } from "@/src/lib/fonts";

const SmartTagSection = () => {
  const router = useRouter();

  const features = [
    "Notificación inmediata cuando alguien encuentre a tu mascota",
    "Diseño resistente y duradero",
    "Personalizable con el nombre de tu mascota",
    "Compatible con cualquier collar",
    "Tecnología avanzada con codigo QR",
  ];

  return (
    <section className="py-16">
      <div className=" flex flex-col lg:flex-row items-center  gap-8 lg:gap-12">
        {/* Contenido de texto */}
        <div className="lg:w-1/2">
          <h2 className={`${concert_one.className}  text-4xl font-bold  mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent`}>
            Placa Inteligente VetLink
          </h2>
          <p className="text-md mb-8  text-gray-600">
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
                  className="mr-3 mt-1 flex-shrink-0 text-green-400"
                />
                <span className="text-gray-500">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Botón de compra */}
          <button
            onClick={() => router.push("/placa")}
            className="flex items-center font-bold py-3 px-6 rounded-lg transition duration-300 bg-white text-blue-600 hover:bg-blue-50"
          >
            <ShoppingCart size={20} className="mr-2" />
            Comprar Placa ($25.000)
          </button>
        </div>

        {/* Contenedor de imágenes con efecto de volteo */}
        <div className="lg:w-1/2 flex justify-center relative">
          <div className="relative w-auto h-auto">
            <ImagePlaca />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartTagSection;
