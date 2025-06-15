// components/ui/FormSelect.tsx
import React from "react";
import { ChevronDown, } from "lucide-react";
import { BaseFormInputProps } from "@/types/forms";
import { FieldValues } from "react-hook-form";
import ErrorInput from "./ErrorInput";

// components/ui/FormSelect.tsx
interface Option {
    value: string;
    label: string;
    disabled?: boolean; // <- Añade esta línea
}

interface FormSelectProps<T extends FieldValues> extends BaseFormInputProps<T> {
    options: Option[]; // <- Usa el nuevo tipo Option
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function FormSelect<T extends FieldValues>({
    label,
    name,
    register,
    error,
    options,
    placeholder = "Selecciona una opción",
    required = false,
    disabled = false,
    className = "",

}: FormSelectProps<T>) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative">
                <select
                    {...register(name)}
                    disabled={disabled}
                    className={`
            w-full pl-4 pr-10 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 
            focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors
            appearance-none cursor-pointer
            ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
            </div>

            {error && (
                <ErrorInput error={error} />
            )}
        </div>
    );
}