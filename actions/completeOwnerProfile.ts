"use server";

import { OwnerProfileFormData } from "@/schemas/owner/ownerProfileSchema";
import { prisma } from "@/src/lib/prisma";

export const completeOwnerProfile = async (data: OwnerProfileFormData) => {
    try {
        // 1. Verificar si el usuario existe y obtener su información
        const user = await prisma.users.findUnique({
            where: { id: data.userId },
            include: {
                plans: true,
                owners: true
            }
        });

        if (!user) {
            return { result: false, message: "Usuario no encontrado." };
        }

        const now = new Date();

        // 2. Crear o actualizar el perfil del propietario (owners)
        await prisma.owners.upsert({
            where: { userId: data.userId },
            update: {
                name: data.name,
                lastName: data.lastName,
                phone: data.phone,
                secondaryPhone: data.secondaryPhone || null,
                city: data.city,
                neighborhood: data.neighborhood,
                address: data.address,
                updatedAt: now
            },
            create: {
                userId: data.userId,
                name: data.name,
                lastName: data.lastName,
                phone: data.phone,
                secondaryPhone: data.secondaryPhone || null,
                city: data.city,
                neighborhood: data.neighborhood,
                address: data.address,
                createdAt: now,
                updatedAt: now
            }
        });

        // 3. Preparar datos básicos de actualización del usuario
        const userUpdateData: {
            isProfileComplete: boolean;
            trialStartedAt?: Date | null;
            trialEndsAt?: Date | null;
            planStartedAt?: Date;
            planExpiresAt?: Date | null;
            isTrial?: boolean;
        } = {
            isProfileComplete: true
        };

        // 4. Solo si no estaba completo previamente, actualizamos fechas
        if (!user.isProfileComplete) {
            let trialEndsAt = null;
            let isTrial = false;
            let planExpiresAt = null;

            // Calcular período de prueba y fecha de expiración del plan
            if (user.plans?.trialPeriodDays && user.plans.trialPeriodDays > 0) {
                // Fecha de fin de trial
                trialEndsAt = new Date(now);
                trialEndsAt.setDate(trialEndsAt.getDate() + user.plans.trialPeriodDays);
                isTrial = true;

                // Fecha de expiración del plan (usando los mismos días del trial)
                planExpiresAt = new Date(now);
                planExpiresAt.setDate(planExpiresAt.getDate() + user.plans.trialPeriodDays);
            }

            // Ajustar para planes gratuitos
            if (user.plans?.isFree) {
                isTrial = false;
                trialEndsAt = null;
                planExpiresAt = null;
            }

            // Añadir campos de fechas
            userUpdateData.trialStartedAt = isTrial ? now : null;
            userUpdateData.trialEndsAt = trialEndsAt;
            userUpdateData.planStartedAt = now;
            userUpdateData.planExpiresAt = planExpiresAt;
            userUpdateData.isTrial = isTrial;
        }

        // 5. Actualizar usuario en la base de datos
        await prisma.users.update({
            where: { id: data.userId },
            data: userUpdateData
        });

        return {
            result: true,
            message: "Perfil completado exitosamente."
        };

    } catch (error) {
        console.error("Error al completar perfil:", error);
        return {
            result: false,
            message: "Ocurrió un error al guardar el perfil. Intenta nuevamente."
        };
    }
};