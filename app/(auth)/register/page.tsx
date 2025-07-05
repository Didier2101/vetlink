import RegisterForm from "@/components/forms/RegisterForm";
import Loading from "@/src/ui/Loading";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RegisterForm />
    </Suspense>
  )


};

export default RegisterPage;
