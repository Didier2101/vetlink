// components/ui/FormButton.tsx
import React from "react";
import { FormButtonProps } from "@/types/forms";

export const FormButton: React.FC<FormButtonProps> = ({
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    icon: Icon,
    iconPosition = "left",
    className = "",
    children,
    onClick,
}) => {
    const baseClasses = "font-medium rounded-lg transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variantClasses = {
        primary: "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white focus:ring-teal-500",
        secondary: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 focus:ring-gray-500",
        danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
        success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
    };

    const sizeClasses = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-6 py-4 text-lg"
    };

    const finalClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} 
    ${className}
  `;

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={finalClasses}
        >
            {loading ? (
                <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Cargando...
                </>
            ) : (
                <>
                    {Icon && iconPosition === "left" && <Icon size={18} className="mr-2" />}
                    {children}
                    {Icon && iconPosition === "right" && <Icon size={18} className="ml-2" />}
                </>
            )}
        </button>
    );
};