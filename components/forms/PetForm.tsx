"use client";

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
        <div className="flex flex-col lg:flex-row gap-8">
            <FormSidebar
                sections={sections}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <div className="h-[calc(100vh-130px)] overflow-y-auto flex-1 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {renderSection()}
                </form>

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