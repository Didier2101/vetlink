"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/components/principal/ThemeProvider";
import { Logo } from "@/src/ui/Logo";
import { NavLink } from "@/src/data/navbarLinks";
import UserProfilePanel from "@/src/ui/UserProfilePanel";

interface NavBarSidebarProps {
  links: NavLink[];
  session: {
    name?: string;
    email: string;
    category: "owner" | "vet" | "clinic" | "store";
    planName?: string;
  };
  mobileMenuOpen: boolean;
}

const NavBarSidebar: React.FC<NavBarSidebarProps> = ({
  links,
  session,
  mobileMenuOpen,
}) => {
  const { isDarkMode } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={` h-screen flex flex-col transition-all duration-300 ease-in-out ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } border-r ${isDarkMode ? "border-gray-700" : "border-gray-200"} ${
        expanded ? "w-64" : "w-16"
      } ${
        mobileMenuOpen
          ? "translate-x-0 bottom-16"
          : "lg:translate-x-0 lg:bottom-0 -translate-x-full"
      }`}
    >
      {/* Logo y botón de expandir/contraer */}
      <div
        className={`p-4 border-b flex items-center justify-between ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        {expanded && <Logo />}

        <button
          onClick={() => setExpanded(!expanded)}
          className={`p-2 rounded-lg ${
            isDarkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          } ml-auto`}
          aria-label={expanded ? "Contraer menú" : "Expandir menú"}
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Menú de navegación */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2">
          {links.map((link) => (
            <li className="mb-1" key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center p-3 rounded-lg transition  ${
                  pathname === link.href
                    ? `${
                        isDarkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`
                    : `${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`
                }`}
              >
                <span className={expanded ? "mr-3" : "mx-auto"}>
                  {link.icon}
                </span>
                {expanded && (
                  <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {link.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Panel de usuario */}
      <UserProfilePanel session={session} expanded={expanded} />
    </aside>
  );
};

export default NavBarSidebar;
