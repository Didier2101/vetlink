// components/forms/RegisterForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ShieldCheck, User2Icon, Check } from "lucide-react";
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

    const [planInfo, setPlanInfo] = useState({
        planId: "",
        role: "",
        planTitle: "",
        planPrice: "0",
        planBasePrice: "0",
        planFinalPrice: "0",
        billingType: "MONTHLY",
        planDescription: "",
        planPeriod: "",
        features: [] as { name: string; id: string }[],
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useCustomForm<RegistroFormData>({
        schema: registroSchema,
        defaultValues: {
            email: "",
            password: "",
            planId: 0,
            role: "owner",
        },
    });

    useEffect(() => {
        const planId = searchParams.get("planId") || "";
        const role = searchParams.get("role") || searchParams.get("roleName") || "owner";
        const planTitle = searchParams.get("planTitle") || "";
        const planBasePrice = searchParams.get("planBasePrice") || "0";
        const planFinalPrice = searchParams.get("planFinalPrice") || "0";
        const billingType = searchParams.get("billingType") || "MONTHLY";
        const planPeriod = searchParams.get("planPeriod") || "";
        const planDescription = searchParams.get("planDescription") || "";
        const featuresParam = searchParams.get("features");

        let features: { name: string; id: string }[] = [];

        if (featuresParam) {
            try {
                features = JSON.parse(featuresParam);
            } catch {
                features = [];
            }
        }

        setPlanInfo({
            planId,
            role,
            planTitle,
            planPrice: planFinalPrice,
            planBasePrice,
            planFinalPrice,
            billingType,
            planDescription,
            planPeriod,
            features,
        });

        if (planId) {
            setValue("planId", Number(planId));
        }

        if (role) {
            const validRoles = ["clinic", "owner", "store", "veterinarian", "walker"];
            const validRole = validRoles.includes(role.toLowerCase()) ? role.toLowerCase() : "owner";
            setValue("role", validRole as RegistroFormData["role"]);
        }
    }, [searchParams, setValue]);

    const onSubmit = async (data: RegistroFormData) => {
        const result = await registerUser(data);

        if (!result.success) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: result.message || "Algo salió mal. Intenta de nuevo.",
                confirmButtonColor: "#ef4444",
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Registro exitoso",
                html: `
          <div>
            <p>${result.message || "Tu cuenta ha sido creada exitosamente."}</p>
            <p class="mt-4">Hemos enviado un correo de verificación a <strong>${data.email}</strong>.</p>
            <p class="text-sm text-gray-500 mt-2">
              Por favor revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
            </p>
          </div>
        `,
                confirmButtonColor: "#22c55e",
                confirmButtonText: "Entendido",
            }).then(() => {
                router.push("/auth/login");
            });
        }
    };

    return (
        <div>
            <div className="text-center mb-10">
                <PageTitle>Regístrate para comenzar</PageTitle>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Plan Summary */}
                <div className="lg:w-1/3">
                    <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 flex items-center justify-center">
                                <User2Icon />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Plan: {planInfo.planTitle}
                                </h3>
                            </div>
                        </div>

                        {planInfo.planPrice !== "0" && (
                            <div className="mb-4">
                                <span className="text-2xl font-bold text-blue-600 dark:text-teal-400">
                                    ${Number(planInfo.planPrice).toLocaleString()}
                                </span>
                                <span className="text-gray-500 text-sm ml-1">
                                    /{planInfo.planPeriod}
                                </span>
                            </div>
                        )}

                        {planInfo.planDescription && (
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                {planInfo.planDescription}
                            </p>
                        )}

                        <div className="space-y-2">
                            {planInfo.features.map((feature, i) => (
                                <div key={i} className="flex items-center">
                                    <Check size={16} className="text-teal-600 mr-2" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        {feature.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <ShieldCheck
                                size={16}
                                className="text-blue-600 dark:text-blue-400 mr-2"
                            />
                            <span className="text-xs text-gray-700 dark:text-gray-300">
                                Tus datos están protegidos con encriptación de última generación
                            </span>
                        </div>
                    </div>
                </div>

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
