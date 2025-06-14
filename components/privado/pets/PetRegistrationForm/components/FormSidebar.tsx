import React from "react";
import { FormSidebarProps } from "../types";
import { PawPrint } from "lucide-react";

const FormSidebar = ({
    sections,
    activeSection,
    setActiveSection,
}: FormSidebarProps) => {
    return (
        <div className="w-full lg:w-64 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 lg:sticky lg:top-28 h-fit">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <PawPrint className="text-teal-500" /> Secciones
            </h2>
            <nav className="space-y-2">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeSection === section.id
                            ? "bg-teal-50 dark:bg-gray-700 text-teal-600 dark:text-teal-400 font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            }`}
                    >
                        <span>{section.title}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default FormSidebar