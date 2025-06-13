import { PawPrint } from "lucide-react";

const Loading = ({ text = "Cargando tu información..." }) => {
  return (
    <div className="rounded-2xl min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-teal-600 mx-auto mb-4"></div>
          <PawPrint
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-teal-600"
            size={24}
          />
        </div>
        <p className="text-teal-600 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default Loading;