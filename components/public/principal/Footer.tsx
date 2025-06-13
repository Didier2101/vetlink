"use client";

import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="py-12 pb-20 md:pb-0 bg-gray-800 text-gray-400"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand and Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-100">
              <span className="sr-only">VetLink</span>
              VetLink
            </h3>
            <p className="mb-4 max-w-xs">
              La plataforma veterinaria más completa para el cuidado de tus
              mascotas.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => alert("En construcción")}
                className="hover:text-gray-200 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </button>
              <button
                onClick={() => alert("En construcción")}
                className="hover:text-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </button>
              <button
                onClick={() => alert("En construcción")}
                className="hover:text-gray-200 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </button>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-100">Legal</h3>
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
                    className="hover:text-gray-200 transition-colors text-left w-full"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-100">Contacto</h3>
            <address className="not-italic">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail
                    size={18}
                    className="mr-2 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href="mailto:info@vetlink.com"
                    className="hover:text-gray-200 transition-colors"
                  >
                    info@vetlink.com
                  </a>
                </li>
                <li className="flex items-start">
                  <Phone
                    size={18}
                    className="mr-2 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href="tel:+5712345678"
                    className="hover:text-gray-200 transition-colors"
                  >
                    +57 1 234 5678
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin
                    size={18}
                    className="mr-2 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>Bogotá, Colombia</span>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 py-8  text-center">
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
