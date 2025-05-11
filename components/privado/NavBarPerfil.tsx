"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PawPrint,
  CalendarCheck,
  Building2,
  ShoppingBag,
  Syringe,
  Stethoscope,
  Users2,
  Package,
  ClipboardList,
  UserSquare,
  User2,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useTheme } from "@/components/principal/ThemeProvider";
// import ThemeToggle from "@/src/ui/ThemeToggle";
import LogoutButton from "@/src/ui/LogoutButton";
import { Logo } from "@/src/ui/Logo";

interface UserSession {
  name?: string;
  email: string;
  category: "owner" | "vet" | "clinic" | "store";
  planName?: string;
}

interface Props {
  category: "owner" | "vet" | "clinic" | "store";
  session: UserSession;
}

const getLinksWithIcons = (category: string) => {
  switch (category) {
    case "owner":
      return [
        {
          href: "/owner/mascotas",
          label: "Mis Mascotas",
          icon: <PawPrint size={18} />,
        },
      ];
    case "vet":
      return [
        {
          href: "/perfil/citas",
          label: "Mis Citas",
          icon: <CalendarCheck size={18} />,
        },
        {
          href: "/perfil/pacientes",
          label: "Pacientes",
          icon: <PawPrint size={18} />,
        },
        {
          href: "/perfil/vacunas",
          label: "Vacunas",
          icon: <Syringe size={18} />,
        },
        {
          href: "/perfil/tratamientos",
          label: "Tratamientos",
          icon: <Stethoscope size={18} />,
        },
        {
          href: "/clinicas",
          label: "Clínicas Asociadas",
          icon: <Building2 size={18} />,
        },
      ];
    case "clinic":
      return [
        {
          href: "/perfil/veterinarios",
          label: "Veterinarios",
          icon: <Users2 size={18} />,
        },
        {
          href: "/perfil/citas",
          label: "Citas",
          icon: <CalendarCheck size={18} />,
        },
        {
          href: "/perfil/servicios",
          label: "Servicios",
          icon: <ClipboardList size={18} />,
        },
        {
          href: "/perfil/vacunas",
          label: "Vacunas",
          icon: <Syringe size={18} />,
        },
        {
          href: "/perfil/tratamientos",
          label: "Tratamientos",
          icon: <Stethoscope size={18} />,
        },
      ];
    case "store":
      return [
        {
          href: "/perfil/productos",
          label: "Productos",
          icon: <Package size={18} />,
        },
        {
          href: "/perfil/servicios",
          label: "Servicios",
          icon: <ClipboardList size={18} />,
        },
        {
          href: "/perfil/pedidos",
          label: "Pedidos",
          icon: <ShoppingBag size={18} />,
        },
        {
          href: "/perfil/clientes",
          label: "Clientes",
          icon: <UserSquare size={18} />,
        },
      ];
    default:
      return [];
  }
};

const NavBarPerfil = ({ category, session }: Props) => {
  const links = getLinksWithIcons(category);
  const { isDarkMode } = useTheme();
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mostrar solo 4 enlaces en el menú móvil footer
  // Mostrar máximo 4 enlaces en el footer móvil
  const footerLinksCount = Math.min(links.length, 4);
  const mobileFooterLinks = links.slice(0, footerLinksCount);

  // Si hay más de 4 enlaces o siempre queremos mostrar el perfil

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

      {/* Sidebar */}
      <aside
        className={`fixed h-full flex flex-col z-40 transition-all duration-300 ease-in-out ${
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
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center p-3 rounded-lg transition ${
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
        <div
          className={`p-2 border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="relative">
            <button
              onClick={() => expanded && setShowProfileInfo(!showProfileInfo)}
              className={`flex items-center justify-between w-full p-2 rounded-lg transition ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-full ${
                    expanded ? "mr-3" : "mx-auto"
                  } ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
                >
                  <User2
                    size={18}
                    className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                  />
                </div>
                {expanded && (
                  <div className="text-left overflow-hidden">
                    <p
                      className={`text-sm font-medium truncate ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {session.name || session.email}
                    </p>
                    <p
                      className={`text-xs truncate ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {session.category}
                    </p>
                  </div>
                )}
              </div>
              {expanded && (
                <div>
                  {showProfileInfo ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              )}
            </button>

            {expanded && showProfileInfo && (
              <div
                className={`mt-2 p-3 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                {session.planName && (
                  <div className="mb-3">
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Plan actual
                    </p>
                    <p
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {session.planName}
                    </p>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  {/* <ThemeToggle variant="icon-only" /> */}
                  <LogoutButton />
                </div>
              </div>
            )}

            {!expanded && (
              <div className="mt-2 flex flex-col items-center gap-2">
                {/* <ThemeToggle variant="icon-only" /> */}
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default NavBarPerfil;
