import { cherry } from "../lib/fonts";

export const Logo = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="relative flex items-center gap-3">
        {/* Icono principal con gradiente y efecto hover */}

        {/* Logo text con estilo consistente */}
        <div className="flex flex-col">
          <span className={`${cherry.className} text-4xl font-bold text-gray-900 dark:text-white flex items-center leading-tight`}>
            Vet
            <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent mx-1.5">
              Link
            </span>
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 tracking-wider">
            SALUD INTEGRAL PARA TU MASCOTA
          </span>
        </div>
      </div>
    </div>
  );
};