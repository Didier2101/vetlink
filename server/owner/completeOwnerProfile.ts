"use server"

import { prisma } from "@/src/lib/prisma";
import { OwnerProfileFormData } from "@/schemas/owner/ownerProfileSchema";
import { getSession } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export const completeOwnerProfile = async (data: OwnerProfileFormData) => {
    // Obtener la sesión del usuario
    const session = await getSession();
    if (!session) redirect("/auth/login");  // Redirigir si no hay sesión

    try {
        // Verificar si ya existe un perfil de propietario para este usuario
        const existingOwner = await prisma.owner.findUnique({
            where: {
                userId: session.userId, // Verificar si ya existe un perfil de propietario con el userId
            },
        });

        // Si el perfil de propietario ya existe, actualizarlo
        if (existingOwner) {
            await prisma.owner.update({
                where: {
                    userId: session.userId, // Buscar el perfil por userId
                },
                data: {
                    name: data.name,
                    lastName: data.lastName,
                    phone: data.phone,
                    secondaryPhone: data.secondaryPhone || null,
                    city: data.city,
                    neighborhood: data.neighborhood,
                    address: data.address || null,
                    emergencyContact: data.emergencyContact || null,
                    updatedAt: new Date(), // Actualizar la fecha de modificación
                },
            });

            // Asegurarse de que el campo `isProfileComplete` del usuario también se actualice
            await prisma.user.update({
                where: { id: session.userId },
                data: { isProfileComplete: true },
            });

            return {
                message: "Perfil actualizado exitosamente",
                isProfileComplete: true,
            };
        }

        // Si el perfil de propietario no existe, crear uno nuevo
        await prisma.owner.create({
            data: {
                userId: session.userId, // Relación con el usuario
                name: data.name,
                lastName: data.lastName,
                phone: data.phone,
                secondaryPhone: data.secondaryPhone || null,
                city: data.city,
                neighborhood: data.neighborhood,
                address: data.address || null,
                emergencyContact: data.emergencyContact || null,
            },
        });

        // Asegurarse de que el campo `isProfileComplete` del usuario también se actualice
        await prisma.user.update({
            where: { id: session.userId },
            data: { isProfileComplete: true },
        });

        return {
            message: "Perfil completado exitosamente",
            isProfileComplete: true,
        };
    } catch (error) {
        console.error("Error completando perfil:", error);
        return {
            message: "Hubo un error al completar el perfil",
            isProfileComplete: false,
        };
    }
};
