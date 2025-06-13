import { z } from "zod";

export const registroSchema = z.object({
    email: z
        .string()
        .min(1, "El correo es obligatorio")
        .email("Correo electrónico no válido"),
    password: z
        .string()
        .min(6, "Mínimo 6 caracteres")
        .max(100, "Máximo 100 caracteres"),
    terms: z.literal(true, {
        errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
    }),
    role: z.enum(["clinic", "owner", "store", "veterinarian", "walker"], {
        errorMap: () => ({ message: "Selecciona un rol válido" }),
    }),

    planId: z.number(),
});


export const loginSchema = z.object({
    // planId: z.number(),
    email: z
        .string()
        .min(1, { message: 'El email es requerido' })
        .email({ message: 'Ingresa un email válido' }),
    password: z
        .string()
        .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistroFormData = z.infer<typeof registroSchema>;