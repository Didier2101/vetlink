// components/forms/LoginForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Mail, Lock, ShieldCheck, HeartPulse, CalendarCheck, Users } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

import { useCustomForm } from "@/hooks/useCustomForm";
import { LoginFormData, loginSchema } from "@/schemas/auth/auth";
import { loginUser, resendVerificationEmail } from "@/actions/auth";
import { FormInput } from "@/src/ui/FormInput";
import { FormCheckbox } from "@/src/ui/FormCheckbox";
import { FormButton } from "@/src/ui/FormButton";
import PageTitle from "@/src/ui/PageTitle";

export const LoginForm = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useCustomForm<LoginFormData>({
        schema: loginSchema,
    });

    const onSubmit = async (loginData: LoginFormData) => {
        try {
            const result = await loginUser(loginData);

            if (!result.success) {
                if (result.message?.includes("verifica tu email")) {
                    return Swal.fire({
                        icon: "warning",
                        title: "Registro incompleto",
                        html: `
                        <div>
                            <p>${result.message}</p>
                            <p class="mt-3 text-sm">¿No recibiste el correo de verificación?</p>
                            <button id="resend-btn" class="mt-3 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-md hover:opacity-90 transition-opacity">
                                Reenviar correo
                            </button>
                        </div>
                    `,
                        showConfirmButton: false,
                        didOpen: () => {
                            document.getElementById('resend-btn')?.addEventListener('click', async () => {
                                Swal.showLoading();
                                const resendResult = await resendVerificationEmail(loginData.email);
                                Swal.fire({
                                    icon: resendResult.success ? "success" : "error",
                                    title: resendResult.success ? "Correo enviado" : "Error",
                                    text: resendResult.message,
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                            });
                        }
                    });
                }

                return Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: result.message,
                    confirmButtonColor: "#3b82f6",
                    background: "#ffffff",
                    color: "#1f2937"
                });
            }

            Swal.fire({
                icon: "success",
                title: "¡Bienvenido!",
                text: result.message,
                timer: 1500,
                showConfirmButton: false,
                background: "#ffffff",
                color: "#1f2937"
            }).then(() => {
                router.push(result.user?.isProfileComplete
                    ? `/${result.user.role}/dashboard`
                    : `/${result.user?.role}/complete-profile`
                );
            });
        } catch (err) {
            console.error("Error:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error inesperado",
                confirmButtonColor: "#3b82f6",
                background: "#ffffff",
                color: "#1f2937"
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <PageTitle className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
                        Inicia sesión para comenzar
                    </PageTitle>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-3">
                        Conecta con los mejores profesionales para el cuidado de tu mascota
                    </p>
                </div>

                {/* Contenedor principal */}
                <div className=" flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Sección de beneficios */}
                    <div className=" hidden md:flex flex-col w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                            <HeartPulse className="text-teal-500" size={24} />
                            <span>Beneficios exclusivos</span>
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="p-3 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex-shrink-0">
                                    <HeartPulse size={20} className="text-teal-600 dark:text-teal-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                        Historial médico completo
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                                        Accede al historial médico de tus mascotas desde cualquier dispositivo, con registros detallados de cada consulta.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex-shrink-0">
                                    <CalendarCheck size={20} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                        Agenda inteligente
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                                        Programa y gestiona citas con veterinarios y cuidadores, con recordatorios automáticos.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex-shrink-0">
                                    <Users size={20} className="text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                        Comunidad exclusiva
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                                        Conéctate con otros dueños de mascotas y profesionales certificados en nuestra red.
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
                                    <h4 className="font-medium text-gray-800 dark:text-white">Seguridad garantizada</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        Tus datos están protegidos con encriptación de última generación y protocolos de seguridad avanzados.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                Ingresa a tu cuenta
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Introduce tus credenciales para acceder
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

                            <div className="flex items-center justify-between">
                                <FormCheckbox
                                    label="remember"
                                    name="remember"
                                    register={register}
                                    className="text-teal-600 dark:text-teal-400 focus:ring-teal-500"
                                >
                                    Recordar sesión
                                </FormCheckbox>

                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <FormButton
                                type="submit"
                                size="lg"
                                loading={isSubmitting}
                                icon={ArrowRight}
                                iconPosition="right"
                                className="w-full py-3 text-lg font-semibold"
                            >
                                Iniciar sesión
                            </FormButton>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                ¿No tienes una cuenta?{" "}
                                <Link
                                    href="/register"
                                    className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
                                >
                                    Regístrate ahora
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};