import React from "react";
import { FormSectionProps } from "../types";
import { Activity } from "lucide-react";
import { FormTextarea } from "@/src/ui/FormTextarea";
import { FormSelect } from "@/src/ui/FormSelect";

export const BehaviorSection = ({ register, errors }: FormSectionProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <Activity className="text-purple-500" size={20} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Comportamiento
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <FormTextarea
                        label="Observaciones de comportamiento (Opcional)"
                        name="behaviorNotes"
                        register={register}
                        error={errors.behaviorNotes}
                        rows={4}
                        placeholder="Ej: Es tímido con extraños, le gusta jugar con pelotas, etc."
                    />
                </div>

                <FormSelect
                    label="Nivel de actividad"
                    name="activityLevel"
                    register={register}
                    error={errors.activityLevel}
                    options={[
                        { value: "", label: "Seleccionar", disabled: true },
                        { value: "low", label: "Baja" },
                        { value: "medium", label: "Mediana" },
                        { value: "high", label: "Alta" },
                    ]}
                />

                <FormSelect
                    label="¿Presenta agresividad?"
                    name="aggressive"
                    register={register}
                    error={errors.aggressive}
                    options={[
                        { value: "", label: "Seleccionar", disabled: true },
                        { value: "none", label: "Ninguna" },
                        { value: "mild", label: "Leve" },
                        { value: "moderate", label: "Moderada" },
                        { value: "severe", label: "Severa" },
                    ]}
                />
            </div>
        </div>
    );
};