"use client";
import React from "react";
import { Heart, Shield, Sparkles, Users, Stethoscope, Store, PawPrint, ShoppingBag } from "lucide-react";
import { concert_one } from "@/src/lib/fonts";

const HeroSection = () => {
  return (
    <section className="">
      {/* Background gradient with animated elements */}

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-center relative z-10 gap-8 lg:gap-12">
        <div className=" py-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50 rounded-full border border-blue-200 dark:border-blue-700 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Sistema de salud #1 para tus mascotas.
            </span>
          </div>

          <h1
            className={`${concert_one.className} text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent`}
          >
            Cuidamos de tu mascota como tú lo harías
          </h1>

          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
            La plataforma veterinaria más completa con historial médico digital,
            citas en línea y sistema de recuperación para el bienestar total de tu mascota.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-emerald-600" />
              <span>+10k familias</span>
            </div>
            <div className="flex items-center">
              <Stethoscope className="w-4 h-4 mr-1 text-blue-600" />
              <span>500+ veterinarias</span>
            </div>
            <div className="flex items-center">
              <Store className="w-4 h-4 mr-1 text-purple-600" />
              <span>200+ servicios</span>
            </div>
          </div>

          {/* Feature highlights - ahora con 4 características */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Historial médico seguro (existente) */}
            <div className="group flex items-center p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-semibold text-base">
                  Historial médico seguro
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Encriptado y protegido
                </p>
              </div>
            </div>

            {/* Cuidado personalizado (existente) */}
            <div className="group flex items-center p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-semibold text-base">
                  Cuidado personalizado
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Para cada mascota
                </p>
              </div>
            </div>

            {/* Paseos seguros (nuevo) */}
            <div className="group flex items-center p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <PawPrint className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-semibold text-base">
                  Paseos seguros
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Con paseadores verificados
                </p>
              </div>
            </div>

            {/* Productos y servicios (nuevo) */}
            <div className="group flex items-center p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-semibold text-base">
                  Productos y servicios
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Todo en un solo lugar
                </p>
              </div>
            </div>
          </div>



          {/* Trust indicators */}
          <div className="mt-8 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              <span>Ecosistema completo</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>Red verificada</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span>Salud integral</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;