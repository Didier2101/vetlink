"use client";
import React from "react";
import { PlanType } from "@/types/planType";
import { ShoppingCart } from "lucide-react";
import { concert_one } from "@/src/lib/fonts";

interface CompactPlanCardProps {
    plan: PlanType;
    onViewDetails: () => void;
}

const CompactPlanCard = ({ plan, onViewDetails }: CompactPlanCardProps) => {
    return (
        <div className="flex flex-col p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow duration-300 h-full">
            {!plan.isFree && (
                <div className="text-xs font-bold uppercase text-green-600 dark:text-green-400 mb-2">
                    {plan.isFree ? 'Gratis' : 'Premium'}
                </div>
            )}

            <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <ShoppingCart size={18} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className={`${concert_one.className} text-xl font-bold`}>
                    {plan.title}
                </h3>
            </div>

            <div className="mb-4">
                <span className="text-2xl font-bold">
                    {plan.isFree ? 'Gratis' : `$${plan.price.toLocaleString()}`}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                    /mes
                </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {plan.description}
            </p>

            <div className="mt-auto">
                <button
                    onClick={onViewDetails}
                    className="w-full py-2 px-4 bg-transparent border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm font-medium"
                >
                    Ver plan completo
                </button>
            </div>
        </div>
    );
};

export default CompactPlanCard;