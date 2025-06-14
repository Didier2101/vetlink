"use client"

import { useState, useCallback, } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createPet } from "@/app/actions/pets";
import { PetFormData, petSchema } from "@/schemas/pets/pet";
import { useImageUpload } from "@/app/hooks/useImageUpload";

const usePetForm = (ownerId: number) => {

    const router = useRouter();
    const [activeSection, setActiveSection] = useState("basic");

    // Image upload state
    const { uploadImage, deleteImage, isUploading, uploadError } = useImageUpload();
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [selectedImageFilename, setSelectedImageFilename] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Form setup
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PetFormData>({
        resolver: zodResolver(petSchema),
        mode: "onChange",
        defaultValues: {
            ownerId: ownerId,
        }
    });

    const sectionFields: Record<string, (keyof PetFormData)[]> = {
        basic: ["name", "species", "breed", "photo", "sex", "birthDate", "color"],
        identification: [],
        medical: ["sterilized"],
        behavior: ["activityLevel", "aggressive"],
        care: ["diet", "favoriteFood"],
    };

    const sections = [
        { id: "basic", title: "Datos Básicos", icon: "PawPrint", color: "text-orange-500" },
        { id: "identification", title: "Identificación", icon: "User", color: "text-blue-500" },
        { id: "medical", title: "Información Médica", icon: "HeartPulse", color: "text-red-500" },
        { id: "behavior", title: "Comportamiento", icon: "Activity", color: "text-purple-500" },
        { id: "care", title: "Cuidados", icon: "Bone", color: "text-amber-500" },
    ];

    const onSubmit = async (data: PetFormData) => {
        console.log("envia", data);
        try {
            const result = await createPet(data);

            if (result.success) {
                await Swal.fire({
                    icon: "success",
                    title: "Mascota creada exitosamente",
                    html: `
            <div class="text-center">
              <p>${result.message}</p>
              <p class="mt-2 font-bold text-lg">
                Código VetLink: <span class="text-teal-600">${result.code}</span>
              </p>
            </div>
          `,
                    timer: 10000,
                    showConfirmButton: false,
                    background: '#f8fafc',
                    backdrop: `
            rgba(0,0,0,0.5)
            url("/images/paw-print.png")
            center top
            no-repeat
          `
                });
                reset();
                router.push("/owner/dashboard");
            } else {
                await Swal.fire({
                    icon: "error",
                    title: "Error al crear la mascota",
                    text: result.message,
                });
                if (result.message.includes("Actualiza a 'Mi Manada Pro'")) {
                    setTimeout(() => {
                        router.push("/owner/dashboard");
                    }, 10000);
                }
            }
        } catch (error) {
            console.error("Error al crear la mascota:", error);
            await Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error al registrar la mascota. Por favor, intenta nuevamente.",
            });
        }
    };

    // 🔥 Función para manejar el cambio de foto
    const handlePhotoChange = useCallback(
        async (file: File) => {
            // Validar tamaño máximo (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("La imagen es demasiado grande. El tamaño máximo permitido es 5MB.");
                return;
            }

            setSelectedFile(file);

            // Subir imagen al servidor
            const result = await uploadImage(file);

            if (result.success && result.url && result.filename) {
                setSelectedImageUrl(result.url);
                setSelectedImageFilename(result.filename);
                // 🔥 CLAVE: Actualizar el valor del formulario con la URL
                setValue("photo", result.url);
            } else {
                alert(result.error || "Error al subir la imagen");
                setSelectedFile(null);
            }
        },
        [uploadImage, setValue]
    );

    // 🔥 Función para remover foto - CORREGIDA con limpieza del input
    const handleRemovePhoto = useCallback(async () => {
        // Eliminar archivo del servidor si existe
        if (selectedImageFilename) {
            await deleteImage(selectedImageFilename);
        }

        // Limpiar estados
        setSelectedFile(null);
        setSelectedImageUrl(null);
        setSelectedImageFilename(null);
        setValue("photo", "");

        // 🔥 AGREGADO: Limpiar cualquier input file que pueda existir
        // Nota: Como usamos useRef en el componente, esto es opcional pero lo mantengo por compatibilidad
        const inputs = document.querySelectorAll('input[type="file"]');
        inputs.forEach((input) => {
            if (input instanceof HTMLInputElement) {
                input.value = "";
            }
        });
    }, [selectedImageFilename, deleteImage, setValue]);

    return {
        activeSection,
        sections,
        register,
        errors,
        isSubmitting,
        selectedImageUrl,
        isUploading,
        uploadError,
        selectedFile,
        handlePhotoChange,
        handleRemovePhoto,
        handleSubmit,
        onSubmit,
        trigger,
        sectionFields,
        setActiveSection,
    };
}

export default usePetForm