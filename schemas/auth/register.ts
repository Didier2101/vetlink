import { z } from "zod";

export const registroSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'El email es requerido' })
        .email({ message: 'Ingresa un email válido' }),
    password: z
        .string()
        .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    planId: z.number(),
    category: z.string().optional(),
});

export type RegistroFormData = z.infer<typeof registroSchema>;