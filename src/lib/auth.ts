// src/lib/auth.ts
"use server";

import { cookies } from 'next/headers';
import { decryptEdge } from './edge-crypto';

export type SessionData = {
    id: number;
    email: string;
    isProfileComplete: boolean;
    role: string;
};

export async function getSession(): Promise<SessionData | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie?.value) {
        return null;
    }

    try {
        const decryptedSession = await decryptEdge(sessionCookie.value);
        return JSON.parse(decryptedSession) as SessionData;
    } catch (error) {
        console.error('Error al obtener sesión:', error);
        return null;
    }
}

export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return !!session;
}

export async function logout(): Promise<{ success: boolean; message: string }> {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('session');
        return {
            success: true,
            message: 'Sesión cerrada con éxito'
        };
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return {
            success: false,
            message: 'Error al cerrar sesión'
        };
    }
}