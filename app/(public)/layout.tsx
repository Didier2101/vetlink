import Footer from "@/components/principal/Footer";
import MobileBottomNav from "@/components/principal/MobileBottomNav";
import NavBar from "@/components/principal/navbar/NavBar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <MobileBottomNav />

      <Footer />
    </div>
  );
}
