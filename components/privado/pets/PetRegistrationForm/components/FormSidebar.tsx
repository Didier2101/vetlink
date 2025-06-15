import React from "react";
import { FormSidebarProps } from "../types";
import { PawPrint, Home, User, HeartPulse, Bone, Shield, Bell, FileText } from "lucide-react";

// Mapeo de iconos para cada sección
const sectionIcons: Record<string, React.ReactNode> = {
    "basic": <Home className="w-5 h-5" />,
    "owner": <User className="w-5 h-5" />,
    "medical": <HeartPulse className="w-5 h-5" />,
    "care": <Bone className="w-5 h-5" />,
    "vaccines": <Shield className="w-5 h-5" />,
    "reminders": <Bell className="w-5 h-5" />,
    "documents": <FileText className="w-5 h-5" />
};

const FormSidebar = ({
    sections,
    activeSection,
    setActiveSection,
}: FormSidebarProps) => {
    return (
        <>
            {/* Versión desktop (se muestra en pantallas grandes) */}
            <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-28 h-fit">
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
                            {sectionIcons[section.id] || <PawPrint className="w-5 h-5" />}
                            <span>{section.title}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Versión mobile (se muestra en pantallas pequeñas) */}
            <div className="lg:hidden fixed bottom-0  left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
                <nav className="flex justify-around items-center p-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeSection === section.id
                                ? "text-teal-600 dark:text-teal-400"
                                : "text-gray-600 dark:text-gray-400"
                                }`}
                            aria-label={section.title}
                        >
                            <div className="text-center">
                                {sectionIcons[section.id] || <PawPrint className="w-6 h-6 mx-auto" />}
                            </div>
                            <span className="text-xs mt-1">
                                {activeSection === section.id ? section.title : ""}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default FormSidebar;