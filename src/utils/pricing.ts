// src/utils/pricing.ts

export type BillingType = 'MONTHLY' | 'YEARLY';

/**
 * Calcula el precio según el tipo de facturación.
 * Si es anual, multiplica por 12. Puedes aplicar descuento si lo deseas.
 */
export const calculatePrice = (price: number, billingType: BillingType, isFree: boolean): number => {
    if (isFree) return 0;

    // Opcional: aplicar descuento del 10% en anual
    const discountRate = 0.9;

    return billingType === 'YEARLY'
        ? Math.round(price * 12 * discountRate)
        : price;
};

/**
 * Devuelve el texto amigable del periodo
 */
export const getPeriodLabel = (billingType: BillingType, isFree: boolean): string => {
    if (isFree) return 'Gratis';
    return billingType === 'YEARLY' ? 'Anual' : 'Mensual';
};
