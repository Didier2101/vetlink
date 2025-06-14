"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resendVerificationEmail } from "@/app/actions/auth";

export default function ResendVerificationPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const result = await resendVerificationEmail(email);
            if (result.success) {
                setStatus("success");
                setMessage(result.message || "Email de verificación reenviado correctamente");
            } else {
                setStatus("error");
                setMessage(result.message || "Error al reenviar el email de verificación");
            }
        } catch {
            setStatus("error");
            setMessage("Error al procesar la solicitud");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        Reenviar Email de Verificación
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    {status === "success" && (
                        <div className="rounded-md border border-green-300 bg-green-50 p-4 text-sm text-green-800">
                            <strong className="block font-medium">¡Éxito!</strong>
                            <span>{message}</span>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                            <strong className="block font-medium">Error</strong>
                            <span>{message}</span>
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={() => router.push("/auth/login")}
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            Volver a Login
                        </button>
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {status === "loading" ? "Enviando..." : "Reenviar Email"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
