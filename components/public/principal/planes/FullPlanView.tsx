"use client";
import React, { useState } from "react";
import { PlanType, } from "@/types/planType";
import { BillingType, calculatePrice, getPeriodLabel } from "@/src/utils/pricing";
import { Check, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { concert_one } from "@/src/lib/fonts";

interface FullPlanViewProps {
    plan: PlanType;
    onBack: () => void;
}

const FullPlanView = ({ plan, onBack }: FullPlanViewProps) => {

    const router = useRouter();
    const [billingType, setBillingType] = useState<BillingType>('MONTHLY');

    const handleRegisterClick = () => {
        router.push(`/register?plan.id=${plan.id}&role=${plan.role}`);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={onBack}
                    className="inline-flex mb-4 items-center text-sm font-medium text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-200 transition"
                    aria-label="Volver a todos los planes"
                >
                    ← Volver a todos los planes
                </button>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6">
                    <div>
                        <h2 className={`${concert_one.className} text-3xl font-bold mb-2`}>
                            {plan.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {plan.description}
                        </p>
                    </div>

                    <div className="mt-4 md:mt-0">
                        <div className="flex items-baseline">
                            <span className="text-4xl font-bold">
                                {plan.isFree
                                    ? "Gratis"
                                    : `$${calculatePrice(plan.price, billingType, plan.isFree).toLocaleString()}`}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 ml-2">
                                {getPeriodLabel(billingType, plan.isFree)}
                            </span>
                        </div>

                        {!plan.isFree && (
                            <select
                                value={billingType}
                                onChange={(e) => setBillingType(e.target.value as BillingType)}
                                className="mt-2 text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                            >
                                <option value="MONTHLY">Mensual</option>
                                <option value="YEARLY">Anual (20% descuento)</option>
                            </select>
                        )}
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Características principales</h3>
                    <ul className="space-y-3">
                        {plan.features?.slice(0, Math.ceil(plan.features.length / 2)).map((feature) => (
                            <li key={feature.id} className="flex items-start">
                                <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{feature.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Beneficios adicionales</h3>
                    <ul className="space-y-3">
                        {plan.features?.slice(Math.ceil(plan.features.length / 2)).map((feature) => (
                            <li key={feature.id} className="flex items-start">
                                <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{feature.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={handleRegisterClick}
                    className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                >
                    <UserPlus size={18} className="mr-2" />
                    Registrarse con este plan
                </button>
            </div>
        </div>
    );
};

export default FullPlanView;