// src/components/navbar/NavLinks.tsx
"use client";

import Link from "next/link";
import { navLinks } from "@/src/data/navLinksData";
import React from "react";
import { useTheme } from "../ThemeProvider";

export const NavLinks = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full overflow-x-auto md:overflow-visible">
      <div className="flex items-center space-x-1 min-w-max md:min-w-0">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`
              px-3 py-2 rounded-full 
              ${theme.textColor} ${theme.hoverColor} 
              transition-all duration-300 
              flex items-center gap-1 hover:scale-105
              whitespace-nowrap
            `}
          >
            <div className="flex flex-col md:flex-row items-center gap-1">
              {React.createElement(link.icon, { size: 18 })}
              <span className="text-xs md:text-base">{link.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
