// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptEdge } from './src/lib/edge-crypto';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const protectedPaths = ['/owner', '/dashboard', '/app'];

    if (!protectedPaths.some(p => path.startsWith(p))) {
        return NextResponse.next();
    }

    const sessionCookie = request.cookies.get('session');
    if (!sessionCookie?.value) {
        return NextResponse.redirect(new URL('/', request.url));
    }


    try {
        const decrypted = await decryptEdge(sessionCookie.value);

        const session = JSON.parse(decrypted);

        if (!session?.id) {
            throw new Error('Invalid session data');
        }

        return NextResponse.next();
    } catch {
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('session');
        return response;
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};