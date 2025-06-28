"use client";

import { UserCircle, User, AlertCircle, Gift, Calendar, Crown, X } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/src/ui/LogoutButton";
import { useEffect, useState } from "react";
import { PrivateLayoutUserData } from "@/types/UserData";

export const MobileMenu = ({
    user,
    onClose
}: {
    user: PrivateLayoutUserData;
    onClose: () => void
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const getPlanIcon = () => {
        if (user.plan.isFree) return <Gift className="w-6 h-6 text-green-500" />;
        if (user.plan.isTrial) return <Calendar className="w-6 h-6 text-blue-500" />;
        return <Crown className="w-6 h-6 text-purple-500" />;
    };

    const getPriceText = () => {
        if (user.plan.isFree) return "Gratis";
        if (user.plan.isTrial) return "Prueba gratis";
        return `$${user.plan.price}/${user.plan.period.toLowerCase()}`;
    };

    const getPlanStatus = () => {
        if (user.plan.isTrial) {
            const daysRemaining = Math.ceil(
                (new Date(user.plan.trialEndsAt!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            );
            return `Prueba (${daysRemaining} días restantes)`;
        } else if (user.plan.isFree) {
            return "Plan Gratis";
        } else {
            return "Plan Activo";
        }
    };

    const getStatusColor = () => {
        if (user.plan.isTrial) return "text-blue-600 dark:text-blue-400";
        if (user.plan.isFree) return "text-green-600 dark:text-green-400";
        return "text-purple-600 dark:text-purple-400";
    };

    return (
        <div className="fixed inset-0 z-40 lg:hidden">
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={handleClose}
            />

            <div
                className={`absolute bottom-0 left-0 right-0 h-[85vh] max-h-[800px] bg-white dark:bg-gray-900 rounded-t-2xl shadow-xl overflow-y-auto transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 pt-3 px-4">
                    <div className="flex justify-center mb-2">
                        <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium">Menú</h3>
                        <button
                            onClick={handleClose}
                            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <UserCircle className="w-12 h-12 text-gray-700 dark:text-gray-300" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {user.ownerProfile?.name || 'Usuario'}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {user.email}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                    {user.role}
                                </p>
                            </div>
                        </div>

                        {!user.isProfileComplete && (
                            <div className="flex items-center gap-2 p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-md">
                                <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-xs text-yellow-700 dark:text-yellow-300">
                                    Completa tu perfil
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                            {getPlanIcon()}
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                    {user.plan.title}
                                </h4>
                                <p className={`text-sm ${getStatusColor()}`}>
                                    {getPlanStatus()}
                                </p>
                            </div>
                            <p className="font-bold text-gray-900 dark:text-white">
                                {getPriceText()}
                            </p>
                        </div>

                        {user.plan.features.length > 0 && (
                            <div className="mt-3">
                                <p className="text-sm font-medium mb-2">Incluye:</p>
                                <div className="flex flex-wrap gap-2">
                                    {user.plan.features.map(feature => (
                                        <span
                                            key={feature.id}
                                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
                                        >
                                            {feature.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Link
                            href="/profile"
                            onClick={handleClose}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <User className="w-5 h-5" />
                            <span>Mi perfil</span>
                        </Link>

                        <LogoutButton />
                    </div>
                </div>
            </div>
        </div>
    );
};