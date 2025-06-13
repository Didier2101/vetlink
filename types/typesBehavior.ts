// Definición del tipo
export type AggressiveLevel = "none" | "mild" | "moderate" | "severe";
export type ActivityLevel = "low" | "medium" | "high";

// Objeto para mapear valores a etiquetas (opcional)
export const activityLevelOptions: Record<ActivityLevel, string> = {
    low: "Bajo",
    medium: "Medio",
    high: "Alto"
};

// types/pet.ts

export const aggressiveLevelOptions: Record<AggressiveLevel, string> = {
    none: "No",
    mild: "Leve (solo en situaciones específicas)",
    moderate: "Moderada (necesita manejo)",
    severe: "Severa (requiere precaución)"
};