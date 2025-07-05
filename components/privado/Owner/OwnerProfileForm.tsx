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
import { User, Phone, MapPin, AlertTriangle, ChevronRight } from "lucide-react";
import { completeOwnerProfile } from "@/actions/completeOwnerProfile";
import { Session } from "@/types/typesSession";




interface PrivateHeaderProps {
  session: Session;
}

const OwnerProfileForm: React.FC<PrivateHeaderProps> = ({ session }) => {
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
    <div className="pb-10">
      {/* Header con gradiente */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30">
            <User size={28} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent">
              Completa tu Perfil
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
              Accede a todas las funciones completando tu información
            </p>
          </div>
        </div>

        {/* Mensaje de agradecimiento */}
        <div className="p-4 md:p-5 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-200 dark:border-blue-800/50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="flex-shrink-0 mt-0.5 text-amber-500 dark:text-amber-400" size={20} />
            <p className="text-sm md:text-base text-blue-800 dark:text-blue-200">
              <strong className="font-semibold">¡Importante!</strong> Necesitamos tus datos para contactarte en caso de emergencia con tu mascota.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Sección de información personal */}
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <User size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Información Personal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre *
              </label>
              <div className="relative">
                <input
                  {...register("name")}
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                  placeholder="Ingresa tu nombre"
                />
                <User className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertTriangle size={16} />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Apellido *
              </label>
              <div className="relative">
                <input
                  {...register("lastName")}
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                  placeholder="Ingresa tu apellido"
                />
                <User className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertTriangle size={16} />
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sección de contacto */}
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30">
              <Phone size={20} className="text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Información de Contacto
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teléfono principal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Teléfono *
              </label>
              <div className="relative">
                <input
                  {...register("phone")}
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                  placeholder="Ej: +57 300 123 4567"
                />
                <Phone className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertTriangle size={16} />
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Teléfono secundario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Teléfono secundario (opcional)
              </label>
              <div className="relative">
                <input
                  {...register("secondaryPhone")}
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                  placeholder="Teléfono alternativo"
                />
                <Phone className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Sección de ubicación */}
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <MapPin size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Ubicación
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ciudad *
              </label>
              <div className="relative">
                <input
                  {...register("city")}
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                  placeholder="Ej: Bogotá, Medellín"
                />
                <MapPin className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
              </div>
              {errors.city && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertTriangle size={16} />
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Barrio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Barrio / Localidad *
              </label>
              <div className="relative">
                <input
                  {...register("neighborhood")}
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                  placeholder="Ej: Chapinero, El Poblado"
                />
                <MapPin className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
              </div>
              {errors.neighborhood && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertTriangle size={16} />
                  {errors.neighborhood.message}
                </p>
              )}
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dirección exacta (opcional)
              </label>
              <div className="relative">
                <input
                  {...register("address")}
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                  placeholder="Ej: Calle 123 #45-67"
                />
                <MapPin className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:scale-[1.02] overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <User size={20} />
                  Guardar Perfil
                  <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default OwnerProfileForm;