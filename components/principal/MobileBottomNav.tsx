"use client";

import React from "react";
import Link from "next/link";
import { Home, Building, Users, ShoppingBag, Tag } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const MobileBottomNav = () => {
  const { theme } = useTheme();

  const navLinks = [
    { name: "Inicio", href: "/", icon: <Home size={24} /> },
    { name: "Clínicas", href: "/clinicas", icon: <Building size={24} /> },
    { name: "Veterinarios", href: "/veterinarios", icon: <Users size={24} /> },
    { name: "Tiendas", href: "/tiendas", icon: <ShoppingBag size={24} /> },
    { name: "Placa", href: "/placa", icon: <Tag size={24} /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      <div
        className={`flex justify-around items-center py-3 px-2 ${theme.bgColor} border-t ${theme.borderColor}`}
      >
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`flex flex-col items-center p-2 rounded-full ${theme.textColor} ${theme.hoverColor}`}
          >
            {link.icon}
            <span className="text-xs mt-1">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
