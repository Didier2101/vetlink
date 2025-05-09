"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  LogIn,
  Home,
  Building,
  Users,
  ShoppingBag,
  Tag,
  PawPrint,
} from "lucide-react";
import { useTheme, ThemeMode, ThemeIcons } from "./ThemeProvider";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isAuthHovered, setIsAuthHovered] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const { isDarkMode, themeMode, setThemeMode, theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close theme menu when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => {
      setIsThemeMenuOpen(false);
    };

    if (isThemeMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isThemeMenuOpen]);

  const navLinks = [
    { name: "Inicio", href: "/", icon: <Home size={18} /> },
    { name: "Clínicas", href: "/clinicas", icon: <Building size={18} /> },
    { name: "Veterinarios", href: "/veterinarios", icon: <Users size={18} /> },
    { name: "Tiendas", href: "/tiendas", icon: <ShoppingBag size={18} /> },
    { name: "Placa", href: "/placa", icon: <Tag size={18} /> },
  ];

  const themeOptions: {
    label: string;
    value: ThemeMode;
    icon: React.ReactNode;
  }[] = [
    { label: "Claro", value: "light", icon: ThemeIcons.light },
    { label: "Oscuro", value: "dark", icon: ThemeIcons.dark },
    { label: "Sistema", value: "system", icon: ThemeIcons.system },
  ];

  const getCurrentThemeIcon = () => {
    return (
      ThemeIcons[themeMode] || (isDarkMode ? ThemeIcons.dark : ThemeIcons.light)
    );
  };

  const handleThemeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsThemeMenuOpen(!isThemeMenuOpen);
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    setIsThemeMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  ${
        isScrolled
          ? ` hidden md:block py-4 shadow-md ${theme.bgColor}`
          : "py-4 "
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className={`font-bold text-xl flex items-center gap-1 ${theme.logoColor} transition-colors`}
          >
            <PawPrint size={22} />
            <span>VetLink</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`px-3 py-2 rounded-full ${theme.textColor} ${theme.hoverColor} transition-all duration-300 flex items-center gap-1 hover:scale-105`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Actions Zone */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Theme Toggle */}
          <div className="relative">
            <button
              onClick={handleThemeClick}
              className={`p-2 rounded-full ${
                isThemeMenuOpen ? theme.buttonBg : theme.activeColor
              } transition-colors flex items-center gap-1`}
            >
              {getCurrentThemeIcon()}
            </button>

            {isThemeMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } transition-all duration-300 origin-top-right`}
                onClick={(e) => e.stopPropagation()}
              >
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    className={`w-full flex items-center px-4 py-3 ${
                      theme.textColor
                    } ${theme.hoverColor} ${
                      themeMode === option.value
                        ? isDarkMode
                          ? "bg-gray-700 text-teal-400"
                          : "bg-gray-100 text-teal-600"
                        : ""
                    } ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                  >
                    <span className="mr-3">{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Button */}
          <div className="relative">
            <button
              onClick={() => alert("¡Pronto disponible!")}
              className={`flex items-center px-4 py-3 rounded-lg  ${
                theme.textColor
              } ${theme.hoverColor} ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
            >
              <LogIn size={16} className="mr-2" />
              <span>Iniciar Sesión</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={handleThemeClick}
            className={`p-2 rounded-full ${theme.activeColor} transition-colors`}
          >
            {getCurrentThemeIcon()}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full ${theme.activeColor} transition-colors`}
          >
            {isMenuOpen ? (
              <X size={20} className={theme.textColor} />
            ) : (
              <Menu size={20} className={theme.textColor} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col">
            {/* Theme options in mobile menu */}
            <div className={`py-3 px-4 border-b ${theme.borderColor}`}>
              <p className={`${theme.textColor} mb-2 font-medium`}>Tema</p>
              <div className="flex justify-between">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    className={`flex flex-col items-center px-4 py-2 rounded-lg ${
                      theme.textColor
                    } ${
                      themeMode === option.value
                        ? isDarkMode
                          ? "bg-gray-800 text-teal-400"
                          : "bg-gray-100 text-teal-600"
                        : ""
                    }`}
                  >
                    <span className="mb-1">{option.icon}</span>
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Auth links */}
            <div className={`mt-3 pt-3 border-t ${theme.borderColor}`}>
              <button
                onClick={() => alert("¡Pronto disponible!")}
                className={`flex items-center py-3 px-4 ${theme.textColor} ${theme.hoverColor}`}
              >
                <LogIn size={18} className="mr-3" />
                <span>Iniciar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Theme Menu - Only shows when theme button clicked and main menu is closed */}
      {isThemeMenuOpen && !isMenuOpen && (
        <div
          className={`lg:hidden absolute right-4 top-16 w-40 rounded-lg shadow-lg overflow-hidden ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } transition-all duration-300 origin-top-right`}
          onClick={(e) => e.stopPropagation()}
        >
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleThemeChange(option.value)}
              className={`w-full flex items-center px-4 py-3 ${
                theme.textColor
              } ${theme.hoverColor} ${
                themeMode === option.value
                  ? isDarkMode
                    ? "bg-gray-700 text-teal-400"
                    : "bg-gray-100 text-teal-600"
                  : ""
              } ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
            >
              <span className="mr-3">{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
