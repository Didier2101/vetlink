import { PetFormData } from "@/schemas/pets/pet";
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface FormSelectProps {
    label: string;
    name: keyof PetFormData;
    register: UseFormRegister<PetFormData>;
    error?: FieldError;
    options: SelectOption[];
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FormSelect = ({
    label,
    name,
    register,
    error,
    options,
    required = false,
    disabled = false,
    placeholder,
    onChange
}: FormSelectProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                {...register(name)}
                disabled={disabled}
                onChange={onChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    } ${disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""}`}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option
                        key={`${option.value}-${option.label}`}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
        </div>
    );
};