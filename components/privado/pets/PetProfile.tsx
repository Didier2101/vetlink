import { notFound } from "next/navigation";
import Image from "next/image";

import {
  Calendar,
  Stethoscope,
  FileText,
  Syringe,
  Shield,
  Heart,
  Activity,
  Pill,
} from "lucide-react";
import Link from "next/link";
import { getPetById } from "@/actions/pets";
import { FaCamera } from "react-icons/fa";
import { calculatePetAge, formatDate } from "@/src/utils/formatDate";

interface PetProfileProps {
  petId: string;
}

const PetProfile = async ({ petId }: PetProfileProps) => {
  const pet = await getPetById(petId);

  if (!pet) {
    notFound();
  }

  return (
    <div className="pb-10 mt-10 md:mt-0">
      {/* Header con botón de regreso */}
      <div className="mb-6">
        <Link
          href="/owner/dashboard"
          className="inline-flex mb-4 items-center text-sm font-medium text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-200 transition"
        >
          ← Volver a mis mascotas
        </Link>

        {/* Información principal de la mascota */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Contenedor principal de la sección de información de la mascota */}
          {/* Usamos 'flex-col' por defecto (móvil) y 'lg:flex-row' para pantallas grandes */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            {/* Contenedor de la imagen o el icono */}
            {pet.photo ? (
              <Image
                src={pet.photo}
                alt={pet.name}
                width={150}
                height={150}
                // Clases para la imagen: tamaño, forma, bordes.
                // 'mx-auto' para centrar en móvil, 'lg:mx-0' para alinear a la izquierda en desktop.
                // 'mb-6' para margen inferior en móvil, 'lg:mb-0' para eliminarlo en desktop.
                // 'lg:mr-8' para margen derecho en desktop.
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover mb-6 lg:mb-0 border-4 border-emerald-500 mx-auto lg:mr-8"
              />
            ) : (
              <div
                // Contenedor del icono: mismo tamaño y forma que la imagen.
                // 'mx-auto' para centrar en móvil, 'lg:mx-0' para alinear a la izquierda en desktop.
                // 'mb-6' para margen inferior en móvil, 'lg:mb-0' para eliminarlo en desktop.
                // 'lg:mr-8' para margen derecho en desktop.
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gray-200 flex items-center justify-center border-4 border-emerald-500 mb-6 lg:mb-0 mx-auto lg:mr-8"
              >
                <FaCamera className="text-gray-500 text-6xl lg:text-7xl" />{" "}
                {/* Ajusta el tamaño del icono */}
              </div>
            )}

            {/* Contenedor del texto y detalles de la mascota */}
            <div className="flex-1 text-center lg:text-left">
              {" "}
              {/* Centrado en móvil, alineado a la izquierda en desktop */}
              {/* Nombre y estado de esterilización */}
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-2">
                {" "}
                {/* Alineación flexible */}
                <h1 className="font-bold text-3xl lg:text-4xl mb-2 lg:mb-0">
                  {pet.name}
                </h1>
                <span
                  className={`text-sm px-3 py-1 rounded-full w-fit ${
                    // 'w-fit' para que ocupe solo el ancho del contenido
                    pet.sterilized
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                    } mx-auto lg:mx-0`} // Centrado en móvil, sin margen en desktop
                >
                  {pet.sterilized ? "Esterilizado" : "No esterilizado"}
                </span>
              </div>
              {/* Especie, raza y sexo */}
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                {pet.breed} • {pet.sex === "male" ? "Macho" : "Hembra"} •{" "}
                {pet.species}
              </p>
              {/* Grid de detalles adicionales */}
              {/* 'grid-cols-1' por defecto (móvil) y 'lg:grid-cols-2' para pantallas grandes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                {/* Edad */}
                <div className="flex items-center justify-center lg:justify-start text-lg">
                  <Calendar className="text-gray-400 mr-2" size={20} />
                  <span className="text-gray-600 dark:text-gray-400">
                    {calculatePetAge(pet.birthDate)}
                  </span>
                </div>

                {/* Código Vetlink (condicional) */}
                {pet.codeVetlink && (
                  <div className="flex items-center justify-center lg:justify-start text-lg">
                    <Shield className="text-gray-400 mr-2" size={20} />
                    <span className="text-gray-600 dark:text-gray-400">
                      VT: {pet.codeVetlink}
                    </span>
                  </div>
                )}

                {/* Color */}
                <div className="flex items-center justify-center lg:justify-start text-lg">
                  <Heart className="text-gray-400 mr-2" size={20} />
                  <span className="text-gray-600 dark:text-gray-400">
                    {pet.color}
                  </span>
                </div>

                {/* Nivel de Actividad */}
                <div className="flex items-center justify-center lg:justify-start text-lg">
                  <Activity className="text-gray-400 mr-2" size={20} />
                  <span className="text-gray-600 dark:text-gray-400">
                    Actividad: {pet.activityLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Syringe size={24} />}
          value={pet.vaccines?.length || 0}
          label="Vacunas"
          color="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
        />
        <StatCard
          icon={<Stethoscope size={24} />}
          value={pet.attentions?.length || 0}
          label="Atenciones"
          color="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
        />
        <StatCard
          icon={<FileText size={24} />}
          value={pet.documents?.length || 0}
          label="Documentos"
          color="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
        />
        <StatCard
          icon={<Pill size={24} />}
          value={pet.medications?.length || 0}
          label="Medicamentos"
          color="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400"
        />
      </div>

      {/* Grid de información detallada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vacunas */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Syringe className="mr-2 text-blue-600" size={20} />
            Historial de Vacunas ({pet.vaccines?.length || 0})
          </h2>
          {pet.vaccines && pet.vaccines.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {pet.vaccines.map((vaccine) => (
                <div
                  key={vaccine.id}
                  className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg"
                >
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {vaccine.type}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {/* Fecha de aplicación */}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Aplicación:
                    </span>{" "}
                    {formatDate(
                      vaccine.applicationDate?.toISOString?.() ??
                      vaccine.applicationDate
                    )}
                    <br /> {/* Salto de línea para separar las fechas */}
                    {/* Próxima fecha */}
                    {vaccine.nextDate && (
                      <>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          Próxima:
                        </span>{" "}
                        {formatDate(
                          vaccine.nextDate?.toISOString?.() ?? vaccine.nextDate
                        )}
                      </>
                    )}
                  </p>
                  {vaccine.vet && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Dr. {vaccine.vet.name} {vaccine.vet.lastName} {"-"}{" "}
                      {vaccine.vet.licenseNumber}
                    </p>
                  )}
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded mt-2 ${
                      // Aumentado el margen superior
                      vaccine.category === "LEGAL"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                  >
                    {vaccine.category === "LEGAL"
                      ? "Obligatoria"
                      : "Recomendada"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Syringe className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-500 dark:text-gray-400">
                No hay vacunas registradas
              </p>
            </div>
          )}
        </div>

        {/* Atenciones Médicas */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Stethoscope className="mr-2 text-green-600" size={20} />
            Atenciones Médicas ({pet.attentions?.length || 0})
          </h2>
          {pet.attentions && pet.attentions.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {pet.attentions.map((attention) => (
                <div
                  key={attention.id}
                  className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 dark:bg-green-900/20 rounded-r-lg"
                >
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {attention.reason}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(attention.date).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {attention.vet && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Dr. {attention.vet.name} {attention.vet.lastName} {"-"}{" "}
                      {attention.vet.licenseNumber}
                      {attention.clinic && ` - ${attention.clinic.name}`}
                    </p>
                  )}
                  {attention.notes && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 italic">
                      {attention.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Stethoscope className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-500 dark:text-gray-400">
                No hay atenciones registradas
              </p>
            </div>
          )}
        </div>

        {/* Documentos */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2 text-purple-600" size={20} />
            Documentos ({pet.documents?.length || 0})
          </h2>
          {pet.documents && pet.documents.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {pet.documents.map((document) => (
                <div
                  key={document.id}
                  className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg"
                >
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {document.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(document.issueDate).toLocaleDateString("es-CO")}
                  </p>
                  <span className="inline-block text-xs px-2 py-1 rounded mt-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {document.type.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-500 dark:text-gray-400">
                No hay documentos registrados
              </p>
            </div>
          )}
        </div>

        {/* Medicamentos */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Pill className="mr-2 text-orange-600" size={20} />
            Medicamentos ({pet.medications?.length || 0})
          </h2>
          {pet.medications && pet.medications.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {pet.medications.map((medication) => (
                <div
                  key={medication.id}
                  className="border-l-4 border-orange-500 pl-4 py-3 bg-orange-50 dark:bg-orange-900/20 rounded-r-lg"
                >
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {medication.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {medication.dosage} - {medication.frequency}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Desde:{" "}
                    {new Date(medication.startDate).toLocaleDateString("es-CO")}
                    {medication.endDate &&
                      ` hasta ${new Date(medication.endDate).toLocaleDateString(
                        "es-CO"
                      )}`}
                  </p>
                  {medication.prescribedBy && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Prescrito por: {medication.prescribedBy}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Pill className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-500 dark:text-gray-400">
                No hay medicamentos registrados
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Información adicional */}
      {(pet.allergies ||
        pet.chronicDiseases ||
        pet.disabilities ||
        pet.behaviorNotes) && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">
              Información Médica Adicional
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pet.allergies && (
                <div>
                  <h3 className="font-medium text-red-700 dark:text-red-400 mb-2">
                    Alergias
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    {pet.allergies}
                  </p>
                </div>
              )}
              {pet.chronicDiseases && (
                <div>
                  <h3 className="font-medium text-orange-700 dark:text-orange-400 mb-2">
                    Enfermedades Crónicas
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                    {pet.chronicDiseases}
                  </p>
                </div>
              )}
              {pet.disabilities && (
                <div>
                  <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2">
                    Discapacidades
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    {pet.disabilities}
                  </p>
                </div>
              )}
              {pet.behaviorNotes && (
                <div>
                  <h3 className="font-medium text-purple-700 dark:text-purple-400 mb-2">
                    Notas de Comportamiento
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    {pet.behaviorNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

const StatCard = ({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div
      className={`inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full ${color} mb-3`}
    >
      {icon}
    </div>
    <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
      {value}
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
  </div>
);

export default PetProfile;
