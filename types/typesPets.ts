// types/typesPets.ts
export interface Pets {
    id: number;
    name: string;
    species: string;
    breed: string;
    sex: string;
    birthDate: Date;
    color: string;
    photo: string | null;
    microchipNumber: string | null;
    tattooCode: string | null;
    passportNumber: string | null;
    codeVetlink: string;
    sterilized: boolean;
    allergies?: string | null;
    chronicDiseases: string | null;
    disabilities: string | null;
    bloodType?: string | null;
    favoriteFood: string | null;
    behaviorNotes: string | null;
    feedingSchedule: string | null;
    diet: string | null;
    activityLevel: string;
    aggressive: string;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;

    // Relaciones (opcionales para consultas)
    vaccines: Vaccine[] | null;
    documents?: Document[];
    attentions?: Attention[];
    medications?: Medication[];
    dewormings?: Deworming[];
}

export interface Vet {
    id: number;
    name: string;
    lastName: string;
    licenseNumber: string;
    phone: string;
    specialty: string;
    clinicName: string;
    clinicAddress: string;
    city: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId?: number | null;
}

export interface Vaccine {
    id: number;
    petId: number;
    vetId: number | null;
    type: string;
    category: 'LEGAL' | 'RECOMMENDED';
    batchNumber: string;
    laboratory: string;
    applicationDate: Date;
    nextDate: Date | null;
    vet: Vet | null;
    documentId: number | null
}

export interface Document {
    id: number;
    petId: number;
    vetId?: number | null;
    type: 'VACCINE_CERTIFICATE' | 'OWNERSHIP_PROOF' | 'DIAGNOSTIC_IMAGE' | 'PRESCRIPTION';
    title: string;
    fileUrl: string;
    issueDate: Date;
    expirationDate?: Date | null;
    vet?: Vet | null;
}

export interface Attention {
    id: number;
    petId: number;
    vetId: number;
    clinicId?: number | null;
    date: Date;
    reason: string;
    notes?: string | null;
    vet?: Vet | null;
    clinic?: Clinic | null;
}

export interface Clinic {
    id: number;
    name: string;
    address: string;
    phone: string;
}

export interface Medication {
    id: number;
    petId: number;
    name: string;
    dosage: string;
    frequency: string;
    startDate: Date;
    endDate?: Date | null;
    prescribedBy?: string | null;
    notes?: string | null;
}

export interface Deworming {
    id: number;
    petId: number;
    product: string;
    date: Date;
    nextDate?: Date | null;
    notes?: string | null;
}

// Tipo para el Dashboard
export interface DashboardData {
    pets: Pets[];
    vets: Vet[];
}