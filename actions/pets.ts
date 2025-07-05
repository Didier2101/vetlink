"use server"

import { PetFormData } from "@/schemas/pets/pet";
import { prisma } from "@/src/lib/prisma";
import { generateVetLinkCode } from "@/src/utils/vetlinkGenerator";

export const createPet = async (petData: PetFormData) => {

    if (!petData) {
        return {
            success: false,
            message: "No se recibieron datos del formulario."
        };
    }

    try {

        // 2. Verificar si el dueño existe
        const ownerExisting = await prisma.owners.findUnique({
            where: {
                id: petData.ownerId
            },
            include: {
                users: {
                    include: {
                        plans: true
                    }
                },
                pets: true
            }
        });
        if (!ownerExisting) {
            return { success: false, message: "El amigo no existe." };
        }

        // 3. Verificar límites del plan
        const userPlan = ownerExisting.users?.plans;

        if (userPlan?.isFree) {
            // Plan gratuito - solo permite 1 mascota
            if (ownerExisting.pets.length >= 1) {
                return {
                    success: false,
                    message: "Tu plan gratuito solo permite registrar 1 mascota. Actualiza tu plan para agregar más."
                };
            }
        } else if (userPlan?.title === "Mi Manada Esencial") {
            // Plan esencial - permite hasta 3 mascotas
            if (ownerExisting.pets.length >= 3) {
                return {
                    success: false,
                    message: "Tu plan actual permite hasta 3 mascotas. Actualiza a 'Mi Manada Pro' para registrar más."
                };
            }
        }
        // El plan Pro no tiene límites, no necesita verificación

        // 3. Crear la mascota en transacción atómica
        // 3. Crear la mascota en transacción atómica
        const result = await prisma.$transaction(async (tx) => {
            // Paso 1: Crear registro básico (sin código VetLink)
            const newPet = await tx.pets.create({
                data: {
                    name: petData.name,
                    species: petData.species,
                    breed: petData.breed,
                    sex: petData.sex,
                    color: petData.color,
                    birthDate: petData.birthDate,
                    microchipNumber: petData.microchipNumber,
                    tattooCode: petData.tattooCode,
                    passportNumber: petData.passportNumber,
                    sterilized: petData.sterilized,
                    allergies: petData.allergies,
                    chronicDiseases: petData.chronicDiseases,
                    disabilities: petData.disabilities,
                    bloodType: petData.bloodType,
                    behaviorNotes: petData.behaviorNotes,
                    feedingSchedule: petData.feedingSchedule,
                    diet: petData.diet,
                    activityLevel: petData.activityLevel,
                    aggressive: petData.aggressive,
                    favoriteFood: petData.favoriteFood,
                    photo: petData.photo,
                    ownerId: petData.ownerId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    codeVetlink: "VL-0000000-0" // Valor temporal
                }
            });

            // Paso 2: Generar código VetLink único basado en el ID
            const vetLinkCode = generateVetLinkCode(newPet.id);

            // Paso 3: Actualizar mascota con código real
            return await tx.pets.update({
                where: { id: newPet.id },
                data: { codeVetlink: vetLinkCode }
            });
        });
        return {
            success: true,
            message: "Mascota creada exitosamente.",
            code: result.codeVetlink
        };


    } catch (error: unknown) {
        console.error("Error al crear mascota:", error);

        // Manejo específico de error de unicidad
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            (error as { code?: string }).code === 'P2002' &&
            "meta" in error &&
            (error as { meta?: { target?: string[] } }).meta?.target?.includes('codeVetlink')
        ) {
            return {
                success: false,
                message: "Error: Conflicto de código único. Intente nuevamente."
            };
        }

        return {
            success: false,
            message: "Error al crear la mascota."
        };

    }
}

export const getPetById = async (id: string) => {
    try {
        const pet = await prisma.pets.findUnique({
            where: {
                id: parseInt(id), // Convertir string a number
            },
            include: {
                owner: true, // Incluir información del dueño
                vaccines: {
                    include: {
                        vet: true, // Incluir información del veterinario que aplicó la vacuna
                    },
                    orderBy: {
                        applicationDate: 'desc', // Ordenar por fecha más reciente
                    }
                },
                attentions: {
                    include: {
                        vet: true, // Incluir información del veterinario
                        clinic: true, // Incluir información de la clínica
                    },
                    orderBy: {
                        date: 'desc', // Ordenar por fecha más reciente
                    }
                },
                documents: {
                    include: {
                        vet: true, // Incluir información del veterinario que emitió el documento
                    },
                    orderBy: {
                        issueDate: 'desc', // Ordenar por fecha más reciente
                    }
                },
                dewormings: {
                    orderBy: {
                        date: 'desc',
                    }
                },
                medications: {
                    orderBy: {
                        startDate: 'desc',
                    }
                }
            }
        });

        if (!pet) {
            return null;
        }

        return pet;
    } catch (error) {
        console.error("Error fetching pet:", error);
        return null;
    }
};

