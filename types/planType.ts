import { PlanRole } from "@prisma/client";

export interface PlanType {
    id: number;
    title: string;
    description: string;
    price: number;
    period: string; // e.g., "mensual"
    trialPeriodDays: number | null; // e.g., 14 for 14 days
    isActive: boolean;
    isFree: boolean;
    maxPets: number;
    createdAt: Date;
    role: PlanRole;
    features?: FeatureType[]; // Hacer opcional si no siempre está presente
}

export interface FeatureType {
    id: number;
    name: string;
    planId: number;
}
