import { PetFormData } from "@/schemas/pets/pet";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FormCheckboxProps {
    label: string;
    name: keyof PetFormData;
    register: UseFormRegister<PetFormData>;
}

export const FormCheckbox = ({ label, name, register }: FormCheckboxProps) => {
    return (
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <input
                type="checkbox"
                {...register(name)}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-teal-500"
            />
            <span>{label}</span>
        </label>
    );
};