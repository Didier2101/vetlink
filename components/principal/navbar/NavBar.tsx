"use client";

import React, { useState, useEffect } from "react";
import ThemeToggle from "@/src/ui/ThemeToggle";
import { useTheme } from "../ThemeProvider";
import { NavLinks } from "./NavLinks";
import { Logo } from "@/src/ui/Logo";
import { LoginButton } from "@/src/ui/LoginButton";

const NavBar = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  // const [isAuthHovered, setIsAuthHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? `hidden md:block py-4 shadow-md ${theme.bgColor}` : "py-4"
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

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-1">
          <ThemeToggle variant="icon-only" />
          <LoginButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
