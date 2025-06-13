// src/components/navbar/navLinksData.ts
import { Home, Tag, PawPrint } from "lucide-react";
import { ComponentType } from "react";

export interface NavLinkItem {
  name: string;
  href: string;
  icon: ComponentType<{ size?: number }>;
  iconSize?: number;
}

export const navLinks: NavLinkItem[] = [
  {
    name: "Inicio",
    href: "/",
    icon: Home,
    iconSize: 18
  },

  {
    name: "Placa",
    href: "/placa",
    icon: Tag,
    iconSize: 18
  },
  {
    name: "Encontraste una mascota?",
    href: "/found_pet",
    icon: PawPrint,
    iconSize: 18
  },
];