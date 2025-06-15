import React from "react";
import { FormSectionProps } from "../types";
import { HeartPulse } from "lucide-react";
import { FormTextarea } from "@/src/ui/FormTextarea";
import { FormInput } from "@/src/ui/FormInput";
import { FormCheckbox } from "@/src/ui/FormCheckbox";


export const MedicalSection = ({ register, errors }: FormSectionProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <HeartPulse className="text-red-500" size={20} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Información Médica
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <FormCheckbox
                        label="¿Está esterilizado / castrado?"
                        name="sterilized"
                        register={register}
                        error={errors.sterilized}
                    />
                </div>

                <div className="md:col-span-2">
                    <FormTextarea
                        label="Alergias conocidas (Opcional)"
                        name="allergies"
                        register={register}
                        error={errors.allergies}
                        rows={3}
                        placeholder="Ej: Alergia a ciertos medicamentos, alimentos, etc."
                    />
                </div>

                <div className="md:col-span-2">
                    <FormTextarea
                        label="Enfermedades crónicas (Opcional)"
                        name="chronicDiseases"
                        register={register}
                        error={errors.chronicDiseases}
                        rows={3}
                        placeholder="Ej: Diabetes, artritis, etc."
                    />
                </div>

                <div className="md:col-span-2">
                    <FormTextarea
                        label="Discapacidades o condiciones especiales (Opcional)"
                        name="disabilities"
                        register={register}
                        error={errors.disabilities}
                        rows={3}
                        placeholder="Ej: Ceguera, sordera, amputación, etc."
                    />
                </div>

                <FormInput
                    label="Tipo de sangre (si se conoce) (Opcional)"
                    name="bloodType"
                    register={register}
                    error={errors.bloodType}
                    placeholder="Ej: DEA 1.1 positivo"
                />
            </div>
        </div>
    );
};