import PrivateHeader from "@/components/main/PrivateHeader";
import { getSession } from "@/src/lib/auth";
import { roboto } from "@/src/lib/fonts";
import "../globals.css";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    // Redirigir a la página de inicio de sesión si no hay sesión
    return (
      <div className="flex items-center justify-center min-h-screen bg-">
        <p className="text-lg text-gray-700">Por favor, inicia sesión para continuar.</p>
      </div>
    );
  }


  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${roboto.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300  pt-18 md:pt-22 min-h-screen `}>
        <PrivateHeader session={session} />
        <main className="max-w-7xl mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
}