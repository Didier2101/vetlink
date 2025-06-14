"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "../actions/auth";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setStatus("error");
            setMessage("Token de verificación no proporcionado");
            return;
        }

        const verify = async () => {
            try {
                const result = await verifyEmail(token); // Asegúrate de importar esta función
                if (result.success) {
                    setStatus("success");
                    setMessage(result.message || "Email verificado correctamente");
                } else {
                    setStatus("error");
                    setMessage(result.message || "Error al verificar el email");
                }
            } catch {
                setStatus("error");
                setMessage("Error al procesar la verificación");
            }
        };

        verify();
    }, [searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        Verificación de Email
                    </h2>
                </div>

                <div className="mt-8 space-y-6">
                    {status === "loading" && (
                        <div className="flex items-center space-x-3 rounded-md border border-blue-300 bg-blue-50 px-4 py-3 text-blue-800">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                            <div>
                                <p className="font-medium">Verificando...</p>
                                <p className="text-sm">Por favor espera mientras verificamos tu email.</p>
                            </div>
                        </div>
                    )}

                    {status === "success" && (
                        <>
                            <div className="rounded-md border border-green-300 bg-green-50 p-4 text-green-800">
                                <p className="font-semibold">¡Verificación exitosa!</p>
                                <p className="text-sm">{message}</p>
                            </div>
                            <button
                                onClick={() => router.push("/auth/login")}
                                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Ir a Iniciar Sesión
                            </button>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <div className="rounded-md border border-red-300 bg-red-50 p-4 text-red-800">
                                <p className="font-semibold">Error</p>
                                <p className="text-sm">{message}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => router.push("/auth/register")}
                                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Registrarse de nuevo
                                </button>
                                <button
                                    onClick={() => router.push("/auth/login")}
                                    className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                >
                                    Ir a Iniciar Sesión
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
