"use client";
import React, { useState } from "react";
import { PlanType } from "@/types/planType";
import { concert_one } from "@/src/lib/fonts";
import FullPlanView from "./FullPlanView";
import CompactPlanCard from "./CompactPlanCard";
import {
    PawPrint,
    Stethoscope,
    Building2,
    Store,
    Dog
} from "lucide-react";

interface PricingTabsProps {
    plans: PlanType[];
}

// Mapeo de roles con iconos
const roleCategories = [
    { id: 'OWNER', name: 'Dueños', icon: PawPrint },
    { id: 'veterinarian', name: 'Veterinarios', icon: Stethoscope },
    { id: 'walker', name: 'Paseadores', icon: Dog },
    { id: 'CLINIC', name: 'Clínicas', icon: Building2 },
    { id: 'STORE', name: 'Tiendas', icon: Store },
];

const PricingTabs = ({ plans }: PricingTabsProps) => {
    const [activeTab, setActiveTab] = useState(roleCategories[0].id);
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

    // Filtra los planes que coincidan con el rol del tab activo
    const filteredPlans = plans.filter(plan => {
        const planRole = plan.role?.toLowerCase();
        const activeRole = activeTab.toLowerCase();
        return planRole === activeRole;
    });

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                {/* Título (solo visible cuando no hay plan seleccionado) */}
                {!selectedPlan && (
                    <>
                        <h2 className={`${concert_one.className} text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent`}>
                            Planes para todos
                        </h2>
                        <p className="text-center mb-12 text-gray-600 dark:text-gray-400">
                            Elige el plan perfecto para tu perfil
                        </p>
                    </>
                )}

                {/* Tabs (solo visible cuando no hay plan seleccionado) */}
                {!selectedPlan && (
                    <div className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide">
                        <div className="flex space-x-2 mx-auto">
                            {roleCategories.map((category) => {
                                const Icon = category.icon;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveTab(category.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === category.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <Icon size={16} />
                                        {category.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Contenido principal */}
                {selectedPlan ? (
                    <FullPlanView
                        plan={selectedPlan}
                        onBack={() => setSelectedPlan(null)}
                    />
                ) : (
                    <>
                        {/* Mensaje si no hay planes para esta categoría */}
                        {filteredPlans.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No hay planes disponibles para esta categoría
                            </div>
                        )}

                        {/* Grid de planes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredPlans.map((plan) => (
                                <CompactPlanCard
                                    key={plan.id}
                                    plan={plan}
                                    onViewDetails={() => setSelectedPlan(plan)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default PricingTabs;