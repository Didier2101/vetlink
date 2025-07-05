"use client";
import { ChangePlan } from '@/components/main/ChangePlan';
import { formatDate } from '@/src/utils/formatDate';
import { Check, CreditCard, Pencil, User, X, Mail, Phone, MapPin, Calendar, ChevronRight, AlertTriangle } from 'lucide-react';
import React, { useState } from 'react'

interface OwnerProps {
    owner: {
        id: number;
        email: string;
        isProfileComplete: boolean;
        createdAt: Date;
        isTrial: boolean;
        trialEndsAt: Date | null;
        planStartedAt: Date | null;
        planExpiresAt: Date | null;
        owners: {
            id: number;
            name: string;
            lastName: string;
            phone: string;
            secondaryPhone: string | null;
            city: string;
            neighborhood: string;
            address: string;
            createdAt: Date;
        };
        plans: {
            id: number;
            title: string;
            description: string;
            price: number;
            period: string;
            isFree: boolean;
            role: string;
            features: string[];
        };
    };
}

export default function Perfil({ owner }: OwnerProps) {
    const [activeTab, setActiveTab] = useState('general');
    const [editMode, setEditMode] = useState(false);

    return (
        <div className="pb-10">
            {/* Header con gradiente */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30">
                        <User size={28} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700 dark:from-white dark:via-emerald-200 dark:to-teal-200 bg-clip-text text-transparent">
                            Perfil de {owner.owners.name} {owner.owners.lastName}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                            Gestiona tu información personal y configuración
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Estado del perfil */}
                    <div className="hidden md:block p-4 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-200 dark:border-blue-800/50">
                        <div className="flex items-start gap-3">
                            {owner.isProfileComplete ? (
                                <Check className="flex-shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" size={20} />
                            ) : (
                                <AlertTriangle className="flex-shrink-0 mt-0.5 text-amber-500 dark:text-amber-400" size={20} />
                            )}
                            <p className="text-sm md:text-base text-blue-800 dark:text-blue-200">
                                <strong className="font-semibold">
                                    {owner.isProfileComplete ? 'Perfil completo' : 'Perfil incompleto'}
                                </strong>
                            </p>
                        </div>
                    </div>

                    {/* Botón de edición */}
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className="group relative bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 focus:ring-4 focus:ring-emerald-500/30 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:scale-[1.02] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <Pencil size={18} className="relative" />
                        <span className="relative">{editMode ? 'Cancelar' : 'Editar'}</span>
                        <ChevronRight size={18} className="relative transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>

            {/* Tabs con estilo mejorado */}
            <div className="flex gap-1 p-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm mb-6">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`flex-1 relative px-6 py-3 font-medium rounded-lg transition-all duration-300 ${activeTab === 'general'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <User size={18} />
                        General
                    </div>
                </button>

                <button
                    onClick={() => setActiveTab('plan')}
                    className={`flex-1 relative px-6 py-3 font-medium rounded-lg transition-all duration-300 ${activeTab === 'plan'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <CreditCard size={18} />
                        Plan
                    </div>
                </button>
            </div>

            {/* Contenido de los tabs */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                {activeTab === 'general' && (
                    <div className="space-y-6">
                        {/* Sección de Información General */}
                        <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                    <User size={20} className="text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Información Personal
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nombre */}
                                <div>
                                    <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                        <User size={16} className="text-emerald-600" />
                                        Nombre Completo
                                    </label>
                                    {editMode ? (
                                        <div className="flex gap-2">
                                            <div className="flex-1 relative">
                                                <input
                                                    type="text"
                                                    defaultValue={owner.owners.name}
                                                    className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                                                    placeholder="Nombre"
                                                />
                                                <User className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                                            </div>
                                            <div className="flex-1 relative">
                                                <input
                                                    type="text"
                                                    defaultValue={owner.owners.lastName}
                                                    className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                                                    placeholder="Apellido"
                                                />
                                                <User className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50">
                                            <p className="text-lg text-gray-900 dark:text-white font-medium">
                                                {owner.owners.name} {owner.owners.lastName}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                        <Mail size={16} className="text-blue-600" />
                                        Email
                                    </label>
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50">
                                        <p className="text-lg text-gray-900 dark:text-white font-medium">
                                            {owner.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sección de Contacto */}
                        <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                    <Phone size={20} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Información de Contacto
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Teléfono principal */}
                                <div>
                                    <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                        <Phone size={16} className="text-purple-600" />
                                        Teléfono Principal
                                    </label>
                                    {editMode ? (
                                        <div className="relative">
                                            <input
                                                type="text"
                                                defaultValue={owner.owners.phone}
                                                className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                                                placeholder="+57 300 123 4567"
                                            />
                                            <Phone className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                                        </div>
                                    ) : (
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50">
                                            <p className="text-lg text-gray-900 dark:text-white font-medium">
                                                {owner.owners.phone}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Teléfono secundario */}
                                <div>
                                    <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                        <Phone size={16} className="text-indigo-600" />
                                        Teléfono Secundario
                                    </label>
                                    {editMode ? (
                                        <div className="relative">
                                            <input
                                                type="text"
                                                defaultValue={owner.owners.secondaryPhone || ''}
                                                className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                                                placeholder="Teléfono alternativo"
                                            />
                                            <Phone className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                                        </div>
                                    ) : (
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50">
                                            <p className="text-lg text-gray-900 dark:text-white font-medium">
                                                {owner.owners.secondaryPhone || 'No especificado'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sección de Ubicación */}
                        <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                    <MapPin size={20} className="text-purple-600 dark:text-purple-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Ubicación
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Dirección */}
                                <div>
                                    <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                        <MapPin size={16} className="text-orange-600" />
                                        Dirección
                                    </label>
                                    {editMode ? (
                                        <div className="relative">
                                            <input
                                                type="text"
                                                defaultValue={owner.owners.address}
                                                className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                                                placeholder="Ej: Calle 123 #45-67"
                                            />
                                            <MapPin className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                                        </div>
                                    ) : (
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50">
                                            <p className="text-lg text-gray-900 dark:text-white font-medium">
                                                {owner.owners.address || 'No especificada'}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Ciudad/Colonia */}
                                <div>
                                    <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                        <MapPin size={16} className="text-teal-600" />
                                        Ciudad/Colonia
                                    </label>
                                    {editMode ? (
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    defaultValue={owner.owners.city}
                                                    className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                                                    placeholder="Ciudad"
                                                />
                                                <MapPin className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    defaultValue={owner.owners.neighborhood}
                                                    className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
                                                    placeholder="Colonia"
                                                />
                                                <MapPin className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50">
                                            <p className="text-lg text-gray-900 dark:text-white font-medium">
                                                {owner.owners.city}, {owner.owners.neighborhood}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sección de Información Adicional */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                    <Calendar size={20} className="text-amber-600 dark:text-amber-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Información Adicional
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Estado del perfil
                                    </label>
                                    <div className="p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50">
                                        <div className="flex items-center gap-2">
                                            {owner.isProfileComplete ? (
                                                <>
                                                    <Check className="text-emerald-600" size={18} />
                                                    <span className="text-emerald-600 font-medium">Perfil completo</span>
                                                </>
                                            ) : (
                                                <>
                                                    <AlertTriangle className="text-amber-600" size={18} />
                                                    <span className="text-amber-600 font-medium">Perfil incompleto</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Miembro desde
                                    </label>
                                    <div className="p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50">
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {formatDate(owner.createdAt.toString())}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {editMode && (
                            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
                                >
                                    <X size={18} />
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        // Lógica para guardar cambios
                                        setEditMode(false);
                                    }}
                                    className="group relative bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 focus:ring-4 focus:ring-emerald-500/30 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:scale-[1.02] overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    <Check size={18} className="relative" />
                                    <span className="relative">Guardar cambios</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'plan' && (
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                    <CreditCard size={20} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Plan Actual
                                </h2>
                            </div>

                            <ChangePlan
                                currentPlan={owner.plans}
                                availablePlans={[owner.plans]}
                                onPlanChange={async (newPlanId) => {
                                    // TODO: Implement plan change logic
                                    console.log('Plan change requested:', newPlanId);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}