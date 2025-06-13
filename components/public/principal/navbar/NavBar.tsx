// src/components/navbar/NavBar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { NavLinks } from "./NavLinks";
import { Logo } from "@/src/ui/Logo";
import { LoginButton } from "@/src/ui/LoginButton";
import { ThemeToggle } from "../ThemeToggle";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-2 ${isScrolled
        ? "bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur-lg"
        : "backdrop-blur-lg "
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <NavLinks />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LoginButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;