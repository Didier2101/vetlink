"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import {
  MapPin,
  Mail,
  Phone,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`py-12 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-800"
      } text-gray-400`}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1: Logo y redes */}
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-100"
              }`}
            >
              VetLink
            </h3>
            <p className="mb-4">
              La plataforma veterinaria más completa para el cuidado de tus
              mascotas.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => alert("En construcción")}
                className={`hover:${
                  isDarkMode ? "text-white" : "text-gray-200"
                }`}
              >
                <Twitter size={20} />
              </button>
              <button
                onClick={() => alert("En construcción")}
                className={`hover:${
                  isDarkMode ? "text-white" : "text-gray-200"
                }`}
              >
                <Instagram size={20} />
              </button>
              <button
                onClick={() => alert("En construcción")}
                className={`hover:${
                  isDarkMode ? "text-white" : "text-gray-200"
                }`}
              >
                <Linkedin size={20} />
              </button>
            </div>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-100"
              }`}
            >
              Legal
            </h3>
            <ul className="space-y-2">
              {[
                "Términos y Condiciones",
                "Política de Privacidad",
                "Cookies",
                "FAQ",
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => alert("En construcción")}
                    className={`hover:${
                      isDarkMode ? "text-white" : "text-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-100"
              }`}
            >
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>info@vetlink.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>+57 1 234 5678</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Bogotá, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`border-t ${
            isDarkMode ? "border-gray-800" : "border-gray-700"
          } pt-8 text-center`}
        >
          <p>
            &copy; {new Date().getFullYear()} VetLink. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
