"use server"

import { getSession } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";

export async function getUserData() {
    const session = await getSession();

    if (!session.id) {
        return {
            success: false,
            message: "No se recibieron datos del usuario",
        };
    }

    try {
        const userData = await prisma.users.findFirst({
            where: { id: session.id },
            include: {
                plans: {
                    include: {
                        features: true, // si necesitas ver las features del plan
                    },
                },
                roles: true,
            },
        });

        if (!userData) {
            return {
                success: false,
                message: "Usuario no encontrado",
            };
        }

        return {
            success: true,
            message: "Datos del usuario obtenidos correctamente",
            user: {
                id: userData.id,
                email: userData.email,
                role: userData.roles.name,
                plan: {
                    id: userData.plans.id,
                    title: userData.plans.title,
                    description: userData.plans.description,
                    price: userData.plans.price,
                    isFree: userData.plans.isFree,
                    period: userData.plans.period,
                    maxPets: userData.plans.maxPets,
                    trialPeriodDays: userData.plans.trialPeriodDays
                },
                isProfileComplete: userData.isProfileComplete,
                planExpiresAt: userData.planExpiresAt,
                planStartedAt: userData.planStartedAt,
            },
        };
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        return {
            success: false,
            message: "Error al obtener los datos del usuario",
        };
    }
}
