import { z } from "zod";

export const petSchema = z.object({
    ownerId: z.number(),
    // ==================== DATOS BÁSICOS ====================
    photo: z.string().optional().or(z.literal("")),
    name: z.string()
        .min(2, "Nombre muy corto (mín. 2 caracteres)")
        .max(50, "Nombre muy largo (máx. 50 caracteres)"),

    species: z.enum(["dog", "cat"], {
        errorMap: () => ({ message: "Selecciona una especie válida" })
    }),

    breed: z.string()
        .min(2, "Raza muy corta (mín. 2 caracteres)")
        .max(50, "Raza muy larga (máx. 50 caracteres)"),

    sex: z.enum(["male", "female"], {
        errorMap: () => ({ message: "Selecciona un sexo válido" })
    }),

    birthDate: z.coerce.date()
        .max(new Date(), "La fecha no puede ser futura"),

    color: z.string()
        .min(2, "Color muy corto (mín. 2 caracteres)")
        .max(30, "Color muy largo (máx. 30 caracteres)"),

    // ==================== IDENTIFICACIÓN ====================
    microchipNumber: z.string()
        .max(20, "Máximo 20 caracteres")
        .regex(/^[a-zA-Z0-9]*$/, "Solo letras y números")
        .optional(),

    tattooCode: z.string()
        .max(20, "Máximo 20 caracteres")
        .optional(),

    passportNumber: z.string()
        .max(30, "Máximo 30 caracteres")
        .optional(),



    // ==================== INFORMACIÓN MÉDICA ====================
    sterilized: z.boolean(),

    allergies: z.string()
        .max(500, "Máximo 500 caracteres")
        .optional(),

    chronicDiseases: z.string()
        .max(500, "Máximo 500 caracteres")
        .optional(),

    disabilities: z.string()
        .max(500, "Máximo 500 caracteres")
        .optional(),

    bloodType: z.string()
        .max(20, "Máximo 20 caracteres")
        .optional(),

    // ==================== COMPORTAMIENTO ====================
    behaviorNotes: z.string()
        .max(1000, "Máximo 1000 caracteres")
        .optional(),

    activityLevel: z.enum(["low", "medium", "high"], {
        required_error: "Por favor selecciona un nivel de actividad",
    }),

    aggressive: z.enum(["none", "mild", "moderate", "severe"], {
        required_error: "Por favor selecciona un nivel de agresividad",
    }),


    // ==================== CUIDADOS ====================
    feedingSchedule: z.string()
        .max(500, "Máximo 500 caracteres")
        .optional(),

    diet: z.enum(["commercial", "natural", "barf", "mixed", "other"], {
        required_error: "Por favor selecciona un tipo de dieta",
    }),

    favoriteFood: z
        .string()
        .min(1, "Por favor indica una comida favorita")
        .max(100, "Debe tener menos de 100 caracteres"),


    // ==================== DOCUMENTOS ====================
    // documents: z.array(z.string()).optional(), //
});

export type PetFormData = z.infer<typeof petSchema>;

