"use client";


import IdentificationSection from "./sections/IdentificationSection";
import CareSection from "./sections/CareSection";
import usePetForm from "./usePetForm";
import FormSidebar from "./components/FormSidebar";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { MedicalSection } from "./sections/MedicalSection";
import { BehaviorSection } from "./sections/BehaviorSection";
import { SectionNavigation } from "./components/SectionNavigation";

interface PetProps {
  ownerId: number;
}

const PetRegistrationForm = ({ ownerId }: PetProps) => {


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
          />
        );
      case "identification":
        return <IdentificationSection register={register} errors={errors} />;
      case "medical":
        return <MedicalSection register={register} errors={errors} />;
      case "behavior":
        return <BehaviorSection register={register} errors={errors} />;
      case "care":
        return <CareSection register={register} errors={errors} />;
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

export default PetRegistrationForm;
