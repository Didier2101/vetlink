/**
 * Genera un código VetLink único en formato VL-XXXXXXX-D
 * @param id - ID numérico autoincremental de la mascota
 * @returns Código en formato VL-0000001-5
 */
export function generateVetLinkCode(id: number): string {
    // Rellena con ceros a la izquierda hasta 7 dígitos
    const paddedId = String(id).padStart(7, '0');

    // Calcula dígito verificador (checksum)
    const checksum = calculateChecksum(paddedId);

    return `VL-${paddedId}-${checksum}`;
}

/**
 * Calcula un dígito verificador simple para el ID
 * @param idString - ID en formato string (7 dígitos)
 * @returns Dígito verificador (0-9)
 */
function calculateChecksum(idString: string): number {
    let sum = 0;
    for (let i = 0; i < idString.length; i++) {
        sum += parseInt(idString[i], 10) * (i % 6 + 1); // Multiplica por posición +1
    }
    return sum % 10; // Módulo 10 para obtener un solo dígito
}