"use client";

import { Pets } from "@/types/typesPets";
import { Calendar, Stethoscope, FileText, Syringe, Shield, PawPrint } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { calculatePetAge } from "@/src/utils/formatDate";

interface CardPetsProps {
  pet: Pets;
}

const CardPets = ({ pet }: CardPetsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        {pet.photo ? (
          <Image
            src={pet.photo ?? "/placeholder-pet.png"}
            alt={pet.name}
            width={80}  // ✅ Cambiar de 64 a 80
            height={80} // ✅ Cambiar de 64 a 80
            className="w-20 h-20 rounded-full object-cover mr-4 border-4 border-emerald-500" // ✅ Cambiar w-16 h-16 por w-20 h-20 y border-2 por border-4
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-4 border-emerald-500 mr-4"> {/* ✅ Agregar mr-4 para consistencia */}
            <PawPrint className="text-gray-400" size={24} /> {/* ✅ Usar un icono en lugar de texto */}
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{pet.name}</h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${pet.sterilized
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                }`}
            >
              {pet.sterilized ? "Esterilizado" : "No esterilizado"}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {pet.breed} • {pet.sex === "male" ? "Macho" : "Hembra"}
          </p>

          <div className="flex items-center mt-3 text-sm">
            <Calendar className="text-gray-400 mr-1" size={14} />
            <span className="text-gray-500 dark:text-gray-400">
              {calculatePetAge(pet.birthDate)}
            </span>
          </div>

          {pet.codeVetlink && (
            <div className="flex items-center mt-2 text-sm">
              <Shield className="text-gray-400 mr-1" size={14} />
              <span className="text-gray-500 dark:text-gray-400">
                VT: {pet.codeVetlink}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <StatItem
          icon={<Syringe size={14} />}
          value={pet.vaccines?.length || 0}
          label="Vacunas"
        />
        <StatItem
          icon={<Stethoscope size={14} />}
          value={pet.attentions?.length || 0}
          label="Atenciones"
        />
        <StatItem
          icon={<FileText size={14} />}
          value={pet.documents?.length || 0}
          label="Documentos"
        />
      </div>

      <Link
        href={`/owner/pets/${pet.id}`}
        className="mt-4 w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
      >
        Ver detalles
      </Link>
    </div>
  );
};

const StatItem = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center">
      {icon}
      <span className="ml-1 font-medium">{value}</span>
    </div>
    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
      {label}
    </span>
  </div>
);

export default CardPets;
