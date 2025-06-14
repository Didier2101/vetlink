import { PetFormData } from "@/schemas/pets/pet";
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface FormInputProps {
    label: string;
    name: keyof PetFormData;
    register: UseFormRegister<PetFormData>;
    error?: FieldError;
    placeholder?: string;
    type?: string;
    required?: boolean;
}

export const FormInput = ({
    label,
    name,
    register,
    error,
    placeholder,
    type = "text",
    required = false,
}: FormInputProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                {...register(name)}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    }`}
                placeholder={placeholder}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
        </div>
    );
};