"use client";
import {
  Heart,
  Plus,
  MapPin,
  Phone,
  Users,
  FileText,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Pets, Document } from "@/types/typesPets";
import CardPets from "../pets/CardPets";
import { formatDate } from "@/src/utils/formatDate";
import Swal from "sweetalert2";
import { PlanType } from "@/types/planType";

interface DashboardProps {
  pets: Pets[];
  userPlan: PlanType;
}

const Dashboard = ({ pets, userPlan }: DashboardProps) => {


  // Usamos directamente maxPets del plan
  const petLimit = userPlan.maxPets;
  const currentPetCount = pets.length;
  const hasReachedLimit = currentPetCount >= petLimit;


  const handleAddPetClick = async (e: React.MouseEvent) => {
    if (hasReachedLimit) {
      e.preventDefault();
      await Swal.fire({
        title: 'Límite alcanzado',
        html: `
          <div class="text-left">
            <p>Tienes <b>${currentPetCount} mascotas</b> registradas.</p>
            <p class="mt-2">Tu plan <b>${userPlan.title}</b> permite 
            ${petLimit === Infinity ? 'mascotas ilimitadas' : `hasta ${petLimit} mascotas`}.</p>
            <p class="mt-4">¿Deseas actualizar tu plan?</p>
          </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Actualizar plan',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/plans';
        }
      });
    }
  };

  return (
    <div className="min-h-scree mt-6 pb-10">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pets Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Mis Mascotas ({pets.length})
              </h2>
              <Link
                href="/owner/pets"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                onClick={handleAddPetClick}
              >
                <Plus size={16} className="mr-1" />
                Añadir Mascota

              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pets.map((pet) => (
                <CardPets key={pet.id} pet={pet} />
              ))}
            </div>
          </div>

          {/* Health Documents */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FileText className="mr-2 text-indigo-500" size={20} />
              Documentos Recientes
            </h3>
            <div className="space-y-4">
              {pets
                .flatMap(
                  (pet) =>
                    pet.documents
                      ?.slice(0, 2)
                      .map((doc) => (
                        <DocumentCard
                          key={doc.id}
                          document={doc}
                          petName={pet.name}
                        />
                      )) || []
                )
                .slice(0, 3)}
              <Link
                href="/owner/documents"
                className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 flex items-center mt-4"
              >
                Ver todos los documentos{" "}
                <ArrowRight className="ml-1" size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Acciones Rápidas
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: Heart,
                  label: "Emergencia",
                  color: "bg-red-500 hover:bg-red-600",
                  href: "/emergency",
                },
                {
                  icon: MapPin,
                  label: "Veterinarias",
                  color: "bg-orange-500 hover:bg-orange-600",
                  href: "/veterinarios",
                },
                {
                  icon: Users,
                  label: "Cuidadores",
                  color: "bg-purple-500 hover:bg-purple-600",
                  href: "/caretakers",
                },
                {
                  icon: Phone,
                  label: "Soporte",
                  color: "bg-blue-500 hover:bg-blue-600",
                  href: "/support",
                },
              ].map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className={`${action.color} text-white p-3 rounded-lg transition-colors duration-200 flex flex-col items-center`}
                >
                  <action.icon size={20} className="mb-1" />
                  <span className="text-xs font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Veterinarians */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Stethoscope className="mr-2 text-green-500" size={20} />
              Mis Veterinarios
            </h3>
            {/* <div className="space-y-3">
              {vets.slice(0, 2).map((vet) => (
                <div key={vet.id} className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg mr-3">
                    <User className="text-green-500" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {vet.name} {vet.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {vet.specialty} • {vet.clinicName}
                    </p>
                  </div>
                </div>
              ))}
              <Link
                href="/owner/vets"
                className="text-sm text-green-500 hover:text-green-600 dark:text-green-400 flex items-center mt-2"
              >
                Ver todos los veterinarios{" "}
                <ArrowRight className="ml-1" size={16} />
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentCard = ({
  document,
  petName,
}: {
  document: Document;
  petName: string;
}) => (
  <div className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg mr-3">
      <FileText className="text-indigo-500" size={16} />
    </div>
    <div>
      <p className="font-medium text-sm">{document.title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {petName} • {document.type.replace("_", " ")} •{" "}
        {formatDate(document.issueDate.toString())}
      </p>
    </div>
  </div>
);

export default Dashboard;
