import PrivateHeader from "@/components/privado/PrivateHeader";
import { getSession } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/");

  // Consulta optimizada para obtener todos los datos necesarios
  const user = await prisma.users.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      email: true,
      planId: true,
      terms: true,
      isProfileComplete: true,
      createdAt: true,
      isTrial: true,
      trialStartedAt: true,
      trialEndsAt: true,
      planStartedAt: true,
      planExpiresAt: true,
      owners: true,  // Incluye datos de owner si existe
      plans: {       // Incluye todos los datos del plan
        include: {
          features: true  // Incluye las características del plan
        }
      }
    }
  });

  if (!user) {
    redirect("/auth/logout");
  }

  // Determinar el rol del usuario
  // Determinar el rol del usuario
  const userRole = user.owners ? 'owner' : 'unknown';


  // Estructura de datos para el header
  const userData = {
    id: user.id,
    email: user.email,
    isProfileComplete: user.isProfileComplete,
    role: userRole,
    plan: {
      ...user.plans,
      isTrial: user.isTrial ?? false,
      trialStartedAt: user.trialStartedAt,
      trialEndsAt: user.trialEndsAt,
      planStartedAt: user.planStartedAt,
      planExpiresAt: user.planExpiresAt
    },
    ownerProfile: user.owners || null
  };


  console.log("data", userData)
  return (
    <div>
      <PrivateHeader userData={userData} />
      <main className="max-w-5xl mx-auto pt-18 md:pt-28 min-h-screen">
        {children}
      </main>
    </div>
  );
}