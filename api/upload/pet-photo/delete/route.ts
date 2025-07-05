// app/api/upload/pet-photo/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');

        if (!filename) {
            return NextResponse.json(
                { error: 'Nombre de archivo requerido' },
                { status: 400 }
            );
        }

        // Construir ruta del archivo
        const filepath = join(process.cwd(), 'public', 'uploads', 'pets', filename);

        try {
            await unlink(filepath);
            return NextResponse.json({
                success: true,
                message: 'Archivo eliminado correctamente'
            });
        } catch (_error) {
            console.error(_error)
            // El archivo no existe o ya fue eliminado
            return NextResponse.json({
                success: true,
                message: 'El archivo no existe o ya fue eliminado'
            });
        }

    } catch (error) {
        console.error('Error al eliminar archivo:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}