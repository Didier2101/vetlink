export interface PlanFeature {
    id: number;
    name: string;
}

export interface UserPlan {
    id: number;
    title: string;
    description: string;
    price: number;
    period: string;
    isFree: boolean;
    maxPets: number;
    isActive: boolean;
    features: PlanFeature[];
    isTrial: boolean;
    trialStartedAt: Date | null;
    trialEndsAt: Date | null;
    planStartedAt: Date | null;
    planExpiresAt: Date | null;
}

export interface OwnerProfile {
    id: number;
    name: string;
    lastName: string;
    phone: string;
    secondaryPhone: string | null;
    city: string;
    neighborhood: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}

export interface PrivateLayoutUserData {
    id: number;
    email: string;
    isProfileComplete: boolean | null;
    role: 'owner' | 'unknown' | string;
    plan: UserPlan;
    ownerProfile: OwnerProfile | null;
}