// Función para convertir archivo a base64
export const convertirArchivoABase64 = (archivo: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Error al leer el archivo'));
            }
        };

        reader.onerror = () => {
            reject(new Error('Error al leer el archivo'));
        };

        reader.readAsDataURL(archivo);
    });
};

// Función para convertir múltiples archivos a base64
export const convertirArchivosABase64 = async (archivos: FileList): Promise<string[]> => {
    const promesas = Array.from(archivos).map(archivo => convertirArchivoABase64(archivo));
    return Promise.all(promesas);
};

// Función para validar tamaño de archivo (en MB)
export const validarTamañoArchivo = (archivo: File, tamañoMaxMB: number = 5): boolean => {
    const tamañoMaxBytes = tamañoMaxMB * 1024 * 1024;
    return archivo.size <= tamañoMaxBytes;
};

// Función para validar tipo de archivo
export const validarTipoArchivo = (archivo: File, tiposPermitidos: string[]): boolean => {
    return tiposPermitidos.some(tipo => archivo.type.includes(tipo));
};

// Función para redimensionar imagen si es necesario
export const redimensionarImagen = (archivo: File, maxWidth: number = 800, maxHeight: number = 600, calidad: number = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            // Calcular nuevas dimensiones manteniendo la proporción
            let { width, height } = img;

            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            // Dibujar la imagen redimensionada
            ctx?.drawImage(img, 0, 0, width, height);

            // Convertir a base64
            const base64 = canvas.toDataURL('image/jpeg', calidad);
            resolve(base64);
        };

        img.onerror = () => reject(new Error('Error al cargar la imagen'));
        img.src = URL.createObjectURL(archivo);
    });
};