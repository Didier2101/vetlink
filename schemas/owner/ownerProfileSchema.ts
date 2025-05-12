// src/schemas/ownerProfileSchema.ts
import { z } from "zod";

export const ownerProfileSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    phone: z.string().min(8, "El teléfono debe tener al menos 8 caracteres"),
    secondaryPhone: z.string().optional(),
    city: z.string().min(2, "La ciudad es requerida"),
    neighborhood: z.string().min(2, "El barrio/localidad es requerido"),
    address: z.string().optional(),
    emergencyContact: z.string().optional(),
});

export type OwnerProfileFormData = z.infer<typeof ownerProfileSchema>;