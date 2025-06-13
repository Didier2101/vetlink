"use server"

import { PetFormData } from "@/schemas/pets/pet";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export const createPet = async (petData: PetFormData) => {

    if (!petData) {
        return {
            success: false,
            message: "No se recibieron datos del formulario."
        };
    }

    try {
        // 1. Verificar si ya existe una mascota con ese código Vetlink
        const existingPet = await prisma.pets.findUnique({
            where: {
                codeVetlink: petData.codeVetlink
            },
        })
        if (existingPet) {
            return { success: false, message: "Ya existe una mascota con ese código Vetlink." };
        }
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
                redirect('/owner/dashboard?error=limit_reached');
            }
        }
        // El plan Pro no tiene límites, no necesita verificación

        // 3. Crear la nueva mascota
        await prisma.pets.create({
            data: {
                // Datos básicos
                name: petData.name,
                species: petData.species,
                breed: petData.breed,
                sex: petData.sex,
                color: petData.color,
                birthDate: petData.birthDate,
                microchipNumber: petData.microchipNumber,
                tattooCode: petData.tattooCode,
                passportNumber: petData.passportNumber,
                codeVetlink: petData.codeVetlink,
                // Información médica
                sterilized: petData.sterilized,
                allergies: petData.allergies,
                chronicDiseases: petData.chronicDiseases,
                disabilities: petData.disabilities,
                bloodType: petData.bloodType,
                // Comportamiento
                behaviorNotes: petData.behaviorNotes,
                feedingSchedule: petData.feedingSchedule,
                diet: petData.diet,
                activityLevel: petData.activityLevel,
                aggressive: petData.aggressive,
                favoriteFood: petData.favoriteFood,
                // Información adicional
                photo: petData.photo, // Removed because 'photo' is not a valid field in the Prisma schema
                // Documentos - estructura correcta para relación
                // Documentos (creación relacionada)


                // Dueño
                ownerId: petData.ownerId,
                createdAt: new Date(),
                updatedAt: new Date(),

            },
        });
        return { success: true, message: "Mascota creada exitosamente." };


    } catch (error) {
        console.error("Error al crear mascota:", error);
        return { success: false, message: "Error al crear la mascota." };

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

