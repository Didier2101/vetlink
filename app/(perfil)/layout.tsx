import type { Metadata } from "next";
import { getSession } from "@/src/lib/auth";
import NavBarPerfil from "../../components/privado/NavBarPerfil";
import { redirect } from "next/navigation";
import FloatingThemeToggle from "@/src/ui/FloatingThemeToggle";

export const metadata: Metadata = {
  title: "VetLink - Tu perfil",
  description: "La mejor plataforma para el cuidado de tus mascotas",
};

interface UserSession {
  email: string;
  name?: string;
  category?: "owner" | "vet" | "clinic" | "store";
  planName?: string;
}

export default async function PerfilLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await getSession()) as UserSession | null;

  // Redirigir si no hay sesión
  if (!session) {
    return redirect("/");
  }

  // Verificar que la categoría existe
  if (!session.category) {
    console.error("La sesión no tiene categoría definida:", session);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-red-500 dark:text-red-400">
            Error: No se pudo determinar tu tipo de perfil
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <NavBarPerfil
        category={session.category}
        session={{
          name: session.name,
          email: session.email,
          category: session.category,
          planName: session.planName,
        }}
      />
      <main className="lg:ml-16 transition-all duration-300 ease-in-out flex-1 p-4 lg:p-6 overflow-y-auto">
        <FloatingThemeToggle position="top-right" />

        <div className="lg:pt-0 pt-12">{children}</div>
      </main>
    </div>
  );
}
