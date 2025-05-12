// src/app/complete-profile/page.tsx
"use client";

import OwnerProfileForm from "@/components/privado/Owner/OwnerProfileForm";
import { useRouter } from "next/navigation";

export default function CompleteOwnerProfile() {
  const router = useRouter();

  const handleSuccess = () => {
    // Redirigir o mostrar mensaje de éxito
    router.push("/dashboard");
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Completa tu perfil de propietario
      </h1>
      <OwnerProfileForm onSubmitSuccess={handleSuccess} />
    </main>
  );
}
