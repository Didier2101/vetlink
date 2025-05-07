"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import Slider from "react-slick";
import {
  Shield,
  Calendar,
  MapPin,
  PawPrint,
  Syringe,
  Stethoscope,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServicesSlider = () => {
  const { isDarkMode, theme } = useTheme();

  // Configuración del slider optimizada
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          dots: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  // Servicios veterinarios
  const services = [
    {
      icon: <Shield size={24} />,
      title: "Historial Médico Digital",
      description:
        "Acceso completo al historial de tu mascota desde cualquier dispositivo.",
    },
    {
      icon: <Calendar size={24} />,
      title: "Citas Inteligentes",
      description:
        "Agenda citas con veterinarios y recibe recordatorios automáticos.",
    },
    {
      icon: <MapPin size={24} />,
      title: "Recuperación de Mascotas",
      description:
        "Placas inteligentes para localizar a tu mascota si se pierde.",
    },
    {
      icon: <PawPrint size={24} />,
      title: "Guardería Canina",
      description:
        "Cuidado profesional para tu mascota cuando no estás en casa.",
    },
    {
      icon: <Syringe size={24} />,
      title: "Vacunación Completa",
      description: "Programa de vacunación personalizado para tu mascota.",
    },
    {
      icon: <Stethoscope size={24} />,
      title: "Consultas Urgentes",
      description: "Atención veterinaria inmediata para emergencias.",
    },
  ];

  return (
    <section
      className={`py-16 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } overflow-hidden`}
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold text-center mb-12 ${theme.textColor}`}
        >
          Nuestros Servicios Veterinarios
        </h2>

        <div className="relative">
          <Slider {...settings}>
            {services.map((service, index) => (
              <div key={index} className="px-2 focus:outline-none">
                <div
                  className={`p-6 rounded-xl h-full mx-2 transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700 hover:shadow-lg hover:shadow-teal-900/20"
                      : "bg-white hover:shadow-lg hover:shadow-blue-100 border border-gray-100"
                  }`}
                  style={{ minHeight: "250px" }}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                      isDarkMode ? "bg-teal-900/50" : "bg-blue-50"
                    }`}
                  >
                    {React.cloneElement(service.icon, {
                      className: isDarkMode ? "text-teal-400" : "text-blue-600",
                    })}
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;
