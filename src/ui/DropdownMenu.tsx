// components/ui/DropdownMenu.tsx
"use client";

import { ReactNode, useState } from "react";

interface DropdownMenuProps {
    trigger: ReactNode;
    children: ReactNode;
    align?: "left" | "right";
    className?: string;
}

export const DropdownMenu = ({
    trigger,
    children,
    align = "right",
    className = "",
}: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative inline-block ${className}`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
            >
                {trigger}
            </div>

            {isOpen && (
                <>
                    {/* Overlay para cerrar al hacer clic fuera */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menú desplegable */}
                    <div
                        className={`absolute z-50 mt-2 w-96 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden ${align === "right" ? "right-0" : "left-0"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </>
            )}
        </div>
    );
};