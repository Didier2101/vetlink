// src/components/navbar/navLinksData.ts
import { Home, Building, Users, ShoppingBag, Tag } from "lucide-react";
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
    name: "Clínicas",
    href: "/clinicas",
    icon: Building,
    iconSize: 18
  },
  {
    name: "Veterinarios",
    href: "/veterinarios",
    icon: Users,
    iconSize: 18
  },
  {
    name: "Tiendas",
    href: "/tiendas",
    icon: ShoppingBag,
    iconSize: 18
  },
  {
    name: "Placa",
    href: "/placa",
    icon: Tag,
    iconSize: 18
  },
];