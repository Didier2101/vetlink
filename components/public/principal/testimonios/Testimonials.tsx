"use client";

import React from "react";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
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
  ];

  return (
    <section className="py-16">
      <div className="px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Lo que dicen nuestros usuarios
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 rounded-xl transition-all duration-300 bg-white dark:bg-gray-900 hover:shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                  {/* Placeholder for avatar image */}
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-500 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-500">&quot;{testimonial.content}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
