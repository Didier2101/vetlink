import OwnerProfileForm from "@/components/privado/owner/OwnerProfileForm";
import { getSession } from "@/src/lib/auth";
import { redirect } from "next/navigation";
// import { completeOwnerProfile } from "@/app/actions/owner";

const CompleteOwnerProfile = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  // const router = useRouter();
  return <OwnerProfileForm session={session} />;
};

export default CompleteOwnerProfile;
