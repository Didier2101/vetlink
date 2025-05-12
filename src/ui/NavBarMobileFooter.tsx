"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/components/principal/ThemeProvider";
import { NavLink } from "../data/navbarLinks";

interface NavBarMobileFooterProps {
  links: NavLink[];
}

const NavBarMobileFooter: React.FC<NavBarMobileFooterProps> = ({ links }) => {
  const { isDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mostrar máximo 4 enlaces en el footer móvil
  const footerLinksCount = Math.min(links.length, 4);
  const mobileFooterLinks = links.slice(0, footerLinksCount);

  // Cerrar menú móvil cuando cambia la ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Cerrar menú móvil en tamaños más grandes de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Menú Footer para móvil */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex justify-around items-center h-16">
          {mobileFooterLinks.map((link) => (
            <Link
              key={`mobile-${link.href}`}
              href={link.href}
              className={`flex flex-col items-center justify-center flex-1 h-full p-1 ${
                pathname === link.href
                  ? `${
                      isDarkMode
                        ? "text-blue-400 bg-gray-700"
                        : "text-blue-600 bg-gray-100"
                    }`
                  : `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
              }`}
            >
              <span className="mb-1">{link.icon}</span>
              <span className="text-xs truncate">{link.label}</span>
            </Link>
          ))}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex flex-col items-center justify-center flex-1 h-full p-1 ${
              mobileMenuOpen
                ? `${
                    isDarkMode
                      ? "text-blue-400 bg-gray-700"
                      : "text-blue-600 bg-gray-100"
                  }`
                : `${isDarkMode ? "text-gray-300" : "text-gray-600"}`
            }`}
            aria-label="Más opciones"
          >
            <span className="mb-1">
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </span>
            <span className="text-xs">Más</span>
          </button>
        </div>
      </div>

      {/* Overlay para móvil */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bottom-16 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default NavBarMobileFooter;
