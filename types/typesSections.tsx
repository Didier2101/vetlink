import {
  PawPrint,
  User,
  HeartPulse,
  Activity,
  Bone,
  Shield,
} from "lucide-react";
import type { ComponentType } from "react";

export interface SessionItem {
  id: string;
  title: string;
  icon: ComponentType<{ size?: number }>;
  color: string;
  iconSize?: number;
}
export const sections: SessionItem[] = [
  {
    id: "basic",
    title: "Datos Básicos",
    icon: PawPrint,
    color: "text-orange-500",
    iconSize: 18,
  },
  {
    id: "identification",
    title: "Identificación",
    icon: User,
    color: "text-blue-500",
    iconSize: 18,
  },
  {
    id: "medical",
    title: "Información Médica",
    icon: HeartPulse,
    color: "text-red-500",
    iconSize: 18,
  },
  {
    id: "behavior",
    title: "Comportamiento",
    icon: Activity,
    color: "text-purple-500",
    iconSize: 18,
  },
  {
    id: "care",
    title: "Cuidados",
    icon: Bone,
    color: "text-amber-500",
    iconSize: 18,
  },
  {
    id: "documents",
    title: "Documentos",
    icon: Shield,
    color: "text-emerald-500",
    iconSize: 18,
  },
];
