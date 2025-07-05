"use client";

import { Logo } from "@/src/ui/Logo";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../public/principal/ThemeToggle";
import { UserDropdown } from "./UserDropdown";
import { Menu, X } from "lucide-react";
import { Session } from "@/types/typesSession";



interface PrivateHeaderProps {
  session: Session;
}

const PrivateHeader = ({ session }: PrivateHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2 ${isScrolled
        ? "bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur-md"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />

        <div className="hidden lg:flex items-center gap-4">
          {!session.isProfileComplete && (
            <p className=" text-red-500 text-md font-bold">Completa tu perfil</p>
          )}
          <ThemeToggle />
          <UserDropdown session={session} />

        </div>

        <div className="lg:hidden flex items-center gap-2">

          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PrivateHeader;
