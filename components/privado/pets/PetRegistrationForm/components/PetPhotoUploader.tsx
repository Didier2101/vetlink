"use client";
import React, { useRef } from "react";
import { FieldError } from "react-hook-form";
import { Camera, PawPrint, AlertCircle, X } from "lucide-react";
import Image from "next/image";

interface PetPhotoUploaderProps {
    error?: FieldError;
    label: string;
    selectedImageUrl?: string | null;
    isUploading?: boolean;
    uploadError?: string | null;
    selectedFile?: File | null;
    handlePhotoChange: (file: File) => Promise<void>;
    handleRemovePhoto: () => Promise<void>;
}

export const PetPhotoUploader = ({
    error,
    label,
    selectedImageUrl,
    isUploading,
    uploadError,
    selectedFile,
    handlePhotoChange,
    handleRemovePhoto,
}: PetPhotoUploaderProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Validaciones
            const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert('Solo se permiten imágenes JPG, PNG o WEBP');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert("La imagen no puede superar los 5MB");
                return;
            }

            try {
                await handlePhotoChange(file);
            } catch (error) {
                console.error("Error al subir la imagen:", error);
                alert("Ocurrió un error al subir la imagen");
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex flex-col items-center">
                <label className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
                    {label}
                </label>

                <div className="relative group mb-4">
                    {/* Contenedor de imagen */}
                    <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-4 border-white dark:border-gray-600 shadow-2xl overflow-hidden transition-all duration-300 group-hover:shadow-3xl group-hover:scale-105">
                        {isUploading ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                            </div>
                        ) : selectedImageUrl ? (
                            <Image
                                fill
                                src={selectedImageUrl}
                                alt="Vista previa"
                                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <PawPrint
                                    className="text-gray-400 dark:text-gray-500 transition-all duration-300 group-hover:text-teal-500"
                                    size={48}
                                />
                            </div>
                        )}
                    </div>

                    {/* Botón de eliminar */}
                    {selectedImageUrl && !isUploading && (
                        <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="absolute z-50 top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md p-1 transition-all duration-200 transform translate-x-1/4 -translate-y-1/4"
                        >
                            <X size={16} />
                        </button>
                    )}

                    {/* Botón de subir */}
                    {!selectedImageUrl && !isUploading && (
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            className="absolute -bottom-2 -right-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 p-3 rounded-full shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                        >
                            <Camera className="text-white" size={20} />
                        </button>
                    )}

                    {/* Input file oculto */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Mensajes de estado */}
                {isUploading && (
                    <div className="text-center">
                        <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
                            📤 Subiendo imagen...
                        </p>
                    </div>
                )}

                {selectedFile && selectedImageUrl && !isUploading && (
                    <div className="text-center space-y-2">
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            ✅ Imagen subida correctamente
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedFile.name} → {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                    </div>
                )}

                {!selectedImageUrl && !isUploading && (
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Haz clic en la cámara para subir una foto
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            Máximo 5MB • JPG, PNG, WEBP
                        </p>
                    </div>
                )}

                {/* Mensajes de error */}
                {uploadError && (
                    <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2 text-center">
                            <AlertCircle size={16} />
                            {uploadError}
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2 text-center">
                            <AlertCircle size={16} />
                            {error.message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};