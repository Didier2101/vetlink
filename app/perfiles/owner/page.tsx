import { getSession } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

// app/(perfiles)/owner/page.tsx
export default async function OwnerDashboard() {
  // Obtener sesión del usuario
  const session = await getSession();

  // Verificar si hay sesión activa
  if (!session) redirect("/auth/login");

  // Verificar si el usuario tiene la categoría correcta
  if (session.category !== "owner") redirect("/login");

  // Obtener datos del usuario - solo los campos necesarios
  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      id: true,
      email: true,
      isProfileComplete: true,
    },
  });

  // Verificar si el usuario existe en la base de datos
  if (!user) redirect("/auth/login");

  // Verificar si el perfil está completo
  if (user.isProfileComplete === false) {
    redirect("/owner/complete-profile");
  }

  return (
    <main className="p-6 bg-red-800">
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.email}</h1>
      <p className="text-gray-700">Aquí va tu dashboard personalizado.</p>
    </main>
  );
}
