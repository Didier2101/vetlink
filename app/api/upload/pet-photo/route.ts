// app/api/upload/pet-photo/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No se encontró ningún archivo' },
                { status: 400 }
            );
        }

        // Validar tipo de archivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Tipo de archivo no permitido. Solo se permiten: JPG, PNG, WEBP' },
                { status: 400 }
            );
        }

        // Validar tamaño (5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'El archivo es demasiado grande. Máximo 5MB' },
                { status: 400 }
            );
        }

        // Crear directorio si no existe
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'pets');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (_error) {
            console.error(_error)
            // El directorio ya existe, continuar
        }

        // Generar nombre único para el archivo
        const fileExtension = file.name.split('.').pop() || 'jpg';
        const uniqueFilename = `${uuidv4()}.${fileExtension}`;
        const filepath = join(uploadDir, uniqueFilename);

        // Convertir archivo a buffer y guardarlo
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Retornar la URL pública del archivo
        const publicUrl = `/uploads/pets/${uniqueFilename}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            filename: uniqueFilename,
            size: file.size,
            type: file.type
        });

    } catch (error) {
        console.error('Error al subir archivo:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}