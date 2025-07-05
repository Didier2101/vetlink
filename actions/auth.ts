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
        // 1. Buscar registro pendiente con este token
        const pendingRegistration = await prisma.pendingRegistrations.findFirst({
            where: {
                confirmationToken: token,
                tokenExpiresAt: {
                    gt: new Date(), // Mayor que la fecha actual
                },
            },
        });

        if (!pendingRegistration) {
            return {
                success: false,
                message: "Token inválido o expirado. Por favor solicita un nuevo enlace de verificación.",
            };
        }

        // 2. Verificar si el email ya está registrado (por si acaso)
        const userExist = await prisma.users.findUnique({
            where: { email: pendingRegistration.email },
        });

        if (userExist) {
            // Eliminar el registro pendiente si ya existe el usuario
            await prisma.pendingRegistrations.delete({
                where: { id: pendingRegistration.id },
            });
            return {
                success: false,
                message: "Este email ya está registrado.",
            };
        }

        // 3. Crear el usuario real
        await prisma.users.create({
            data: {
                email: pendingRegistration.email,
                password: pendingRegistration.password,
                planId: pendingRegistration.planId,
                terms: pendingRegistration.terms,
                emailConfirmed: true,
                createdAt: new Date(),
            }
        });

        // 4. Eliminar el registro temporal
        await prisma.pendingRegistrations.delete({
            where: { id: pendingRegistration.id },
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

export async function registerUser(data: RegistroFormData) {
    const userData = {
        email: data.email,
        password: data.password,
        planId: data.planId,
        role: data.role,
        terms: data.terms
    };

    // Validación de campos requeridos
    if (!userData.email || !userData.password || !userData.planId || !userData.role || userData.terms === undefined) {
        return {
            success: false,
            message: "Todos los campos son requeridos",
        };
    }

    try {
        // Verificar si el email ya está registrado o pendiente
        const [existingUser, pendingRegistration] = await Promise.all([
            prisma.users.findUnique({ where: { email: data.email } }),
            prisma.pendingRegistrations.findUnique({ where: { email: data.email } })
        ]);

        if (existingUser || pendingRegistration) {
            return {
                success: false,
                message: "El email ya está registrado o pendiente de confirmación",
            };
        }

        // Hashear la contraseña
        const hashedPassword = await hash(userData.password, 10);

        // Generar token y fecha de expiración (24 horas)
        const confirmationToken = randomBytes(32).toString('hex');
        const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Guardar en tabla temporal (NO en la tabla users)
        await prisma.pendingRegistrations.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                planId: userData.planId,
                role: userData.role,
                terms: userData.terms,
                confirmationToken,
                tokenExpiresAt
            }
        });

        // Enviar email de verificación
        await sendVerificationEmail(userData.email, confirmationToken);

        return {
            success: true,
            message: "Por favor verifica tu email para completar el registro. Revisa tu bandeja de entrada.",
        };
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        return {
            success: false,
            message: "Error al procesar el registro. Por favor intenta nuevamente.",
        };
    }
}





export async function loginUser(loginData: LoginFormData) {
    if (!loginData) {
        return {
            success: false,
            message: "No se recibieron datos de inicio de sesión",
        };
    }

    const { email, password } = loginData;

    try {
        // Buscar el usuario por email
        const user = await prisma.users.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                isProfileComplete: true,
                plans: {
                    select: {
                        role: true,
                    }
                }
            }
        });

        if (!user) {
            // Verificar si existe en registros pendientes
            const pending = await prisma.pendingRegistrations.findUnique({
                where: { email }
            });

            if (pending) {
                return {
                    success: false,
                    message: "Por favor verifica tu email para completar el registro. Revisa tu bandeja de entrada.",
                };
            }
            return {
                success: false,
                message: "El Email no está registrado",
            };
        }

        // Comparar contraseña
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            return {
                success: false,
                message: "La contraseña es incorrecta",
            };
        }

        // Crear sesión
        const sessionData = {
            id: user.id,
            email: user.email,
            role: user.plans.role,
            isProfileComplete: user.isProfileComplete,
            createdAt: Date.now()
        };

        const encryptedSession = await encryptEdge(JSON.stringify(sessionData));
        const cookieStore = await cookies();

        cookieStore.set("session", encryptedSession, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: SESSION_DURATION,
            path: "/",
            sameSite: "lax",
        });



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
    try {
        // Verificar si ya es usuario registrado
        const user = await prisma.users.findUnique({ where: { email } });
        if (user) {
            return {
                success: false,
                message: "Este email ya está registrado y verificado",
            };
        }

        // Buscar registro pendiente
        const pending = await prisma.pendingRegistrations.findUnique({
            where: { email }
        });

        if (!pending) {
            return {
                success: false,
                message: "No hay registro pendiente para este email",
            };
        }

        // Generar nuevo token si el actual está por expirar
        const newToken = randomBytes(32).toString('hex');
        const newExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await prisma.pendingRegistrations.update({
            where: { id: pending.id },
            data: {
                confirmationToken: newToken,
                tokenExpiresAt: newExpiry
            }
        });

        // Enviar email
        await sendVerificationEmail(email, newToken);

        return {
            success: true,
            message: "Se ha reenviado el correo de verificación"
        };
    } catch (error) {
        console.error("Error al reenviar email:", error);
        return {
            success: false,
            message: "Error al reenviar el correo de verificación"
        };
    }
}