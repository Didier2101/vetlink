// utils/generatePetId.ts
export const generatePetId = (existingIds: string[] = []): string => {
    const prefix = "VT";
    let id: string;
    let attempts = 0;
    const maxAttempts = 100;

    do {
        // Generar 6 dígitos aleatorios
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        id = `${prefix}${randomNum}`;
        attempts++;

        // Prevención de bucle infinito
        if (attempts >= maxAttempts) {
            throw new Error("No se pudo generar un ID único después de múltiples intentos");
        }
    } while (existingIds.includes(id)); // Verificar unicidad

    return id;
};


export const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};

export const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};