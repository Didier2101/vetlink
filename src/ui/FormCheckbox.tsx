// components/ui/FormCheckbox.tsx
import React from "react";
import { BaseFormInputProps } from "@/types/forms";
import { FieldValues } from "react-hook-form";
import ErrorInput from "./ErrorInput";

interface FormCheckboxProps<T extends FieldValues> extends BaseFormInputProps<T> {
    label: string;
    children?: React.ReactNode;
}

export function FormCheckbox<T extends FieldValues>({
    label,
    name,
    register,
    error,
    required = false,
    disabled = false,
    className = "",
    children,
}: FormCheckboxProps<T>) {
    return (
        <div className={className}>
            <div className="flex items-start">
                <input
                    type="checkbox"
                    {...register(name)}
                    disabled={disabled}
                    className={`
            w-4 h-4 mt-1 rounded border-gray-300 dark:border-gray-600 
            dark:bg-gray-700 focus:ring-2 focus:ring-teal-500
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {children || label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>

            </div>

            {error && (
                <ErrorInput error={error} />
            )}
        </div>
    );
}