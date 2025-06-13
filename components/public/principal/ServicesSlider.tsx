"use client";
import React from "react";
import Slider from "react-slick";
import {
  Shield,
  Calendar,
  Users,
  PawPrint,
  ShoppingBag,
  Stethoscope,
  Heart,

  Store,

} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { concert_one } from "@/src/lib/fonts";

const ServicesSlider = () => {
  // Configuración del slider (idéntica a la original)
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

  // Servicios basados en los planes VetLink
  const services = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Historial Médico Seguro",
      description: "Encriptado y protegido para todas tus mascotas",
      plan: "Todos los planes",
      bgColor: "bg-gradient-to-br from-teal-500 to-teal-600",
      iconColor: "text-white"
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Cuidado Personalizado",
      description: "Planes de salud adaptados a cada mascota",
      plan: "Desde Mi Mascota",
      bgColor: "bg-gradient-to-br from-red-500 to-pink-600",
      iconColor: "text-white"
    },
    {
      icon: <PawPrint className="w-7 h-7" />,
      title: "Paseos Seguros",
      description: "Con paseadores verificados y rastreo GPS",
      plan: "Plan Paseadores PRO",
      bgColor: "bg-gradient-to-br from-amber-500 to-amber-600",
      iconColor: "text-white"
    },
    {
      icon: <ShoppingBag className="w-7 h-7" />,
      title: "Productos y Servicios",
      description: "Todo lo que necesitas en un solo lugar",
      plan: "Plan Tiendas PRO",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      iconColor: "text-white"
    },
    {
      icon: <Calendar className="w-7 h-7" />,
      title: "Agendamiento Inteligente",
      description: "Citas en línea con profesionales verificados",
      plan: "Desde Mi Mascota",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconColor: "text-white"
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Gestión Multi-Mascotas",
      description: "Hasta 3 perfiles en un solo lugar",
      plan: "Mi Manada Esencial",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
      iconColor: "text-white"
    },
    {
      icon: <Stethoscope className="w-7 h-7" />,
      title: "Historial Clínico Profesional",
      description: "Para veterinarios y clínicas aliadas",
      plan: "Plan Veterinario PRO",
      bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      iconColor: "text-white"
    },
    {
      icon: <Store className="w-7 h-7" />,
      title: "Vitrina Digital",
      description: "Para tiendas de productos veterinarios",
      plan: "Plan Tiendas PRO",
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
      iconColor: "text-white"
    }
  ];

  return (
    <section className="mt-16">
      <div className="">


        <h2 className={`${concert_one.className}  text-4xl font-bold text-center mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent`}>
          Servicios VetLink
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">
          Descubre todo lo que nuestra plataforma ofrece para el cuidado de tu mascota
        </p>

        <div className="relative">
          <Slider {...settings}>
            {services.map((service, index) => (
              <div key={index} className="px-2 py-4 focus:outline-none">
                <div className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-gray-800/80 backdrop-blur-lg  border border-gray-200/50 dark:border-gray-700/50  hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${service.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {React.cloneElement(service.icon, {
                      className: `${service.iconColor}`
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                      {service.plan}
                    </span>
                  </div>
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