import React from "react";
import { FormSectionProps } from "../types";
import { PawPrint } from "lucide-react";
import { PetPhotoUploader } from "../components/PetPhotoUploader";
import { FormInput } from "../components/FormInput";
import { FormSelect } from "../components/FormSelect";

interface BasicInfoSectionProps extends FormSectionProps {
  selectedImageUrl?: string | null;
  isUploading?: boolean;
  uploadError?: string | null;
  selectedFile?: File | null;
  handlePhotoChange: (file: File) => Promise<void>;
  handleRemovePhoto: () => Promise<void>;
}

export const BasicInfoSection = ({
  register,
  errors,
  selectedImageUrl,
  isUploading,
  uploadError,
  selectedFile,
  handlePhotoChange,
  handleRemovePhoto
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <PawPrint className="text-orange-500" size={20} />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Datos Básicos
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <PetPhotoUploader
          label="📸 Foto de perfil"
          selectedImageUrl={selectedImageUrl}
          isUploading={isUploading}
          uploadError={uploadError}
          selectedFile={selectedFile}
          handlePhotoChange={handlePhotoChange}
          handleRemovePhoto={handleRemovePhoto}
          error={errors.photo}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Nombre de la mascota"
          name="name"
          register={register}
          error={errors.name}
          placeholder="Ej: Max"
          required
        />

        <FormSelect
          label="Especie"
          name="species"
          register={register}
          error={errors.species}
          options={[
            { value: "", label: "Seleccionar" },
            { value: "dog", label: "Perro" },
            { value: "cat", label: "Gato" },
          ]}
          required
        />

        <FormInput
          label="Raza"
          name="breed"
          register={register}
          error={errors.breed}
          placeholder="Ej: Labrador, Siames, etc."
          required
        />

        <FormSelect
          label="Sexo"
          name="sex"
          register={register}
          error={errors.sex}
          options={[
            { value: "", label: "Seleccionar" },
            { value: "male", label: "Macho" },
            { value: "female", label: "Hembra" },
          ]}
          required
        />

        <FormInput
          label="Fecha de nacimiento (aproximada)"
          name="birthDate"
          register={register}
          error={errors.birthDate}
          type="date"
        />

        <FormInput
          label="Color principal"
          name="color"
          register={register}
          error={errors.color}
          placeholder="Ej: Negro, Blanco, etc."
          required
        />
      </div>
    </div>
  );
};