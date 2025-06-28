// components/forms/RegisterForm.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

import { useCustomForm } from "@/hooks/useCustomForm";
import { RegistroFormData, registroSchema } from "@/schemas/auth/auth";
import { registerUser } from "@/app/actions/auth";
import { FormInput } from "@/src/ui/FormInput";
import { FormCheckbox } from "@/src/ui/FormCheckbox";
import { FormButton } from "@/src/ui/FormButton";
import PageTitle from "@/src/ui/PageTitle";

export default function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const planId = searchParams.get("planId");
    const role = searchParams.get("role");
    console.log("Plan ID:", planId);
    console.log("Role:", role);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useCustomForm<RegistroFormData>({
        schema: registroSchema,
        defaultValues: {
            email: "",
            password: "",
            planId: planId ? parseInt(planId) : 0, // Asegurarse de que sea un número
            role: (role as "clinic" | "owner" | "store" | "veterinarian" | "walker") ?? undefined,
        },
    });

    const onSubmit = async (data: RegistroFormData) => {
        console.log("Datos del formulario:", data);
        // const result = await registerUser(data);

        // if (!result.success) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Error",
        //         text: result.message || "Algo salió mal. Intenta de nuevo.",
        //         confirmButtonColor: "#ef4444",
        //     });
        // } else {
        //     Swal.fire({
        //         icon: "success",
        //         title: "Verifica tu email",
        //         html: `
        //     <div>
        //         <p>Hemos enviado un correo de verificación a <strong>${data.email}</strong>.</p>
        //         <p class="mt-4 text-sm text-gray-500">
        //             Por favor revisa tu bandeja de entrada y haz clic en el enlace para completar tu registro.
        //         </p>
        //         <p class="mt-2 text-sm text-gray-500">
        //             Tu cuenta no estará activa hasta que verifiques tu email.
        //         </p>
        //     </div>
        // `,
        //         confirmButtonColor: "#22c55e",
        //     });
        // }
        // // Redirigir al usuario a la página de inicio de sesión
        // router.push("/auth/login");
    };

    return (
        <div>
            <div className="text-center mb-10">
                <PageTitle>Regístrate para comenzar</PageTitle>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">


                {/* Formulario */}
                <div className="lg:w-2/3">
                    <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                            Información de acceso
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

                            <FormCheckbox
                                label="terms"
                                name="terms"
                                register={register}
                                error={errors.terms}
                                required
                            >
                                Acepto los{" "}
                                <a href="#" className="text-teal-600 hover:underline">
                                    términos y condiciones
                                </a>
                            </FormCheckbox>

                            <FormButton
                                type="submit"
                                variant="primary"
                                size="md"
                                loading={isSubmitting}
                                icon={ShieldCheck}
                                className="w-full"
                            >
                                Completar registro
                            </FormButton>
                        </form>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                            ¿Ya tienes una cuenta?{" "}
                            <Link href="/auth/login" className="text-teal-600 hover:underline">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
