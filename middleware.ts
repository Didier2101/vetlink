// Archivo: /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './src/lib/crypto';

// Rutas que requieren autenticación
const protectedRoutes = [
    '/perfil', // Protege todas las rutas bajo /perfil
    '/perfil/dueno',
    '/perfil/veterinario',
    '/perfil/clinica',
    '/perfil/tienda'
];

// Rutas de autenticación (login/registro)
const authRoutes = [
    '/login',
    '/register' // Asegúrate que coincida con tu ruta real de registro
];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Obtener la cookie de sesión
    const sessionCookie = request.cookies.get('session')?.value;

    interface SessionData {
        userId: string;
        email: string;
        category: string;
    }

    let session: SessionData | null = null;

    // Intentar desencriptar la sesión si existe
    if (sessionCookie) {
        try {
            const decryptedData = await decrypt(sessionCookie);
            session = JSON.parse(decryptedData);
        } catch (error) {
            console.error('Error al desencriptar la sesión:', error);
            // Eliminar cookie inválida
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('session');
            return response;
        }
    }

    // Verificar si es una ruta protegida
    const isProtectedRoute = protectedRoutes.some(route =>
        path.startsWith(route)
    );

    // Verificar si es una ruta de autenticación
    const isAuthRoute = authRoutes.some(route =>
        path.startsWith(route)
    );

    // Redirecciones para rutas protegidas
    if (isProtectedRoute) {
        if (!session) {
            // Redirigir a login con callback URL
            const url = new URL('/login', request.url);
            url.searchParams.set('callbackUrl', path);
            return NextResponse.redirect(url);
        }

        // Aquí puedes agregar lógica adicional de roles si es necesario
        // Por ejemplo, verificar si el usuario tiene acceso a /perfil/dueno
    }

    // Redirección si ya está autenticado y accede a login/registro
    if (isAuthRoute && session) {
        // Redirigir a la página principal según el rol
        const redirectPath = session.category ? `/${session.category}` : '/';
        return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    return NextResponse.next();
}

// Configuración de las rutas que activan el middleware
export const config = {
    matcher: [
        '/perfil/:path*', // Todas las rutas bajo /perfil
        '/login',
        '/register'
    ]
};