import { PetForm } from "@/components/forms/PetForm";
import { getSession } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import Loading from "@/src/ui/Loading";

import React, { Suspense } from "react";

const session = await getSession();

const owner = await prisma.owners.findUnique({
  where: { userId: session.id },
  select: { id: true }
})

// Acceder al ID del owner:
const ownerId = owner?.id


const petsPage = () => {
  if (ownerId === undefined) {
    return <div>Error: Owner not found.</div>;
  }
  return (
    <Suspense fallback={<Loading />}>
      <PetForm ownerId={ownerId} />
    </Suspense>
  );
};

export default petsPage;
