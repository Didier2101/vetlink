import VetProfileForm from "@/components/privado/vet/VetProfileForm";
import { getSession } from "@/src/lib/auth";
import Loading from "@/src/ui/Loading";
import { redirect } from "next/navigation";
import { Suspense } from "react";
// import { completeOwnerProfile } from "@/app/actions/owner";

const CompleteVetProfilePage = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  // const router = useRouter();
  return (
    <Suspense fallback={<Loading />}>
      <VetProfileForm session={session} />
    </Suspense>
  );
};

export default CompleteVetProfilePage;
