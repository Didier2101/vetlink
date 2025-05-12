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
  User,
} from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export const getLinksWithIcons = (category: string): NavLink[] => {
  switch (category) {
    case "owner":
      return [
        {
          href: "/perfiles/owner/perfil",
          label: "Perfil",
          icon: <User size={18} />,
        },
        {
          href: "/perfiles/owner/mascotas",
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
