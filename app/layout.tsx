import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "@/src/lib/fonts";
// import NavBar from "@/components/public/principal/navbar/NavBar";
// import { getSession } from "@/src/lib/auth";
// import PrivateHeader from "@/components/privado/PrivateHeader";

export const metadata: Metadata = {
  title: "VetLink - Plataforma Veterinaria",
  description: "La mejor plataforma para el cuidado de tus mascotas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const session = await getSession();

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${roboto.className}`}>
        <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 ">
          {/* {!session ? <NavBar /> : <PrivateHeader />} */}

          {children}
        </main>
      </body>
    </html>
  );
}