import Placa from "@/components/public/principal/placa/Placa";
import Loading from "@/src/ui/Loading";
import { Suspense } from "react";

const PlacaPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Placa />
    </Suspense>
  );
};

export default PlacaPage;
