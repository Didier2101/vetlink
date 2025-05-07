"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
// import Image from "next/image";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const { isDarkMode } = useTheme();

  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Dueña de Max",
      content:
        "Gracias a VetLink pude encontrar a mi perro Max cuando se perdió. La persona que lo encontró escaneó la placa y me contactaron inmediatamente.",
      rating: 5,
    },
    {
      id: 2,
      name: "Dr. Carlos Méndez",
      role: "Veterinario",
      content:
        "La gestión de citas y el acceso al historial médico de mis pacientes ha mejorado mucho mi eficiencia como veterinario. Muy recomendado para profesionales.",
      rating: 5,
    },
    {
      id: 3,
      name: "Laura Ramírez",
      role: "Dueña de gatos",
      content:
        "Los recordatorios de vacunas y medicamentos me han salvado de varios olvidos. Ahora tengo todo el cuidado de mis gatos bajo control.",
      rating: 5,
    },
    // Puedes agregar más testimonios aquí que podrían mostrarse con paginación
    // o filtrando si lo deseas en el futuro
  ];

  return (
    <section className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Lo que dicen nuestros usuarios
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className={`p-6 rounded-xl transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  {/* <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  /> */}
                </div>
                <div>
                  <h4
                    className={`font-bold ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {testimonial.name}
                  </h4>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      isDarkMode ? "text-yellow-400" : "text-yellow-500"
                    } fill-current`}
                  />
                ))}
              </div>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                &quot;{testimonial.content}&quot;
              </p>
            </div>
          ))}
        </div>

        {/* Opcional: Botón para ver más testimonios si decides implementar paginación */}
        {/* <div className="text-center mt-12">
          <button className={`px-6 py-2 rounded-lg font-medium ${
            isDarkMode
              ? "bg-teal-600 hover:bg-teal-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } transition-colors`}>
            Ver más testimonios
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialsSection;
