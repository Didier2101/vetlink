import type { Metadata } from "next";
import "../globals.css";
import { roboto } from "@/src/lib/fonts";
import NavBar from "@/components/main/NavBar";
import Footer from "@/components/public/principal/Footer";

export const metadata: Metadata = {
  title: "VetLink - Plataforma Veterinaria",
  description: "La mejor plataforma para el cuidado de tus mascotas",
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const session = await getSession();

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${roboto.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300  pt-14 md:pt-22 min-h-screen `}>
        <NavBar />
        <main className="max-w-7xl mx-auto px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}