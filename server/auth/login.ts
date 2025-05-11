"use server";

import { cookies } from "next/headers";
import { LoginFormData } from "@/schemas/auth/register";
import { prisma } from "@/src/lib/prisma";
import { compare } from "bcryptjs";
import { encrypt } from "@/src/lib/crypto";

// Duración de la sesión: 30 días en segundos
const SESSION_DURATION = 60 * 60 * 24 * 30;

// Función para iniciar sesión con manejo de sesión
export const login = async (loginData: LoginFormData) => {
    // Verificamos que lleguen los datos
    if (!loginData) {
        return {
            success: false,
            message: "No se recibieron datos de inicio de sesión",
        };
    }

    const { email, password } = loginData;

    try {
        // Buscar el usuario por email con todas sus relaciones
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                owner: true,
                veterinarian: true,
                clinic: true,
                store: true
            }
        });

        // Si no se encuentra el usuario
        if (!user) {
            return {
                success: false,
                message: "El Email no está registrado",
            };
        }

        // Comparar contraseña
        const passwordMatch = await compare(password, user.password);

        // Si la contraseña no coincide
        if (!passwordMatch) {
            return {
                success: false,
                message: "La contraseña es incorrecta",
            };
        }

        // Obtener el perfil según la categoría
        let profile = null;
        let profileComplete = false;

        switch (user.category) {
            case "owner":
                profile = user.owner;
                profileComplete = !!profile;
                break;
            case "vet":
                profile = user.veterinarian;
                profileComplete = !!profile;
                break;
            case "clinic":
                profile = user.clinic;
                profileComplete = !!profile;
                break;
            case "store":
                profile = user.store;
                profileComplete = !!profile;
                break;
        }

        // Obtener el plan (esto sería un ejemplo, ajusta según cómo accedas al plan)
        const plan = await prisma.plan.findUnique({
            where: { id: user.planId }
        });

        // Crear datos de sesión
        const sessionData = {
            userId: user.id,
            email: user.email,
            category: user.category,
            name: profile?.name || "",
            planId: user.planId,
            planName: plan?.title || "",
        };

        // Crear o actualizar sesión
        const cookieStore = await cookies();

        // Encriptar datos de sesión
        const encryptedSession = await encrypt(JSON.stringify(sessionData));

        // Establecer cookie de sesión
        cookieStore.set("session", encryptedSession, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: SESSION_DURATION,
            path: "/",
            sameSite: "lax",
        });

        // Si todo está bien, devolvemos información para la redirección
        return {
            success: true,
            message: "Inicio de sesión exitoso",
            userId: user.id,
            category: user.category,
            name: profile?.name || "",
            profileComplete: profileComplete
        };
    } catch (error) {
        console.error("Error de inicio de sesión:", error);
        return {
            success: false,
            message: "Error al procesar el inicio de sesión",
        };
    }
}