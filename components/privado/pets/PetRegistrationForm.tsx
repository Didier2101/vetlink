"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTheme } from "@/components/principal/ThemeProvider";
import { ArrowRight, Weight, Calendar, Camera, Tag, Heart } from "lucide-react";
import Swal from "sweetalert2";

// Especies disponibles
const speciesOptions = [
  { value: "dog", label: "Perro" },
  { value: "cat", label: "Gato" },
  { value: "bird", label: "Ave" },
  { value: "rabbit", label: "Conejo" },
  { value: "hamster", label: "Hámster" },
  { value: "fish", label: "Pez" },
  { value: "other", label: "Otro" },
];

// Géneros disponibles
const genderOptions = [
  { value: "male", label: "Macho" },
  { value: "female", label: "Hembra" },
  { value: "unknown", label: "Desconocido" },
];

// Esquema de validación para el formulario de registro de mascota
const petRegistrationSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  plateCode: z.string().min(3, "El código de placa es obligatorio"),
  species: z.string().min(1, "Selecciona una especie"),
  breed: z.string().optional(),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  weight: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : null)),
  color: z.string().optional(),
  markings: z.string().optional(),
  microchip: z.string().optional(),
  isSterilized: z.boolean().optional(),
  photoUrl: z.string().optional(),
});

type PetRegistrationFormData = z.infer<typeof petRegistrationSchema>;

export default function PetRegistrationForm({
  initialData = null,
  ownerId = null,
}) {
  const router = useRouter();
  const { isDarkMode, theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(
    initialData?.photoUrl || null
  );

  // Si se está editando una mascota existente, usamos sus datos como valores iniciales
  const defaultValues = initialData || {
    name: "",
    plateCode: "",
    species: "",
    breed: "",
    birthDate: "",
    gender: "",
    weight: "",
    color: "",
    markings: "",
    microchip: "",
    isSterilized: false,
    photoUrl: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PetRegistrationFormData>({
    resolver: zodResolver(petRegistrationSchema),
    mode: "all",
    defaultValues,
  });

  // Observamos el cambio en el campo species para mostrar opciones específicas de razas
  const selectedSpecies = watch("species");

  // Función para cambiar la imagen
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Enviar formulario
  const onSubmit = async (data: PetRegistrationFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Enviando datos de mascota:", data);

      // Incluimos el ID del dueño si está disponible
      const petData = ownerId ? { ...data, ownerId } : data;

      // Aquí iría la llamada al servidor para guardar los datos
      const response = await fetch("/api/pets", {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Error al guardar los datos de la mascota"
        );
      }

      // Mostrar mensaje de éxito
      Swal.fire({
        title: initialData ? "¡Mascota actualizada!" : "¡Mascota registrada!",
        text: initialData
          ? "Los datos de tu mascota han sido actualizados correctamente"
          : "Tu mascota ha sido registrada correctamente",
        icon: "success",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#3085d6",
      });

      // Redireccionar después de guardar
      router.push("/app/owner/pets");
    } catch (error) {
      console.error("Error al guardar mascota:", error);

      Swal.fire({
        title: "Error",
        text:
          error.message ||
          "Ocurrió un error al guardar los datos de la mascota",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen py-12 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div
            className={`p-8 rounded-xl shadow-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h1
              className={`text-2xl font-bold mb-6 text-center ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {initialData ? "Editar Mascota" : "Registrar Nueva Mascota"}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Foto de la mascota */}
              <div
                className={`mb-6 p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-blue-50"
                }`}
              >
                <h2
                  className={`text-lg font-semibold mb-4 pb-2 border-b ${
                    isDarkMode
                      ? "text-gray-200 border-gray-600"
                      : "text-gray-700 border-blue-200"
                  }`}
                >
                  <Camera size={18} className="inline mr-2" />
                  Foto de tu mascota
                </h2>

                <div className="flex flex-col items-center justify-center">
                  {/* <div
                    className={`w-40 h-40 rounded-full mb-4 overflow-hidden flex items-center justify-center ${
                      isDarkMode ? "bg-gray-600" : "bg-gray-200"
                    }`}
                  >
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Foto de mascota"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Paw size={40} className="text-gray-400" />
                    )}
                  </div> */}

                  <label
                    className={`cursor-pointer py-2 px-4 rounded-lg ${theme.buttonBg} text-white hover:opacity-90 transition duration-300`}
                  >
                    <input
                      type="file"
                      {...register("photoUrl")}
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                    <Camera size={16} className="inline mr-2" />
                    Seleccionar foto
                  </label>
                </div>
              </div>

              {/* Información básica */}
              <div
                className={`mb-6 p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-blue-50"
                }`}
              >
                {/* <h2
                  className={`text-lg font-semibold mb-4 pb-2 border-b ${
                    isDarkMode
                      ? "text-gray-200 border-gray-600"
                      : "text-gray-700 border-blue-200"
                  }`}
                >
                  <Paw size={18} className="inline mr-2" />
                  Información básica
                </h2> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Nombre *
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Nombre de tu mascota"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Código de placa *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("plateCode")}
                        className="w-full p-3 rounded-lg border border-gray-300"
                        placeholder="Código de identificación"
                      />
                      <Tag
                        size={18}
                        className="absolute right-3 top-3.5 text-gray-400"
                      />
                    </div>
                    {errors.plateCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.plateCode.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Especie *
                    </label>
                    <select
                      {...register("species")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                    >
                      <option value="">Selecciona una especie</option>
                      {speciesOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.species && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.species.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Raza
                    </label>
                    <input
                      type="text"
                      {...register("breed")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Raza de tu mascota"
                    />
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Género
                    </label>
                    <select
                      {...register("gender")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                    >
                      <option value="">Selecciona el género</option>
                      {genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Fecha de nacimiento
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        {...register("birthDate")}
                        className="w-full p-3 rounded-lg border border-gray-300"
                      />
                      <Calendar
                        size={18}
                        className="absolute right-3 top-3.5 text-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Características físicas */}
              <div
                className={`mb-6 p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-blue-50"
                }`}
              >
                <h2
                  className={`text-lg font-semibold mb-4 pb-2 border-b ${
                    isDarkMode
                      ? "text-gray-200 border-gray-600"
                      : "text-gray-700 border-blue-200"
                  }`}
                >
                  <Heart size={18} className="inline mr-2" />
                  Características físicas
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Peso (kg)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        {...register("weight")}
                        className="w-full p-3 rounded-lg border border-gray-300"
                        placeholder="Ej: 5.2"
                      />
                      <Weight
                        size={18}
                        className="absolute right-3 top-3.5 text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Color
                    </label>
                    <input
                      type="text"
                      {...register("color")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Color principal"
                    />
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Marcas distintivas
                    </label>
                    <input
                      type="text"
                      {...register("markings")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Manchas, cicatrices, etc."
                    />
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Número de microchip
                    </label>
                    <input
                      type="text"
                      {...register("microchip")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Si tiene microchip"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isSterilized"
                      {...register("isSterilized")}
                      className="mr-2 h-5 w-5"
                    />
                    <label
                      htmlFor="isSterilized"
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Está esterilizado/a
                    </label>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className={`py-3 px-6 rounded-lg border ${
                    isDarkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  } transition duration-300`}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`py-3 px-6 rounded-lg ${theme.buttonBg} text-white flex items-center hover:opacity-90 transition duration-300 disabled:opacity-70`}
                >
                  {isSubmitting ? (
                    "Guardando..."
                  ) : (
                    <>
                      {initialData ? "Actualizar" : "Registrar"} mascota
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
