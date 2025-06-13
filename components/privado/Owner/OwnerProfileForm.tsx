// src/components/forms/OwnerProfileForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OwnerProfileFormData,
  ownerProfileSchema,
} from "@/schemas/owner/ownerProfileSchema";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Loading from "@/src/ui/Loading";
import { useState } from "react";
import { User, Phone, MapPin, AlertTriangle } from "lucide-react";
import { completeOwnerProfile } from "@/app/actions/completeOwnerProfile";
import { Session } from "@/types/typesSession";

interface PrivateHeaderProps {
  session: Session;
}

const OwnerProfileForm: React.FC<PrivateHeaderProps> = ({ session }) => {
  // console.log("Session data:", session);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OwnerProfileFormData>({
    resolver: zodResolver(ownerProfileSchema),
    defaultValues: {
      userId: session.id,
      name: "",
      lastName: "",
      phone: "",
      secondaryPhone: "",
      city: "",
      neighborhood: "",
      address: "",
    },
  });

  const onSubmit = async (data: OwnerProfileFormData) => {
    console.log("Form data to submit:", data);
    try {
      const result = await completeOwnerProfile(data);
      console.log("result", result)

      if (result.result) {
        await Swal.fire({
          icon: "success",
          title: "Perfil completado",
          text: "Tu perfil de propietario se ha guardado correctamente",
          timer: 2000,
          showConfirmButton: false,
        });

        router.push("/owner/dashboard");
        setIsLoading(false);
      } else if (result.message) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
        });
      }
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al guardar el perfil. Por favor intenta nuevamente.",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (

    <div className="mt-10 md:mt-0">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Completa tu Perfil
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Completa tu información para acceder a todas las funciones
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Información Personal
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre *
                </label>
                <input
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Ingresa tu nombre"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Apellido */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Apellido *
                </label>
                <input
                  {...register("lastName")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Ingresa tu apellido"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-600" />
              Información de Contacto
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Teléfono *
                </label>
                <input
                  {...register("phone")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Ej: +57 300 123 4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Teléfono secundario */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Teléfono secundario
                  <span className="text-gray-500 text-xs ml-1">
                    (opcional)
                  </span>
                </label>
                <input
                  {...register("secondaryPhone")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Teléfono alternativo"
                />
              </div>

              {/* Empty div to keep 3 columns consistent */}
            </div>
          </div>

          {/* Location Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              Ubicación
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Ciudad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ciudad *
                </label>
                <input
                  {...register("city")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Ej: Bogotá, Medellín"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Barrio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Barrio / Localidad *
                </label>
                <input
                  {...register("neighborhood")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Ej: Chapinero, El Poblado"
                />
                {errors.neighborhood && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {errors.neighborhood.message}
                  </p>
                )}
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dirección exacta
                  <span className="text-gray-500 text-xs ml-1">
                    (opcional)
                  </span>
                </label>
                <input
                  {...register("address")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Ej: Calle 123 #45-67"
                />
              </div>
            </div>
          </div>


          {/* Root Error */}
          {errors.root && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {errors.root.message}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  Guardar Perfil
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default OwnerProfileForm;
