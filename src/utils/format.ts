// utils/format.ts

/**
 * Capitaliza una cadena: primera letra en mayúscula, resto en minúscula.
 * Ej: "mARIO" -> "Mario"
 */
export function capitalize(str?: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
