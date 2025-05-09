import { Category } from "@prisma/client";

export interface PlanType {
    id: number;
    title: string;
    description: string;
    price: number;
    period: string; // e.g., "/mes"
    category: Category;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    features: FeatureType[];
}

export interface FeatureType {
    id: number;
    name: string;
    planId: number;
}
