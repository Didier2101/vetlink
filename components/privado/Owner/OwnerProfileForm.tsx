"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTheme } from "@/components/principal/ThemeProvider";
import { ArrowRight, User, Phone, Map, Calendar, Shield } from "lucide-react";
import Swal from "sweetalert2";

// Esquema de validación para el formulario de perfil del dueño
const ownerProfileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  dni: z.string().optional(),
  phone: z.string().min(5, "El teléfono es obligatorio"),
  secondaryPhone: z.string().optional(),
  city: z.string().min(2, "La ciudad es obligatoria"),
  neighborhood: z.string().min(2, "El barrio/localidad es obligatorio"),
  address: z.string().optional(),
  birthDate: z.string().optional(),
  emergencyContact: z.string().optional(),
});

type OwnerProfileFormData = z.infer<typeof ownerProfileSchema>;

export default function OwnerProfileForm({ initialData = null }) {
  const router = useRouter();
  const { isDarkMode, theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OwnerProfileFormData>({
    resolver: zodResolver(ownerProfileSchema),
    mode: "all",
    defaultValues: initialData || {
      name: "",
      lastName: "",
      dni: "",
      phone: "",
      secondaryPhone: "",
      city: "",
      neighborhood: "",
      address: "",
      birthDate: "",
      emergencyContact: "",
    },
  });

  // Enviar formulario
  const onSubmit = async (data: OwnerProfileFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Enviando datos:", data);

      // Aquí iría la llamada al servidor para guardar los datos
      const response = await fetch("/api/profile/owner", {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al guardar los datos");
      }

      // Mostrar mensaje de éxito
      Swal.fire({
        title: "¡Perfil actualizado!",
        text: "Tus datos han sido guardados correctamente",
        icon: "success",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#3085d6",
      });

      // Redireccionar si es nuevo registro
      if (!initialData) {
        router.push("/app/owner/dashboard");
      }
    } catch (error) {
      console.error("Error al guardar perfil:", error);

      Swal.fire({
        title: "Error",
        text: error.message || "Ocurrió un error al guardar los datos",
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
              Completa tu Perfil
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Datos personales */}
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
                  <User size={18} className="inline mr-2" />
                  Información Personal
                </h2>

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
                      placeholder="Tu nombre"
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
                      Apellido *
                    </label>
                    <input
                      type="text"
                      {...register("lastName")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Tu apellido"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      DNI/Cédula
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("dni")}
                        className="w-full p-3 rounded-lg border border-gray-300"
                        placeholder="Opcional"
                      />
                      <Shield
                        size={18}
                        className="absolute right-3 top-3.5 text-gray-400"
                      />
                    </div>
                    {errors.dni && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dni.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Fecha de Nacimiento
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

              {/* Contacto */}
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
                  <Phone size={18} className="inline mr-2" />
                  Información de Contacto
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Ej: +34 600 000 000"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Teléfono secundario
                    </label>
                    <input
                      type="tel"
                      {...register("secondaryPhone")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Opcional"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Contacto de emergencia
                    </label>
                    <input
                      type="text"
                      {...register("emergencyContact")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Nombre y teléfono de contacto"
                    />
                  </div>
                </div>
              </div>

              {/* Ubicación */}
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
                  <Map size={18} className="inline mr-2" />
                  Ubicación
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      {...register("city")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Tu ciudad"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Barrio/Localidad *
                    </label>
                    <input
                      type="text"
                      {...register("neighborhood")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Tu barrio o localidad"
                    />
                    {errors.neighborhood && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.neighborhood.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className={`block mb-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Dirección completa
                    </label>
                    <input
                      type="text"
                      {...register("address")}
                      className="w-full p-3 rounded-lg border border-gray-300"
                      placeholder="Calle, número, piso, etc."
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition duration-300 font-bold
                  ${theme.buttonBg} text-white hover:opacity-90
                  ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
                `}
              >
                {isSubmitting ? (
                  "Guardando..."
                ) : (
                  <>
                    <span>Guardar perfil</span>
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
