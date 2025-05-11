"use server"

// Archivo: /lib/auth.ts
import { cookies } from 'next/headers';
import { decrypt } from './crypto';

/**
 * Obtiene los datos de sesión del usuario actual
 * Para usar en componentes del servidor o Server Actions
 */
export async function getSession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie?.value) {
        return null;
    }

    try {
        const decryptedSession = await decrypt(sessionCookie.value);
        return JSON.parse(decryptedSession);
    } catch (error) {
        console.error('Error al obtener sesión:', error);
        return null;
    }
}

/**
 * Verifica si el usuario actual está autenticado
 * Para usar en componentes del servidor o Server Actions
 */
export async function isAuthenticated() {
    const session = await getSession();
    return !!session;
}

/**
 * Cierra la sesión del usuario actual
 * Server Action para cerrar sesión
 */
export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session');

    return {
        success: true,
        message: 'Sesión cerrada con éxito'
    };
}