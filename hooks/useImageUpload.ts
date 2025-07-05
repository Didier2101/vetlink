// hooks/useImageUpload.ts
import { useState, useCallback } from 'react';

interface UploadResponse {
    success: boolean;
    url?: string;
    filename?: string;
    size?: number;
    type?: string;
    error?: string;
}

interface UseImageUploadReturn {
    uploadImage: (file: File) => Promise<UploadResponse>;
    deleteImage: (filename: string) => Promise<boolean>;
    isUploading: boolean;
    uploadError: string | null;
}

export const useImageUpload = (): UseImageUploadReturn => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const uploadImage = useCallback(async (file: File): Promise<UploadResponse> => {
        setIsUploading(true);
        setUploadError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload/pet-photo', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                setUploadError(result.error || 'Error al subir la imagen');
                return { success: false, error: result.error };
            }

            return result;
        } catch (error) {
            console.error(error)
            const errorMessage = 'Error de conexión al subir la imagen';
            setUploadError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsUploading(false);
        }
    }, []);

    const deleteImage = useCallback(async (filename: string): Promise<boolean> => {
        try {
            const response = await fetch(`/api/upload/pet-photo/delete?filename=${filename}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Error al eliminar imagen:', error);
            return false;
        }
    }, []);

    return {
        uploadImage,
        deleteImage,
        isUploading,
        uploadError,
    };
};