import { UseFormRegister, FieldErrors, UseFormTrigger } from "react-hook-form";
import { PetFormData } from "@/schemas/pets/pet";

export interface PetRegistrationSections {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
}

export interface SectionNavigationProps {
    activeSection: string;
    sections: PetRegistrationSections[];
    sectionFields: Record<string, (keyof PetFormData)[]>;
    trigger: UseFormTrigger<PetFormData>;
    setActiveSection: (section: string) => void;
    isSubmitting: boolean;
    handleSubmit: () => void;
    onSubmit: (data: PetFormData) => Promise<void>;
}

export interface FormSidebarProps {
    sections: PetRegistrationSections[];
    activeSection: string;
    setActiveSection: (section: string) => void;
}

export interface FormSectionProps {
    register: UseFormRegister<PetFormData>;
    errors: FieldErrors<PetFormData>;
}