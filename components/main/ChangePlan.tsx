"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { CreditCard, Check, X, Sparkles, Zap, Crown, Star } from "lucide-react";

interface Plan {
    id: number;
    title: string;
    description: string;
    price: number;
    period: string;
    isFree: boolean;
    role: string;
    features: string[];
}

interface ChangePlanProps {
    currentPlan: Plan;
    availablePlans: Plan[];
    onPlanChange: (newPlanId: number) => Promise<void>;
}

export function ChangePlan({ currentPlan, availablePlans, onPlanChange }: ChangePlanProps) {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getPlanIcon = (planTitle: string) => {
        if (planTitle.toLowerCase().includes('premium') || planTitle.toLowerCase().includes('pro')) {
            return <Crown size={20} className="text-yellow-500" />;
        }
        if (planTitle.toLowerCase().includes('basic') || planTitle.toLowerCase().includes('starter')) {
            return <Sparkles size={20} className="text-blue-500" />;
        }
        return <Star size={20} className="text-emerald-500" />;
    };

    const getPlanGradient = (planTitle: string, isSelected: boolean, isCurrent: boolean) => {
        if (isCurrent) {
            return "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-300 dark:border-emerald-700";
        }
        if (isSelected) {
            return "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-300 dark:border-blue-700";
        }
        return "bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white dark:hover:from-gray-800 dark:hover:to-gray-900";
    };

    const handlePlanChange = async () => {
        if (!selectedPlan || selectedPlan.id === currentPlan.id) return;

        const result = await Swal.fire({
            title: `¿Cambiar a ${selectedPlan.title}?`,
            text: "¿Estás seguro de que deseas actualizar tu plan?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, cambiar",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: 'rounded-2xl',
                confirmButton: 'rounded-xl',
                cancelButton: 'rounded-xl'
            }
        });

        if (result.isConfirmed) {
            try {
                setIsLoading(true);
                await onPlanChange(selectedPlan.id);
                Swal.fire({
                    title: "¡Éxito!",
                    text: `Plan cambiado a ${selectedPlan.title}`,
                    icon: "success",
                    customClass: {
                        popup: 'rounded-2xl',
                        confirmButton: 'rounded-xl'
                    }
                });
                setIsOpen(false);
            } catch (error) {
                console.error("Error al cambiar el plan:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo cambiar el plan. Intenta de nuevo.",
                    icon: "error",
                    customClass: {
                        popup: 'rounded-2xl',
                        confirmButton: 'rounded-xl'
                    }
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            {/* Mostrar plan actual */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-800/50 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                            {getPlanIcon(currentPlan.title)}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {currentPlan.title}
                            </h3>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400">Plan actual</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {currentPlan.isFree ? "Gratis" : `$${currentPlan.price}`}
                        </div>
                        {!currentPlan.isFree && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                / {currentPlan.period}
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">{currentPlan.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {currentPlan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <Check size={14} className="text-emerald-500 flex-shrink-0" />
                            {feature}
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:scale-[1.02] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <CreditCard size={18} className="relative" />
                    <span className="relative">Cambiar plan</span>
                </button>
            </div>

            {/* Modal de cambio de plan */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

                    <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
                                    <CreditCard size={24} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                                    Cambiar tu plan actual
                                </h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Selecciona un nuevo plan que se adapte mejor a tus necesidades.
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                {availablePlans.map((plan) => (
                                    <div
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border-2 ${getPlanGradient(plan.title, selectedPlan?.id === plan.id, currentPlan.id === plan.id)}`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                                                    {getPlanIcon(plan.title)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {plan.title}
                                                    </h3>
                                                    {currentPlan.id === plan.id && (
                                                        <span className="inline-flex items-center gap-1 text-xs bg-emerald-500 text-white px-2 py-1 rounded-full">
                                                            <Check size={12} />
                                                            Actual
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {selectedPlan?.id === plan.id && (
                                                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                                    <Check size={14} className="text-white" />
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            {plan.description}
                                        </p>

                                        <div className="mb-4">
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {plan.isFree ? "Gratis" : `$${plan.price}`}
                                            </span>
                                            {!plan.isFree && (
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    / {plan.period}
                                                </span>
                                            )}
                                        </div>

                                        <ul className="space-y-2 mb-4">
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                    <Check size={14} className="text-emerald-500 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        {currentPlan.id === plan.id && (
                                            <div className="w-full py-2 px-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-center rounded-xl font-medium">
                                                Plan actual
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Botones de acción */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium rounded-xl transition-colors duration-200"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={handlePlanChange}
                                    disabled={!selectedPlan || selectedPlan.id === currentPlan.id || isLoading}
                                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${selectedPlan && selectedPlan.id !== currentPlan.id && !isLoading
                                            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Cambiando...
                                        </>
                                    ) : (
                                        <>
                                            <Zap size={16} />
                                            Confirmar cambio
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Botón de cerrar */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            <X size={20} className="text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}