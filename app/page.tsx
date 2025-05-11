import { redirect } from "next/navigation";

const HomePage = async () => {
  return redirect("/inicio");
};

export default HomePage;
