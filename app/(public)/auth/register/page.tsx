import RegistroForm from "@/components/public/auth/Registro";
import Loading from "@/src/ui/Loading";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RegistroForm />
    </Suspense>
  )


};

export default RegisterPage;
