import { getSession } from "@/src/lib/auth";
import { getLinksWithIcons } from "@/src/data/navbarLinks";
import NavBarMobileFooter from "@/src/ui/NavBarMobileFooter";
import NavBarSidebar from "@/components/privado/NavBarSidebar";
import { redirect } from "next/navigation";

export default async function VetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) redirect("/auth/login");

  const links = getLinksWithIcons(session.category);

  return (
    <div className="flex h-screen">
      {/* Sidebar visible en escritorio */}
      <div className="hidden lg:block">
        <NavBarSidebar
          links={links}
          session={session}
          mobileMenuOpen={true} // Puedes controlar esto dinámicamente si necesitas
        />
      </div>

      {/* Contenido principal */}
      <main className="flex-1 overflow-hidden">{children}</main>

      {/* Footer móvil visible solo en pantallas pequeñas */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <NavBarMobileFooter links={links} />
      </div>
    </div>
  );
}
