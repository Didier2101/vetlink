"use server";


import { LoginFormData, RegistroFormData } from "@/schemas/auth/auth";
import { encryptEdge } from "@/src/lib/edge-crypto";
import { sendVerificationEmail } from "@/src/lib/email";
import { prisma } from "@/src/lib/prisma";
import { compare, hash } from "bcryptjs";
import { randomBytes } from "crypto";
import { cookies } from 'next/headers';

const SESSION_DURATION = 60 * 60 * 24 * 30;



export async function verifyEmail(token: string) {
    if (!token) {
        return {
            success: false,
            message: "Token de verificación no proporcionado",
        };
    }

    try {
        // Buscar usuario con este token y que no haya expirado
        const user = await prisma.users.findFirst({
            where: {
                confirmationToken: token,
                tokenExpiresAt: {
                    gt: new Date(), // Mayor que la fecha actual
                },
            },
        });

        if (!user) {
            return {
                success: false,
                message: "Token inválido o expirado. Por favor solicita un nuevo enlace de verificación.",
            };
        }

        // Actualizar el usuario
        await prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                emailConfirmed: true,
                confirmationToken: null,
                tokenExpiresAt: null,
            },
        });

        return {
            success: true,
            message: "Email verificado correctamente. Ya puedes iniciar sesión.",
        };
    } catch (error) {
        console.error("Error al verificar el email:", error);
        return {
            success: false,
            message: "Error al verificar el email. Por favor intenta nuevamente.",
        };
    }
}

// Server Action para registrar usuario
export async function registerUser(data: RegistroFormData) {
    const userData = {
        email: data.email,
        password: data.password,
        planId: data.planId,
        role: data.role,
        terms: data.terms
    };

    // Validar que lleguen todos los datos requeridos
    if (!userData) {
        return {
            success: false,
            message: "Todos los campos son requeridos",
        };

    }

    if (!userData.email || !userData.password || !userData.planId || !userData.role || userData.terms === undefined) {
        return {
            success: false,
            message: "Todos los campos son requeridos",
        };
    }

    try {
        // Verificar si el usuario ya existe
        const userExist = await prisma.users.findUnique({
            where: {
                email: data.email,
            },
        });

        if (userExist) {
            return {
                success: false,
                message: "El email ya está registrado.",
            };
        }

        // Hashear la contraseña
        const hashedPassword = await hash(userData.password, 10);
        // Generar token y fecha de expiración (24 horas)
        const confirmationToken = randomBytes(32).toString('hex');
        const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Crear nuevo usuario en la base de datos
        await prisma.users.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                planId: userData.planId,
                terms: userData.terms,
                // Nuevos campos para verificación
                emailConfirmed: false,
                confirmationToken,
                tokenExpiresAt,
                createdAt: new Date(),
            }
        });

        // Enviar email de verificación
        await sendVerificationEmail(userData.email, confirmationToken);

        return {
            success: true,
            message: "Usuario registrado exitosamente",
        };
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        return {
            success: false,
            message: "Error al registrar el usuario.",
        };
    }
}






export async function loginUser(loginData: LoginFormData) {
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
        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
                email: true,
                password: true,
                emailConfirmed: true,
                isProfileComplete: true,
                planId: true,
                plans: {
                    select: {
                        role: true,
                    }
                }
            }
        });


        // Si no se encuentra el usuario
        if (!user) {
            return {
                success: false,
                message: "El Email no está registrado",
            };
        }


        // Verificar si el email está confirmado
        if (!user.emailConfirmed) {
            return {
                success: false,
                message: "Por favor verifica tu email antes de iniciar sesión. Revisa tu bandeja de entrada o solicita un nuevo enlace de verificación.",
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





        // Crear datos de sesión con toda la información necesaria
        // Crear datos de sesión
        const sessionData = {
            id: user.id,
            createdAt: Date.now()
        };

        // Crear o actualizar sesión
        const encryptedSession = await encryptEdge(JSON.stringify(sessionData));
        // Encriptar datos de sesión


        const cookieStore = await cookies();

        // Encriptar datos de sesión

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
            user: {
                id: user.id,
                email: user.email,
                isProfileComplete: user.isProfileComplete,
                role: user.plans.role,
            }
        };
    } catch (error) {
        console.error("Error de inicio de sesión:", error);
        return {
            success: false,
            message: "Error al procesar el inicio de sesión",
        };
    }
}



// app/actions/auth.ts
export async function resendVerificationEmail(email: string) {
    if (!email) {
        return {
            success: false,
            message: "Email no proporcionado",
        };
    }

    try {
        const user = await prisma.users.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                email: true,
                emailConfirmed: true,
                confirmationToken: true,
                tokenExpiresAt: true,
            },
        });

        if (!user) {
            return {
                success: false,
                message: "No existe una cuenta con este email",
            };
        }

        if (user.emailConfirmed) {
            return {
                success: false,
                message: "Este email ya ha sido verificado",
            };
        }

        // Generar nuevo token si el anterior está expirado o no existe
        let token = user.confirmationToken;
        let expiresAt = user.tokenExpiresAt;

        if (!token || !expiresAt || new Date() > expiresAt) {
            token = randomBytes(32).toString('hex');
            expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

            await prisma.users.update({
                where: {
                    id: user.id,
                },
                data: {
                    confirmationToken: token,
                    tokenExpiresAt: expiresAt,
                },
            });
        }

        // Enviar email de verificación
        await sendVerificationEmail(user.email, token);

        return {
            success: true,
            message: "Email de verificación reenviado. Por favor revisa tu bandeja de entrada.",
        };
    } catch (error) {
        console.error("Error al reenviar email de verificación:", error);
        return {
            success: false,
            message: "Error al reenviar el email de verificación",
        };
    }
}