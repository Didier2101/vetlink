import NavBar from "@/components/main/NavBar";
import Footer from "@/components/public/principal/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      <main className="max-w-6xl mx-auto pt-18 md:pt-28 min-h-screen px-3">
        {children}
      </main>
      <Footer />
    </div>
  );
}
