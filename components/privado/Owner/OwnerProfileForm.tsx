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
import { completeOwnerProfile } from "@/server/owner/completeOwnerProfile";

export const OwnerProfileForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OwnerProfileFormData>({
    resolver: zodResolver(ownerProfileSchema),
  });

  const onSubmit = async (data: OwnerProfileFormData) => {
    try {
      const result = await completeOwnerProfile(data);

      if (result.isProfileComplete) {
        await Swal.fire({
          icon: "success",
          title: "Perfil completado",
          text: "Tu perfil de propietario se ha guardado correctamente",
          timer: 2000,
          showConfirmButton: false,
        });

        // Redirigir según sea necesario

        router.push("/owner"); // O la ruta por defecto
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">Nombre</label>
        <input {...register("name")} className="input" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block">Apellido</label>
        <input {...register("lastName")} className="input" />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label className="block">Teléfono</label>
        <input {...register("phone")} className="input" />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block">Teléfono secundario (opcional)</label>
        <input {...register("secondaryPhone")} className="input" />
      </div>

      <div>
        <label className="block">Ciudad</label>
        <input {...register("city")} className="input" />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label className="block">Barrio / Localidad</label>
        <input {...register("neighborhood")} className="input" />
        {errors.neighborhood && (
          <p className="text-red-500 text-sm">{errors.neighborhood.message}</p>
        )}
      </div>

      <div>
        <label className="block">Dirección exacta (opcional)</label>
        <input {...register("address")} className="input" />
      </div>

      <div>
        <label className="block">Contacto de emergencia (opcional)</label>
        <input {...register("emergencyContact")} className="input" />
      </div>

      {errors.root && <p className="text-red-500">{errors.root.message}</p>}

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default OwnerProfileForm;
