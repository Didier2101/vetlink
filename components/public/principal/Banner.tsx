"use client";

import { Heart, Shield, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const Banner = () => {
  const [currentAd, setCurrentAd] = useState(0);

  const ads = [
    {
      title: "Nutrición Premium",
      subtitle: "Alimento balanceado para tu mascota",
      bg: "bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30",
      icon: <Heart className="text-orange-500" size={24} />,
    },
    {
      title: "Cuidado Dental",
      subtitle: "Mantén los dientes de tu mascota sanos",
      bg: "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30",
      icon: <Sparkles className="text-blue-500" size={24} />,
    },
    {
      title: "Seguro Veterinario",
      subtitle: "Protege a tu mascota con nuestro seguro",
      bg: "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30",
      icon: <Shield className="text-green-500" size={24} />,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [ads.length]);

  return (
    <div
      className={`rounded-2xl p-4 sm:p-6 ${ads[currentAd].bg} border border-gray-200/50 dark:border-gray-700/50 shadow-md`}
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Header */}
        <div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-1">
            Recomendaciones para ti
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Descubre productos y servicios ideales para el bienestar de tu
            mascota.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            <div className="bg-white/80 dark:bg-gray-800/80 p-2 sm:p-3 rounded-xl shadow-sm">
              {ads[currentAd].icon}
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
                {ads[currentAd].title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {ads[currentAd].subtitle}
              </p>
            </div>
          </div>

          {/* Button */}
          <button className="w-full sm:w-auto sm:min-w-[100px] bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-200 shadow-sm">
            Ver más
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAd(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentAd
                  ? "bg-emerald-500 scale-125"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Mostrar recomendación ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
