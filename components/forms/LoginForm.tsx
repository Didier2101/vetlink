// components/forms/LoginForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Mail, Lock, Info, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

import { useCustomForm } from "@/hooks/useCustomForm";
import { LoginFormData, loginSchema } from "@/schemas/auth/auth";
import { loginUser, resendVerificationEmail } from "@/app/actions/auth";
import { FormInput } from "@/src/ui/FormInput";
import { FormCheckbox } from "@/src/ui/FormCheckbox";
import { FormButton } from "@/src/ui/FormButton";
import PageTitle from "@/src/ui/PageTitle";

export const LoginForm = () => {
    const router = useRouter();
    // const [rememberMe, setRememberMe] = useState(false);

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
                // Mensaje especial para email no verificado
                if (result.message?.includes("verifica tu email")) {
                    return Swal.fire({
                        icon: "warning",
                        title: "Verificación requerida",
                        html: `
              <div>
                <p>${result.message}</p>
                <p class="mt-3">¿No recibiste el correo?</p>
                <button id="resend-btn" class="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                  Reenviar correo de verificación
                </button>
              </div>
            `,
                        confirmButtonColor: "#3b82f6",
                        didOpen: () => {
                            document.getElementById('resend-btn')?.addEventListener('click', async () => {
                                Swal.showLoading();
                                const resendResult = await resendVerificationEmail(loginData.email);
                                Swal.fire({
                                    icon: resendResult.success ? "success" : "error",
                                    title: resendResult.success ? "Correo reenviado" : "Error",
                                    text: resendResult.message,
                                });
                            });
                        }
                    });
                }

                return Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: result.message,
                    confirmButtonColor: "#ef4444",
                });
            }

            // Éxito en el login
            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: result.message,
                showConfirmButton: false,
                timer: 1500,
                background: "#f8fafc",
            }).then(() => {
                if (result.success) {
                    const route = !result.user?.isProfileComplete
                        ? `/${result.user?.role}/complete-profile`
                        : `/${result.user.role}/dashboard`;
                    router.push(route);
                }
            });
        } catch (err) {
            console.error("Error de inicio de sesión:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ha ocurrido un error inesperado. Por favor, intenta nuevamente.",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    return (
        <div className="pb-10 mt-10 md:mt-0">
            {/* Header centrado */}
            <div className="text-center mb-12">
                <PageTitle>Inicia sesion para comenzar</PageTitle>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                    Conecta con los mejores profesionales para el cuidado de tu mascota
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
                <div className=" md:mb-4 w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                        Beneficios de tu cuenta
                    </h2>
                    <div className="space-y-5">
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 flex-shrink-0">
                                <Info size={18} className="text-teal-600 dark:text-teal-400" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800 dark:text-white">
                                    Historial completo
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    Accede al historial médico completo de tus mascotas desde
                                    cualquier dispositivo
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 flex-shrink-0">
                                <Info size={18} className="text-teal-600 dark:text-teal-400" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800 dark:text-white">
                                    Agenda inteligente
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    Programa y gestiona citas con veterinarios y cuidadores
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 flex-shrink-0">
                                <Info size={18} className="text-teal-600 dark:text-teal-400" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800 dark:text-white">
                                    Comunidad exclusiva
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    Conéctate con otros dueños de mascotas y profesionales
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-900/30">
                        <div className="flex items-center gap-3">
                            <ShieldCheck
                                size={24}
                                className="text-teal-600 dark:text-teal-400 flex-shrink-0"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                Tus datos están protegidos con encriptación de última generación
                            </span>
                        </div>
                    </div>

                </div>

                {/* Formulario centrado */}
                <div className="w-full max-w-md  bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                        Ingresa a tu cuenta
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <FormInput
                            label="Correo electrónico"
                            name="email"
                            type="email"
                            register={register}
                            error={errors.email}
                            placeholder="tucorreo@ejemplo.com"
                            icon={Mail}
                            required
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
                        />

                        <div className="flex items-center justify-between">
                            <FormCheckbox
                                label="remember"
                                name="remember"
                                register={register}
                            >
                                Recordar sesión
                            </FormCheckbox>

                            <Link
                                href="/forgot-password"
                                className="text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <FormButton
                            type="submit"
                            variant="primary"
                            size="md"
                            loading={isSubmitting}
                            icon={ArrowRight}
                            iconPosition="right"
                            className="w-full"
                        >
                            Iniciar sesión
                        </FormButton>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        ¿No tienes una cuenta?{" "}
                        <Link
                            href="/register"
                            className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                        >
                            Regístrate ahora
                        </Link>
                    </div>
                </div>
            </div>




        </div>
    );
};