"use client";

import Link from "next/link";
import FormSidebar from "../privado/pets/PetRegistrationForm/components/FormSidebar";
import { SectionNavigation } from "../privado/pets/PetRegistrationForm/components/SectionNavigation";
import { BasicInfoSection } from "../privado/pets/PetRegistrationForm/sections/BasicInfoSection";
import { BehaviorSection } from "../privado/pets/PetRegistrationForm/sections/BehaviorSection";
import CareSection from "../privado/pets/PetRegistrationForm/sections/CareSection";
import IdentificationSection from "../privado/pets/PetRegistrationForm/sections/IdentificationSection";
import { MedicalSection } from "../privado/pets/PetRegistrationForm/sections/MedicalSection";
import usePetForm from "../privado/pets/PetRegistrationForm/usePetForm";


interface PetProps {
    ownerId: number;
}

export const PetForm = ({ ownerId }: PetProps) => {
    const {
        activeSection,
        setActiveSection,
        sections,
        register,
        errors,
        isSubmitting,
        handleSubmit,
        onSubmit,
        trigger,
        sectionFields,
        selectedImageUrl,
        isUploading,
        uploadError,
        selectedFile,
        handlePhotoChange,
        handleRemovePhoto,
        setValue,  // Añade estas propiedades
        watch,
    } = usePetForm(ownerId);

    const renderSection = () => {
        switch (activeSection) {
            case "basic":
                return (
                    <BasicInfoSection
                        register={register}
                        errors={errors}
                        selectedImageUrl={selectedImageUrl}
                        isUploading={isUploading}
                        uploadError={uploadError}
                        selectedFile={selectedFile}
                        handlePhotoChange={handlePhotoChange}
                        handleRemovePhoto={handleRemovePhoto}
                        setValue={setValue}
                        watch={watch}
                    />
                );
            case "identification":
                return <IdentificationSection register={register} errors={errors} setValue={setValue} watch={watch} />;
            case "medical":
                return <MedicalSection register={register} errors={errors} setValue={setValue} watch={watch} />;
            case "behavior":
                return <BehaviorSection register={register} errors={errors} setValue={setValue} watch={watch} />;
            case "care":
                return <CareSection register={register} errors={errors} setValue={setValue} watch={watch} />;
            default:
                return null;
        }
    };

    return (
        <div className="mt-10 md:mt-0 flex flex-col lg:flex-row gap-8 pb-20 md:pb-0">
            {/* Sidebar a la izquierda */}
            <FormSidebar
                sections={sections}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            {/* Contenido principal */}
            <div className="flex-1 h-[calc(100vh-130px)] overflow-y-auto bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">

                {/* Link arriba alineado correctamente */}
                <div className="mb-6">
                    <Link
                        href="/owner/dashboard"
                        className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-200 transition"
                    >
                        ← Volver al dashboard
                    </Link>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {renderSection()}
                </form>

                {/* Navegación por secciones */}
                <SectionNavigation
                    activeSection={activeSection}
                    sections={sections}
                    sectionFields={sectionFields}
                    trigger={trigger}
                    setActiveSection={setActiveSection}
                    isSubmitting={isSubmitting}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    );
};