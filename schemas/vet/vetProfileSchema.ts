import { z } from "zod";

// Schema para información personal
export const personalInfoSchema = z.object({
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(100, "El nombre no puede exceder 100 caracteres")
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),

    lastName: z
        .string()
        .min(2, "El apellido debe tener al menos 2 caracteres")
        .max(100, "El apellido no puede exceder 100 caracteres")
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo puede contener letras"),

    phone: z
        .string()
        .min(10, "El teléfono debe tener al menos 10 dígitos")
        .max(20, "El teléfono no puede exceder 20 caracteres")
        .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Formato de teléfono inválido"),

    licenseNumber: z
        .string()
        .min(5, "El número de matrícula debe tener al menos 5 caracteres")
        .max(50, "El número de matrícula no puede exceder 50 caracteres")
        .regex(/^[A-Z0-9\-]+$/, "Formato de matrícula inválido (ej: CRV-12345)"),
});

// Schema para información profesional
export const professionalInfoSchema = z.object({
    specialty: z
        .string()
        .min(2, "La especialidad debe tener al menos 2 caracteres")
        .max(100, "La especialidad no puede exceder 100 caracteres"),

    consultationFee: z
        .string()
        .optional()
        .refine((val) => {
            if (!val || val === "") return true;
            const num = parseFloat(val);
            return !isNaN(num) && num >= 0 && num <= 9999999.99;
        }, "La tarifa debe ser un número válido entre 0 y 9,999,999.99"),

    description: z
        .string()
        .max(1000, "La descripción no puede exceder 1000 caracteres")
        .optional(),

    emergencyService: z.boolean().default(false),
    homeVisit: z.boolean().default(false),
});

// Schema para información de clínica
export const clinicInfoSchema = z.object({
    clinicName: z
        .string()
        .min(2, "El nombre de la clínica debe tener al menos 2 caracteres")
        .max(255, "El nombre de la clínica no puede exceder 255 caracteres"),

    clinicAddress: z
        .string()
        .min(5, "La dirección debe tener al menos 5 caracteres")
        .max(255, "La dirección no puede exceder 255 caracteres"),

    city: z
        .string()
        .min(2, "La ciudad debe tener al menos 2 caracteres")
        .max(100, "La ciudad no puede exceder 100 caracteres"),

    latitude: z
        .string()
        .optional()
        .refine((val) => {
            if (!val || val === "") return true;
            const num = parseFloat(val);
            return !isNaN(num) && num >= -90 && num <= 90;
        }, "La latitud debe estar entre -90 y 90"),

    longitude: z
        .string()
        .optional()
        .refine((val) => {
            if (!val || val === "") return true;
            const num = parseFloat(val);
            return !isNaN(num) && num >= -180 && num <= 180;
        }, "La longitud debe estar entre -180 y 180"),
});

// Schema completo
export const vetProfileSchema = z.object({
    ...personalInfoSchema.shape,
    ...professionalInfoSchema.shape,
    ...clinicInfoSchema.shape,
});

export type VetProfileFormData = z.infer<typeof vetProfileSchema>;
export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type ProfessionalInfoData = z.infer<typeof professionalInfoSchema>;
export type ClinicInfoData = z.infer<typeof clinicInfoSchema>;