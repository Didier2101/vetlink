"use client";

import { UserCircle, User, Gift, Calendar, Crown, } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/src/ui/LogoutButton";
import { DropdownMenu } from "@/src/ui/DropdownMenu";
import { PrivateLayoutUserData } from "@/types/UserData";
import { capitalize } from "@/src/utils/format";

export const UserDropdown = ({ user }: { user: PrivateLayoutUserData }) => {
    const getPlanIcon = () => {
        if (user.plan.isFree) {
            return <Gift className="w-6 h-6 text-green-500" />;
        } else if (user.plan.isTrial) {
            return <Calendar className="w-6 h-6 text-blue-500" />;
        } else {
            return <Crown className="w-6 h-6 text-purple-500" />;
        }
    };

    const getPriceText = () => {
        if (user.plan.isFree) {
            return "Gratis";
        } else if (user.plan.isTrial) {
            return "Prueba gratis";
        } else {
            return `$${user.plan.price}/${user.plan.period.toLowerCase()}`;
        }
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
        if (user.plan.isTrial) {
            return "text-blue-600 dark:text-blue-400";
        } else if (user.plan.isFree) {
            return "text-green-600 dark:text-green-400";
        } else {
            return "text-purple-600 dark:text-purple-400";
        }
    };

    return (
        <DropdownMenu
            trigger={
                <button
                    className="group relative p-2 rounded-2xl transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                    aria-label="Menú de usuario"
                >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-all duration-300">
                        <div className="relative">
                            <UserCircle
                                size={20}
                                className={`text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300`}
                            />

                        </div>
                    </div>
                </button>
            }
        >
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Sección de información del usuario */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                    <div className="flex items-center gap-3">
                        <UserCircle className="w-12 h-12 text-gray-700 dark:text-gray-300" />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                                {capitalize(user.ownerProfile?.name) || 'Usuario'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                {user.email}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                {user.role}
                            </p>
                            {user.ownerProfile?.phone && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    📞 {user.ownerProfile.phone}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sección del plan */}
                <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                        {getPlanIcon()}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                {user.plan.title}
                            </h4>
                            <p className={`text-sm font-medium ${getStatusColor()} truncate`}>
                                {getPlanStatus()}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                {getPriceText()}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                        {user.plan.planStartedAt && (
                            <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded">
                                <p className="text-gray-500 dark:text-gray-400 text-xs">Inicio</p>
                                <p className="font-medium truncate">
                                    {user.plan.planStartedAt.toLocaleDateString()}
                                </p>
                            </div>
                        )}
                        {user.plan.planExpiresAt && (
                            <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded">
                                <p className="text-gray-500 dark:text-gray-400 text-xs">Vence</p>
                                <p className="font-medium truncate">
                                    {user.plan.planExpiresAt.toLocaleDateString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Acciones */}
                <div className="p-2">
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                        <User className="w-5 h-5" />
                        <span>Mi perfil</span>
                    </Link>
                    <LogoutButton />
                </div>
            </div>
        </DropdownMenu>
    );
};