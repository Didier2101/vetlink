"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ShieldCheck, ArrowRight, CheckCircle, FileText, User } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import React from "react";

import { useCustomForm } from "@/hooks/useCustomForm";
import { RegistroFormData, registroSchema } from "@/schemas/auth/auth";
import { registerUser } from "@/actions/auth";
import { FormInput } from "@/src/ui/FormInput";
import { FormCheckbox } from "@/src/ui/FormCheckbox";
import { FormButton } from "@/src/ui/FormButton";
import PageTitle from "@/src/ui/PageTitle";

export default function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const planId = searchParams.get("plan.id");
    const role = searchParams.get("role");

    // Validar parámetros al cargar el componente
    React.useEffect(() => {
        if (!planId || !role) {
            showPlanRequiredAlert();
        }
    }, [planId, role]);

    const showPlanRequiredAlert = () => {
        Swal.fire({
            icon: "warning",
            title: "Plan requerido",
            html: `
                <div class="text-left">
                    <p class="mb-4">Debes seleccionar un plan para continuar con el registro.</p>
                    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                        <p class="text-sm text-gray-600 dark:text-gray-300">
                            Serás redirigido a nuestra página de planes.
                        </p>
                    </div>
                </div>
            `,
            confirmButtonColor: "#3b82f6",
            background: "#ffffff",
            color: "#1f2937",
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(() => {
            router.push("/plans");
        });
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useCustomForm<RegistroFormData>({
        schema: registroSchema,
        defaultValues: {
            email: "",
            password: "",
            planId: planId ? parseInt(planId) : 0,
            role: (role as "clinic" | "owner" | "store" | "veterinarian" | "walker") ?? undefined,
        },
    });

    const onSubmit = async (data: RegistroFormData) => {
        // Validación adicional por si acaso
        if (!data.planId || !data.role) {
            showPlanRequiredAlert();
            return;
        }

        try {
            const result = await registerUser(data);

            if (!result.success) {
                return Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: result.message || "Algo salió mal. Intenta de nuevo.",
                    confirmButtonColor: "#3b82f6",
                    background: "#ffffff",
                    color: "#1f2937"
                });
            }

            Swal.fire({
                icon: "success",
                title: "Verifica tu email",
                html: `
                    <div class="text-left">
                        <p class="mb-4">Hemos enviado un correo de verificación a <strong>${data.email}</strong>.</p>
                        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                            <p class="text-sm text-gray-600 dark:text-gray-300">
                                <span class="font-medium">Importante:</span> Revisa tu bandeja de entrada y haz clic en el enlace para completar tu registro.
                            </p>
                        </div>
                        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            ¿No recibiste el correo? Revisa tu carpeta de spam o solicita un nuevo enlace.
                        </p>
                    </div>
                `,
                confirmButtonColor: "#3b82f6",
                background: "#ffffff",
                color: "#1f2937",
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(() => {
                router.push("/login");
            });
        } catch (error) {
            console.error("Registration error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error inesperado durante el registro",
                confirmButtonColor: "#3b82f6",
                background: "#ffffff",
                color: "#1f2937"
            });
        }
    };

    // Si no hay planId o role, mostrar solo spinner de carga
    if (!planId || !role) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">Redirigiendo a la página de planes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <PageTitle className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
                        Crea tu cuenta
                    </PageTitle>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-3">
                        Únete a nuestra comunidad y disfruta de todos los beneficios
                    </p>
                </div>

                {/* Contenedor principal */}
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Sección de beneficios */}
                    <div className=" hidden md:flex flex-col w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                            <CheckCircle className="text-teal-500" size={24} />
                            <span>Por qué registrarse</span>
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="p-3 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex-shrink-0">
                                    <User size={20} className="text-teal-600 dark:text-teal-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                        Perfil personalizado
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                                        Crea un perfil único para ti y tus mascotas con toda la información importante.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex-shrink-0">
                                    <ShieldCheck size={20} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                        Seguridad avanzada
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                                        Tus datos protegidos con encriptación de última generación.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex-shrink-0">
                                    <FileText size={20} className="text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                        Documentación centralizada
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                                        Almacena y accede a los registros médicos de tus mascotas desde cualquier lugar.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-5 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl border border-teal-100 dark:border-teal-800/50">
                            <div className="flex items-center gap-4">
                                <ShieldCheck
                                    size={28}
                                    className="text-teal-600 dark:text-teal-400 flex-shrink-0"
                                />
                                <div>
                                    <h4 className="font-medium text-gray-800 dark:text-white">Plan seleccionado</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        {planId ? `Estás registrándote con el plan #${planId}` : 'Registro básico'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                Completa tu registro
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Introduce tus datos para crear tu cuenta
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <FormInput
                                label="Correo electrónico"
                                name="email"
                                type="email"
                                register={register}
                                error={errors.email}
                                placeholder="tucorreo@ejemplo.com"
                                icon={Mail}
                                required
                                className="bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
                            />

                            <FormInput
                                label="Contraseña"
                                name="password"
                                type="password"
                                register={register}
                                error={errors.password}
                                placeholder="••••••••"
                                icon={Lock}
                                showPasswordToggle
                                required
                                className="bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
                            />

                            <div className="mt-4">
                                <FormCheckbox
                                    label="terms"
                                    name="terms"
                                    register={register}
                                    error={errors.terms}
                                    required
                                    className="text-teal-600 dark:text-teal-400 focus:ring-teal-500"
                                >
                                    Acepto los{" "}
                                    <Link href="/terms" className="text-teal-600 hover:underline dark:text-teal-400">
                                        términos y condiciones
                                    </Link>{" "}
                                    y la{" "}
                                    <Link href="/privacy" className="text-teal-600 hover:underline dark:text-teal-400">
                                        política de privacidad
                                    </Link>
                                </FormCheckbox>
                            </div>

                            <FormButton
                                type="submit"
                                size="lg"
                                loading={isSubmitting}
                                icon={ArrowRight}
                                iconPosition="right"
                                className="w-full py-3 text-lg font-semibold"
                            >
                                Completar registro
                            </FormButton>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                ¿Ya tienes una cuenta?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
                                >
                                    Inicia sesión
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}