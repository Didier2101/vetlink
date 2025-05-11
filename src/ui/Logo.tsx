"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import { useTheme } from "@/components/principal/ThemeProvider";
import { usePathname, useRouter } from "next/navigation";

export const Logo = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    // Si ya estamos en la página de inicio, forzamos recarga
    if (pathname === "/") {
      e.preventDefault();
      router.refresh();
    }
    // En otros casos, el comportamiento normal de Link se mantiene
  };

  return (
    <div className="flex items-center">
      <Link
        href="/"
        onClick={handleClick}
        className={`font-bold text-xl flex items-center gap-1 ${theme.logoColor}`}
      >
        <PawPrint size={22} />
        <span>VetLink</span>
      </Link>
    </div>
  );
};
