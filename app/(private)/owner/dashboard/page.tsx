import Dashboard from "@/components/privado/owner/Dashboard";
import { getSession } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import Loading from "@/src/ui/Loading";
import { Suspense } from "react";

const DashBoardOwnerPage = async () => {
  const session = await getSession();
  if (!session) {
    return <div>No estás autenticado.</div>;
  }

  // Consulta optimizada que obtiene todo en una sola llamada
  const userData = await prisma.users.findUnique({
    where: { id: session.id },
    include: {
      plans: true,
      owners: {
        include: {
          pets: {
            include: {
              vaccines: {
                orderBy: { applicationDate: "desc" },
                include: { vet: true }
              },
              documents: {
                orderBy: { issueDate: "desc" }
              },
              attentions: {
                orderBy: { date: "desc" },
                include: {
                  vet: true,
                  clinic: true
                }
              },
              medications: {
                orderBy: { startDate: "desc" }
              },
              dewormings: {
                orderBy: { date: "desc" }
              }
            }
          }
        }
      }
    }
  });

  if (!userData?.owners) {
    return <div>No tienes un perfil de propietario asociado.</div>;
  }



  return (
    <Suspense fallback={<Loading />}>
      <Dashboard
        pets={userData.owners.pets}
        userPlan={userData.plans}
      />
    </Suspense>
  );
};

export default DashBoardOwnerPage