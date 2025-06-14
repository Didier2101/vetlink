import React from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { PetFormData } from "@/schemas/pets/pet";

interface SectionNavigationProps {
    activeSection: string;
    sections: Array<{ id: string; title: string }>;
    sectionFields: Record<string, (keyof PetFormData)[]>;
    trigger: (name?: (keyof PetFormData)[] | keyof PetFormData) => Promise<boolean>;
    setActiveSection: (section: string) => void;
    isSubmitting: boolean;
    handleSubmit: UseFormHandleSubmit<PetFormData>; // Tipo corregido aquí
    onSubmit: (data: PetFormData) => Promise<void>;
}

export const SectionNavigation = ({
    activeSection,
    sections,
    sectionFields,
    trigger,
    setActiveSection,
    isSubmitting,
    handleSubmit,
    onSubmit,
}: SectionNavigationProps) => {
    return (
        <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
            {activeSection !== sections[0].id && (
                <button
                    type="button"
                    onClick={() => {
                        const currentIndex = sections.findIndex(
                            (s) => s.id === activeSection
                        );
                        setActiveSection(sections[currentIndex - 1].id);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                    <ChevronLeft size={18} />
                    Anterior
                </button>
            )}

            {activeSection === sections[0].id && <div></div>}

            {activeSection !== sections[sections.length - 1].id ? (
                <button
                    type="button"
                    onClick={async () => {
                        const currentFields = sectionFields[activeSection];
                        const valid = await trigger(currentFields);
                        if (!valid) return;
                        const currentIndex = sections.findIndex(
                            (s) => s.id === activeSection
                        );
                        setActiveSection(sections[currentIndex + 1].id);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors ml-auto"
                >
                    Siguiente
                    <ChevronRight size={18} />
                </button>
            ) : (
                <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)} // Aquí está la corrección
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-70 ml-auto"
                >
                    {isSubmitting ? "Guardando..." : "Guardar mascota"}
                    <ArrowRight size={18} />
                </button>
            )}
        </div>
    );
};