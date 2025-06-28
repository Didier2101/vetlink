// src/components/navbar/NavLinks.tsx
"use client";

import Link from "next/link";
import { navLinks } from "@/src/data/navLinksData";
import React from "react";

export const NavLinks = () => {
  return (
    <div className="w-full overflow-x-auto md:overflow-visible">
      <div className="flex items-center space-x-1 min-w-max md:min-w-0">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="px-4 py-3 rounded-xl flex items-center transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 group"
          >
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 transition-all duration-300">
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {React.createElement(link.icon, {
                    size: 18
                  })}
                </span>
              </div>
              <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {link.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};