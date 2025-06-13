import { differenceInDays, differenceInMonths, differenceInYears, format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd 'de' MMM yyyy, HH:mm", { locale: es });
};


export const calculatePetAge = (birthDate: Date | string): string => {
    const today = new Date();
    const birth = new Date(birthDate);

    // Verificar fecha futura
    if (today < birth) {
        return 'Fecha inválida';
    }

    // Calcular diferencias
    const days = differenceInDays(today, birth);
    const months = differenceInMonths(today, birth);
    const years = differenceInYears(today, birth);

    // Formateo localizado

    // Menos de 1 mes (mostrar días)
    if (months === 0) {
        return `${days} ${days === 1 ? 'día' : 'días'}`;
    }

    // Menos de 1 año (mostrar meses y días)
    if (years === 0) {
        const remainingMonths = months % 12;
        const remainingDays = differenceInDays(today, new Date(birth.setMonth(birth.getMonth() + months)));

        const parts = [];
        parts.push(`${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`);

        if (remainingDays > 0) {
            parts.push(`${remainingDays} ${remainingDays === 1 ? 'día' : 'días'}`);
        }

        return parts.join(' y ');
    }

    // Más de 1 año (mostrar años y meses)
    const remainingMonths = months % 12;

    const parts = [];
    parts.push(`${years} ${years === 1 ? 'año' : 'años'}`);

    if (remainingMonths > 0) {
        parts.push(`${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`);
    }

    return parts.join(' y ');
};