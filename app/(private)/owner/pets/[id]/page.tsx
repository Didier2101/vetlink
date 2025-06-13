import PetProfile from "@/components/privado/pets/PetProfile";
import Loading from "@/src/ui/Loading";
import { Suspense } from "react";

interface PetPageProps {
  params: {
    id: string;
  };
}

export default function PetPage({ params }: PetPageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <PetProfile petId={params.id} />
    </Suspense>
  );
}
