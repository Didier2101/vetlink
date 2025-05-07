import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/principal/ThemeProvider";
import NavBar from "@/components/principal/NavBar";
import Footer from "@/components/principal/Footer";
import MobileBottomNav from "@/components/principal/MobileBottomNav";

export const metadata: Metadata = {
  title: "VetLink - Plataforma Veterinaria",
  description: "La mejor plataforma para el cuidado de tus mascotas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <NavBar />
          <main>{children}</main>
          <MobileBottomNav />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
