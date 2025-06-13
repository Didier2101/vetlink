import { getSession } from "@/src/lib/auth";
import Loading from "@/src/ui/Loading";
import { Suspense } from "react";

const DashBoardVetPage = async () => {
  const session = await getSession();
  if (!session) {
    return <div>No estás autenticado.</div>;
  }
  return <Suspense fallback={<Loading />}>completa tu perfil vet</Suspense>;
};

export default DashBoardVetPage;
