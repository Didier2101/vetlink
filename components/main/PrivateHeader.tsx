"use client";

import { Logo } from "@/src/ui/Logo";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../public/principal/ThemeToggle";
import { UserDropdown } from "./UserDropdown";
import { AlertCircle, Menu, X } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { calculatePlanStatus } from "@/src/utils/planUtils";
import { PrivateLayoutUserData } from "@/types/UserData";

const PrivateHeader = ({ userData }: { userData: PrivateLayoutUserData }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const planStatus = calculatePlanStatus({
    isTrial: userData.plan.isTrial,
    planStartedAt: userData.plan.planStartedAt ? userData.plan.planStartedAt.toISOString() : undefined,
    planExpiresAt: userData.plan.planExpiresAt ? userData.plan.planExpiresAt.toISOString() : undefined
  });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2 ${isScrolled
        ? "bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur-md"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          {!userData.isProfileComplete && (
            <div className="flex items-center gap-2 p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-md">
              <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-xs text-yellow-700 dark:text-yellow-300">
                Perfil incompleto
              </span>
            </div>
          )}

          {planStatus && (
            <div
              className={`px-3 py-1 rounded-md text-sm ${planStatus.isTrial
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                : planStatus.status === "expired"
                  ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                  : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                }`}
            >
              {planStatus.message}
            </div>
          )}

          <ThemeToggle />
          <UserDropdown user={userData} />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu
          user={userData}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default PrivateHeader;