"use client";
import { petSchema } from "@/schemas/pets/pet";
import type { z } from "zod";

type PetFormData = z.infer<typeof petSchema>;

import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  PawPrint,
  ChevronRight,
  ChevronLeft,
  Camera,
  AlertCircle,
  X,
  Info,
  User,
  HeartPulse,
  Activity,
  Bone,
} from "lucide-react";
import Image from "next/image";
import { generatePetId } from "@/src/utils/generatePetId";
import { useImageUpload } from "@/app/hooks/useImageUpload";
import Swal from "sweetalert2";
import { createPet } from "@/app/actions/pets";
import { useRouter } from "next/navigation";

interface PetProps {
  ownerId: number;
}

const PetRegistrationForm = ({ ownerId }: PetProps) => {
  // console.log(session);
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("basic");
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedImageFilename, setSelectedImageFilename] = useState<
    string | null
  >(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 🔥 Hook personalizado para upload
  const { uploadImage, deleteImage, isUploading, uploadError } =
    useImageUpload();
  // const [uploadingDocuments, setUploadingDocuments] = useState(false);

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
  });

  const sectionFields: Record<string, (keyof PetFormData)[]> = {
    basic: [
      "name",
      "species",
      "breed",
      "photo",
      "sex",
      "codeVetlink",
      "birthDate",
      "color",
    ],
    identification: [],
    medical: ["sterilized"],
    behavior: ["activityLevel", "aggressive"],
    care: ["diet", "favoriteFood"],
  };

  // Generar ID automáticamente al cargar el formulario
  useEffect(() => {
    const fullCode = generatePetId();
    const numberPart = fullCode.slice(2);
    setValue("codeVetlink", numberPart);
    // 🔥 Agregar ownerId desde la sesión
    if (ownerId) {
      setValue("ownerId", ownerId);
    }
  }, [setValue, ownerId]);

  const onSubmit = async (data: PetFormData) => {
    console.log(data)
    try {
      const result = await createPet(data);

      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: "Mascota creada exitosamente",
          text: result.message,
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        router.push("/owner/dashboard");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error al crear la mascota",
          text: result.message,
        });
        // Redirigir específicamente para el caso de límite de mascotas
        if (result.message.includes("Actualiza a 'Mi Manada Pro'")) {
          setTimeout(() => {
            router.push("/owner/dashboard");
          }, 2000); // Redirige después de 2 segundos
        }
      }
    } catch (error) {
      console.error("Error al crear la mascota:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error la mascota. Por favor, intenta nuevamente.",
      });
    }
  };

  // 🔥 Nueva función para manejar el cambio de foto
  const handlePhotoChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];

        // Validar tamaño máximo (5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(
            "La imagen es demasiado grande. El tamaño máximo permitido es 5MB."
          );
          return;
        }

        setSelectedFile(file);

        // Subir imagen al servidor
        const result = await uploadImage(file);

        if (result.success && result.url && result.filename) {
          setSelectedImageUrl(result.url);
          setSelectedImageFilename(result.filename);
          // 🔥 Actualizar el valor del formulario con la URL
          setValue("photo", result.url);
        } else {
          alert(result.error || "Error al subir la imagen");
          setSelectedFile(null);
        }
      }
    },
    [uploadImage, setValue]
  );

  // 🔥 Nueva función para remover foto
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

    // Limpiar el input file
    const photoInput = document.getElementById(
      "photo-upload"
    ) as HTMLInputElement;
    if (photoInput) {
      photoInput.value = "";
    }
  }, [selectedImageFilename, deleteImage, setValue]);

  const sections = [
    {
      id: "basic",
      title: "Datos Básicos",
      icon: <PawPrint size={18} />,
      color: "text-orange-500",
    },
    {
      id: "identification",
      title: "Identificación",
      icon: <User size={18} />,
      color: "text-blue-500",
    },
    {
      id: "medical",
      title: "Información Médica",
      icon: <HeartPulse size={18} />,
      color: "text-red-500",
    },
    {
      id: "behavior",
      title: "Comportamiento",
      icon: <Activity size={18} />,
      color: "text-purple-500",
    },
    {
      id: "care",
      title: "Cuidados",
      icon: <Bone size={18} />,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Navegación por secciones (sidebar en desktop) */}
      <div className="w-full lg:w-64 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 lg:sticky lg:top-28 h-fit">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <PawPrint className="text-teal-500" /> Secciones
        </h2>
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeSection === section.id
                ? "bg-teal-50 dark:bg-gray-700 text-teal-600 dark:text-teal-400 font-medium"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
            >
              <span className={section.color}>{section.icon}</span>
              <span>{section.title}</span>
            </button>
          ))}
        </nav>
        <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-900/30">
          <div className="flex items-center gap-3">
            <Info
              size={18}
              className="text-teal-600 dark:text-teal-400 flex-shrink-0"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              El código de registro{" "}
              <span className="font-semibold text-teal-700 dark:text-teal-300">
                Vetlink
              </span>{" "}
              es un identificador único para tu mascota dentro de la plataforma.
            </span>
          </div>
        </div>
      </div>

      {/* Formulario principal */}
      <div className="h-[calc(100vh-130px)] overflow-y-auto flex-1 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Sección: Datos Básicos */}
          {activeSection === "basic" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <PawPrint className="text-orange-500" size={20} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Datos Básicos
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Foto de perfil */}
                {/* 🔥 Foto de perfil actualizada */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border  border-gray-200 dark:border-gray-700 shadow-lg">
                  <div className="flex flex-col items-center">
                    <label className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
                      📸 Foto de perfil
                    </label>

                    <div className="relative group mb-4">
                      {/* Contenedor de la imagen (con overflow-hidden) */}
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

                      {/* Botón de eliminar (ahora fuera del contenedor con overflow-hidden) */}
                      {selectedImageUrl && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute z-50 top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md p-1 transition-all duration-200 transform translate-x-1/4 -translate-y-1/4"
                        >
                          <X size={16} />
                        </button>
                      )}

                      {/* Resto de tu código (cámara de upload, etc.) */}
                      {!selectedImageUrl && (
                        <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 p-3 rounded-full shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                          <Camera className="text-white" size={20} />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="photo-upload"
                            onChange={handlePhotoChange}
                          />
                        </label>
                      )}
                    </div>

                    {/* 🔥 Estados actualizados */}
                    {isUploading ? (
                      <div className="text-center">
                        <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
                          📤 Subiendo imagen...
                        </p>
                      </div>
                    ) : selectedFile && selectedImageUrl ? (
                      <div className="text-center space-y-2">
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          ✅ Imagen subida correctamente
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedFile.name} →{" "}
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Haz clic en la cámara para subir una foto
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Máximo 5MB • JPG, PNG, WEBP
                        </p>
                      </div>
                    )}

                    {/* 🔥 Mostrar errores de upload */}
                    {uploadError && (
                      <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2 text-center">
                          <AlertCircle size={16} />
                          {uploadError}
                        </p>
                      </div>
                    )}

                    {errors.photo && (
                      <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2 text-center">
                          <AlertCircle size={16} />
                          {errors.photo.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Código de Placa */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-lg">
                  <label className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    🏷️ Código de placa
                    <span className="text-red-500 text-xl">*</span>
                  </label>

                  <div className="relative">
                    <div className="flex rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 focus-within:border-teal-500 transition-all duration-300">
                      <div className="w-16 flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold text-lg shadow-inner">
                        VT
                      </div>
                      <input
                        {...register("codeVetlink")}
                        maxLength={6}
                        className={`flex-1 px-4 py-4 text-lg font-medium bg-transparent text-gray-900 dark:text-white focus:outline-none placeholder-gray-400 ${errors.codeVetlink ? "text-red-600" : ""
                          }`}
                        placeholder="826736"
                      />
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
                    <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                      💡 <strong>Este código único</strong> identifica a tu
                      mascota en la plataforma. Si adquieres una placa, este
                      será el número grabado en ella.
                    </p>
                  </div>

                  {errors.codeVetlink && (
                    <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                        <AlertCircle size={16} />
                        {errors.codeVetlink.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre de la mascota <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: Max"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Especie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Especie <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("species")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.species
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                  >
                    <option value="">Seleccionar</option>
                    <option value="dog">Perro</option>
                    <option value="cat">Gato</option>
                    <option value="bird">Ave</option>
                    <option value="other">Otro</option>
                  </select>
                  {errors.species && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.species.message}
                    </p>
                  )}
                </div>

                {/* Raza */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Raza <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("breed")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.breed
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: Labrador, Siames, etc."
                  />
                  {errors.breed && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.breed.message}
                    </p>
                  )}
                </div>

                {/* Sexo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sexo <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("sex")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.sex
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                  >
                    <option value="">Seleccionar</option>
                    <option value="male">Macho</option>
                    <option value="female">Hembra</option>
                  </select>
                  {errors.sex && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.sex.message}
                    </p>
                  )}
                </div>

                {/* Fecha de nacimiento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha de nacimiento (aproximada)
                  </label>
                  <input
                    type="date"
                    {...register("birthDate")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.birthDate
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                  />
                  {errors.birthDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color principal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("color")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.color
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: Negro, Blanco, etc."
                  />
                  {errors.color && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.color.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sección: Identificación */}
          {activeSection === "identification" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-blue-500" size={20} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Identificación
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Microchip */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Número de microchip(Opcional)
                  </label>
                  <input
                    type="text"
                    {...register("microchipNumber")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.microchipNumber
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: 985120001234567"
                  />
                  {errors.microchipNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.microchipNumber.message}
                    </p>
                  )}
                </div>

                {/* Tatuaje */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Código de tatuaje(Opcional)
                  </label>
                  <input
                    type="text"
                    {...register("tattooCode")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.tattooCode
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: ABC123"
                  />
                  {errors.tattooCode && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.tattooCode.message}
                    </p>
                  )}
                </div>

                {/* Pasaporte */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Número de pasaporte(Opcional)
                  </label>
                  <input
                    type="text"
                    {...register("passportNumber")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.passportNumber
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: PETP12345678"
                  />
                  {errors.passportNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.passportNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sección: Información Médica */}
          {activeSection === "medical" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <HeartPulse className="text-red-500" size={20} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Información Médica
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Esterilizado */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <input
                      type="checkbox"
                      {...register("sterilized")}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-teal-500"
                    />
                    <span>¿Está esterilizado / castrado ? </span>
                  </label>
                </div>

                {/* Alergias */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Alergias conocidas(Opcional)
                  </label>
                  <textarea
                    {...register("allergies")}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.allergies
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: Alergia a ciertos medicamentos, alimentos, etc."
                  />
                  {errors.allergies && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.allergies.message}
                    </p>
                  )}
                </div>

                {/* Enfermedades crónicas */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enfermedades crónicas(Opcional)
                  </label>
                  <textarea
                    {...register("chronicDiseases")}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.chronicDiseases
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: Diabetes, artritis, etc."
                  />
                  {errors.chronicDiseases && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.chronicDiseases.message}
                    </p>
                  )}
                </div>

                {/* Discapacidades */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Discapacidades o condiciones especiales(Opcional)
                  </label>
                  <textarea
                    {...register("disabilities")}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.disabilities
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: Ceguera, sordera, amputación, etc."
                  />
                  {errors.disabilities && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.disabilities.message}
                    </p>
                  )}
                </div>

                {/* Tipo de sangre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de sangre(si se conoce)(Opcional)
                  </label>
                  <input
                    type="text"
                    {...register("bloodType")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.bloodType
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: DEA 1.1 positivo"
                  />
                  {errors.bloodType && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.bloodType.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sección: Comportamiento */}
          {activeSection === "behavior" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="text-purple-500" size={20} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Comportamiento
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notas de comportamiento */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Observaciones de comportamiento(Opcional)
                  </label>
                  <textarea
                    {...register("behaviorNotes")}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.behaviorNotes
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: Es tímido con extraños, le gusta jugar con pelotas, etc."
                  />
                  {errors.behaviorNotes && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.behaviorNotes.message}
                    </p>
                  )}
                </div>

                {/* Nivel de actividad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nivel de actividad
                  </label>
                  <select
                    {...register("activityLevel")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.activityLevel
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option value="low">Baja</option>
                    <option value="medium">Mediana</option>
                    <option value="high">Alta</option>
                  </select>
                  {errors.activityLevel && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.activityLevel.message}
                    </p>
                  )}
                </div>

                {/* Agresividad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ¿Presenta agresividad ?
                  </label>
                  <select
                    {...register("aggressive")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.aggressive
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option value="none">Ninguna</option>
                    <option value="mild">Leve</option>
                    <option value="moderate">Moderada</option>
                    <option value="severe">Severa</option>
                  </select>
                  {errors.aggressive && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.aggressive.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sección: Cuidados */}
          {activeSection === "care" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Bone className="text-amber-500" size={20} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Cuidados y Alimentación
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Horario de alimentación */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Horario de alimentación
                  </label>
                  <textarea
                    {...register("feedingSchedule")}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.feedingSchedule
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                    placeholder="Ej: 2 veces al día - 8am y 6pm"
                  />
                  {errors.feedingSchedule && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.feedingSchedule.message}
                    </p>
                  )}
                </div>

                {/* Tipo de dieta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de dieta
                  </label>
                  <select
                    {...register("diet")}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.diet
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                  >
                    <option value="" disabled>
                      {" "}
                      Seleccionar{" "}
                    </option>
                    <option value="commercial"> Comercial(croquetas) </option>
                    <option value="natural"> Natural(casera) </option>
                    <option value="barf"> BARF(dieta cruda) </option>
                    <option value="mixed"> Mixta </option>
                    <option value="other"> Otra </option>
                  </select>
                  {errors.diet && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.diet.message}
                    </p>
                  )}
                </div>

                {/* Comida favorita */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Comida favorita
                  </label>
                  <input
                    type="text"
                    {...register("favoriteFood")}
                    placeholder="Ej: Pollo cocido, croquetas de salmón, etc."
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.favoriteFood
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                  />
                  {errors.favoriteFood && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.favoriteFood.message}
                    </p>
                  )}
                </div>

                {/* Próxima visita al vet */}
              </div>
            </div>
          )}
        </form>

        {/* Navegación entre secciones - Ahora fuera del formulario */}
        <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
          {/* Botón Anterior */}
          {activeSection !== sections[0].id && (
            <button
              type="button"
              onClick={() => {
                const currentIndex = sections.findIndex(
                  (s) => s.id === activeSection
                );
                setActiveSection(sections[currentIndex - 1].id);
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              <ChevronLeft size={18} />
              Anterior
            </button>
          )}

          {/* Espacio para mantener alineación cuando no hay botón anterior */}
          {activeSection === sections[0].id && <div></div>}

          {/* Botón Siguiente/Guardar */}
          {activeSection !== sections[sections.length - 1].id ? (
            <button
              type="button"
              onClick={async () => {
                const currentFields = sectionFields[activeSection];

                const valid = await trigger(currentFields);
                if (!valid) return;
                const currentIndex = sections.findIndex(
                  (s) => s.id === activeSection
                );
                setActiveSection(sections[currentIndex + 1].id);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors ml-auto"
            >
              Siguiente
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              type="submit"
              onClick={() => handleSubmit(onSubmit)()}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-70 ml-auto"
            >
              {isSubmitting ? "Guardando..." : "Guardar mascota"}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetRegistrationForm;
