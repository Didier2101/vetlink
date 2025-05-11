"use server";

import { prisma } from "@/src/lib/prisma";
import { hash } from "bcryptjs";

interface UserData {
    email: string;
    password: string;
    planId: number;
    category: string;
}

// Función para crear un nuevo usuario en la base de datos
export const createUser = async (data: UserData) => {
    // Verificar que los datos no estén vacíos
    if (!data) {
        return {
            success: false,
            message: "No se recibieron datos para el registro.",
        }
    }

    try {


        const userExist = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        })

        // Verificar que el email y la contraseña no estén vacíos
        if (userExist) {
            return {
                success: false,
                message: "El email ya está registrado.",
            };
        }
        const hashedPassword = await hash(data.password, 10);


        // Crear nuevo usuario en la base de datos
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                planId: data.planId,
                category: data.category,
            },
        });


        return {
            success: true,
            userId: user.id,
        };


    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        return {
            success: false,
            message: "Error al registrar el usuario.",
        };

    }
}