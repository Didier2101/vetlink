"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PawPrint, User, Smartphone, MapPin, FileText, Heart } from 'lucide-react';

const formSchema = z.object({
    petName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    plateId: z.string().min(6, { message: "El ID de la placa debe tener al menos 6 caracteres" }),
    finderName: z.string().min(2, { message: "Tu nombre debe tener al menos 2 caracteres" }),
    finderPhone: z.string().min(10, { message: "El teléfono debe tener al menos 10 dígitos" }),
    foundLocation: z.string().min(10, { message: "Describe con más detalle el lugar" }),
    additionalNotes: z.string().optional(),
});

const FoundPetPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("Datos del reporte:", data);
        alert(`¡Gracias por reportar a ${data.petName}!`);
        reset();
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            {/* Header con gradiente */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30">
                        <PawPrint size={28} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent">
                        Reportar Mascota Encontrada
                    </h1>
                </div>

                {/* Mensaje de agradecimiento */}
                <div className="p-4 md:p-5 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-200 dark:border-blue-800/50">
                    <div className="flex items-start gap-3">
                        <Heart className="flex-shrink-0 mt-0.5 text-pink-500 dark:text-pink-400" size={20} />
                        <p className="text-sm md:text-base text-blue-800 dark:text-blue-200">
                            <strong className="font-semibold">¡Gracias por tu ayuda!</strong> Al reportar esta mascota, estás ayudando a reunirla con su familia.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Columna izquierda - Datos de la mascota */}
                    <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <PawPrint size={20} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Datos de la mascota
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nombre de la mascota (la encuentras en la placa)
                                </label>
                                <div className="relative">
                                    <input
                                        {...register("petName")}
                                        className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                                        placeholder="Ej: Toby"
                                    />
                                    <User className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                                </div>
                                {errors.petName && (
                                    <p className="text-red-500 text-sm mt-2">{errors.petName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    ID de la placa VetLink
                                </label>
                                <div className="relative">
                                    <input
                                        {...register("plateId")}
                                        className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                                        placeholder="Ej: VL123456"
                                    />
                                    <FileText className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                                </div>
                                {errors.plateId && (
                                    <p className="text-red-500 text-sm mt-2">{errors.plateId.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Datos del finder */}
                    <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30">
                                <User size={20} className="text-teal-600 dark:text-teal-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Tus datos
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tu nombre completo
                                </label>
                                <input
                                    {...register("finderName")}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                                    placeholder="Ej: María González"
                                />
                                {errors.finderName && (
                                    <p className="text-red-500 text-sm mt-2">{errors.finderName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tu teléfono de contacto
                                </label>
                                <div className="relative">
                                    <input
                                        {...register("finderPhone")}
                                        className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                                        placeholder="Ej: 3001234567"
                                    />
                                    <Smartphone className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                                </div>
                                {errors.finderPhone && (
                                    <p className="text-red-500 text-sm mt-2">{errors.finderPhone.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de ubicación y notas - Ocupa todo el ancho */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                <MapPin size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Ubicación
                            </h2>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                ¿Dónde encontraste a la mascota?
                            </label>
                            <textarea
                                {...register("foundLocation")}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                                placeholder="Ej: En el parque central, cerca a la fuente, alrededor de las 3pm"
                            />
                            {errors.foundLocation && (
                                <p className="text-red-500 text-sm mt-2">{errors.foundLocation.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                <FileText size={20} className="text-amber-600 dark:text-amber-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Notas adicionales
                            </h2>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Detalles adicionales (opcional)
                            </label>
                            <textarea
                                {...register("additionalNotes")}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                                placeholder="Ej: La mascota tenía collar azul, parecía asustada y tenía una mancha blanca en la pata derecha"
                            />
                        </div>
                    </div>
                </div>

                {/* Botón de envío */}
                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:scale-[1.02] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <span className="relative">Reportar Mascota Encontrada</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FoundPetPage;