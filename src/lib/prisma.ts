// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Esto es para evitar crear múltiples instancias en desarrollo (hot-reload)
const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

// Reutiliza una instancia existente o crea una nueva
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'], // Puedes quitar esto en producción
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
