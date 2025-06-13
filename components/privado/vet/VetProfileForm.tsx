"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "@/types/typesSession";
import {
  VetProfileFormData,
  vetProfileSchema,
} from "@/schemas/vet/vetProfileSchema";

import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
import Loading from "@/src/ui/Loading";
import { useState } from "react";
import {
  User,
  MapPin,
  Building,
  Stethoscope,
  FileText,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  Clock,
  Home,
  Shield,
} from "lucide-react";
// import { completeVetProfile } from "@/app/actions/completeVetProfile";

interface VetProfileFormProps {
  session: Session;
}

const VetProfileForm: React.FC<VetProfileFormProps> = () => {
  // console.log(session);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<VetProfileFormData>({
    resolver: zodResolver(vetProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      lastName: "",
      phone: "",
      licenseNumber: "",
      specialty: "",
      consultationFee: "",
      description: "",
      emergencyService: false,
      homeVisit: false,
      clinicName: "",
      clinicAddress: "",
      city: "",
      latitude: "",
      longitude: "",
    },
  });

  const totalSteps = 3;

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof VetProfileFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["name", "lastName", "phone", "licenseNumber"];
        break;
      case 2:
        fieldsToValidate = [
          "specialty",
          "consultationFee",
          "description",
          "emergencyService",
          "homeVisit",
        ];
        break;
      case 3:
        fieldsToValidate = [
          "clinicName",
          "clinicAddress",
          "city",
          "latitude",
          "longitude",
        ];
        break;
    }

    return await trigger(fieldsToValidate);
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: VetProfileFormData) => {
    console.log("Form data to submit:", data);
    try {
      // Convertir strings vacíos a null para campos opcionales
      const processedData = {
        ...data,
        consultationFee: data.consultationFee
          ? parseFloat(data.consultationFee)
          : null,
        description: data.description || null,
        latitude: data.latitude ? parseFloat(data.latitude) : null,
        longitude: data.longitude ? parseFloat(data.longitude) : null,
      };
      console.log("datos a enviar al back vet", processedData);

      // const result = await completeVetProfile(processedData);

      // if (result.result) {
      await Swal.fire({
        icon: "success",
        title: "Perfil completado",
        text: "Tu perfil veterinario se ha guardado correctamente",
        timer: 2000,
        showConfirmButton: false,
      });

      // router.push("/vet/dashboard");
      setIsLoading(false);
      // } else if (result.message) {
      //   await Swal.fire({
      //     icon: "error",
      //     title: "Error",
      //     text: result.message,
      //   });
      // }
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al guardar el perfil. Por favor intenta nuevamente.",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center md:justify-start mb-8 md:flex-col">
      {[1, 2, 3].map((step, index) => (
        <div key={step} className="flex items-center md:flex-col">
          {" "}
          {/* AQUI */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
              step <= currentStep
                ? "bg-teal-600 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
            }`}
          >
            {step}
          </div>
          {/* Las barras de conexión también deben adaptarse */}
          {index < 2 && (
            <div
              className={`w-16 h-0.5 mx-2 
            md:w-0.5 rounded-2xl md:h-16 md:my-2 md:mx-0 
            ${
              step < currentStep
                ? "bg-teal-600"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-full mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold  mb-2">Información Personal</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Proporciona tu información básica y número de matrícula profesional
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium  mb-2">Nombre *</label>
          <input
            {...register("name")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Ingresa tu nombre"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Apellido */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Apellido *
          </label>
          <input
            {...register("lastName")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Ingresa tu apellido"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Teléfono *
          </label>
          <input
            {...register("phone")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="+57 300 123 4567"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Número de matrícula */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Número de Matrícula Profesional *
          </label>
          <input
            {...register("licenseNumber")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="CRV-12345"
          />
          {errors.licenseNumber && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.licenseNumber.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
          <Stethoscope className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Información Profesional
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Comparte tu especialidad y servicios que ofreces
        </p>
      </div>

      <div className="space-y-6">
        {/* Especialidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Especialidad *
          </label>
          <input
            {...register("specialty")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Ej: Cirugía, Dermatología veterinaria, Medicina interna"
          />
          {errors.specialty && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.specialty.message}
            </p>
          )}
        </div>

        {/* Tarifa de consulta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tarifa de Consulta (COP)
            <span className="text-gray-500 text-xs ml-1">(opcional)</span>
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              {...register("consultationFee")}
              type="number"
              step="0.01"
              min="0"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="0.00"
            />
          </div>
          {errors.consultationFee && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.consultationFee.message}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Descripción de Servicios
            <span className="text-gray-500 text-xs ml-1">(opcional)</span>
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
            placeholder="Describe brevemente los servicios que ofreces, tu experiencia y enfoque profesional..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Servicios adicionales */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Servicios Adicionales
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Servicio de emergencia */}
            <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <input
                {...register("emergencyService")}
                type="checkbox"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-600" />
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Servicio de Emergencia
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Atención fuera del horario regular
                  </p>
                </div>
              </div>
            </div>

            {/* Visita domiciliaria */}
            <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <input
                {...register("homeVisit")}
                type="checkbox"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="flex items-center space-x-2">
                <Home className="w-5 h-5 text-green-600" />
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    Visita Domiciliaria
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Atención en el hogar del cliente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClinicInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
          <Building className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Información de la Clínica
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Proporciona los datos de tu clínica o consultorio veterinario
        </p>
      </div>

      <div className="space-y-6">
        {/* Nombre de la clínica */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nombre de la Clínica *
          </label>
          <input
            {...register("clinicName")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Ej: Patitas Felices S.A.S."
          />
          {errors.clinicName && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {errors.clinicName.message}
            </p>
          )}
        </div>

        {/* Dirección y ciudad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dirección de la Clínica *
            </label>
            <input
              {...register("clinicAddress")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Calle 123 #45-67"
            />
            {errors.clinicAddress && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {errors.clinicAddress.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ciudad *
            </label>
            <input
              {...register("city")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Bogotá D.C., Medellín"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {errors.city.message}
              </p>
            )}
          </div>
        </div>

        {/* Coordenadas GPS */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-600" />
            Ubicación GPS (Opcional)
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Estas coordenadas ayudarán a los clientes a encontrar tu clínica más
            fácilmente
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Latitud
              </label>
              <input
                {...register("latitude")}
                type="number"
                step="any"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="4.6097"
              />
              {errors.latitude && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.latitude.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Longitud
              </label>
              <input
                {...register("longitude")}
                type="number"
                step="any"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="-74.0817"
              />
              {errors.longitude && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.longitude.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderProfessionalInfo();
      case 3:
        return renderClinicInfo();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="pb-10">
      <div className="">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Registro Veterinario</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Completa tu perfil profesional para comenzar a brindar servicios
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:gap-4">
          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Form Card */}
          <div className="md:flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center border border-gray-200 gap-2 py-2 px-4 text-gray-600 dark:text-gray-300 rounded-lg hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Anterior
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <span className=" hidden md:flex text-sm text-gray-500 dark:text-gray-400">
                    Paso {currentStep} de {totalSteps}
                  </span>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      Siguiente
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Guardando...
                        </>
                      ) : (
                        <>
                          <FileText className="w-5 h-5" />
                          Completar Registro
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Progress Summary */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>
              {currentStep === 1 &&
                "Información básica y matrícula profesional"}
              {currentStep === 2 && "Especialidad y servicios que ofreces"}
              {currentStep === 3 && "Datos de tu clínica o consultorio"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetProfileForm;
