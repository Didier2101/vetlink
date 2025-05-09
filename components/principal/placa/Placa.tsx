"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/principal/ThemeProvider";
import {
  Shield,
  MapPin,
  Smartphone,
  Info,
  Check,
  AlertTriangle,
  HeartPulse,
  Scan,
  Bell,
  Home,
} from "lucide-react";
import ImagePlaca from "@/src/ui/ImagePlaca";
// import PricingSlider from "../PricingSlider";

const Placa = () => {
  const { isDarkMode, theme } = useTheme();
  const [activeTab, setActiveTab] = useState<
    "benefits" | "how-it-works" | "requirements"
  >("benefits");

  const features = [
    {
      icon: <Shield size={24} />,
      title: "Protección Total",
      description: "ID único vinculado a tu cuenta VetLink",
    },
    {
      icon: <MapPin size={24} />,
      title: "Localización Instantánea",
      description: "Localiza a tu mascota por medio de codigo QR",
    },
    {
      icon: <Smartphone size={24} />,
      title: "Notificaciones Inmediatas",
      description: "Alerta instantánea cuando encuentren a tu mascota",
    },
  ];

  const benefits = [
    {
      icon: <HeartPulse size={18} />,
      text: "Acceso rápido al historial médico en emergencias",
    },
    {
      icon: <Scan size={18} />,
      text: "Código QR único que no se puede duplicar",
    },
    {
      icon: <Bell size={18} />,
      text: "Alertas cuando alguien escanee el código",
    },
    {
      icon: <Home size={18} />,
      text: "Vinculación con veterinarias y refugios asociados",
    },
    {
      icon: <Check size={18} />,
      text: "Reducción del 90% en tiempo de recuperación",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Registra a tu mascota",
      description: "Completa el perfil con sus datos médicos y de contacto",
    },
    {
      step: "2",
      title: "Elige tu placa",
      description: "Selecciona el material y diseño que prefieras",
    },
    {
      step: "3",
      title: "Recibe y activa",
      description: "Al recibirla, escanea el código para activar la protección",
    },
    {
      step: "4",
      title: "Protección activa",
      description: "Cualquiera que encuentre a tu mascota podrá contactarte",
    },
  ];

  const requirements = [
    "Ser dueño registrado en VetLink",
    "Tener al menos una mascota registrada",
    "Información de contacto actualizada",
    "Dirección válida para envío físico",
  ];

  return (
    <div
      className={`min-h-screen ${theme.bgColor} ${theme.textColor} transition-colors duration-300 py-12 md:py-16 lg:py-20`}
    >
      {/* Hero Section */}
      <section className={`py-12 ${theme.bgColor}`}>
        {/* Background gradient */}

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1
                className={`text-4xl md:text-5xl font-bold mb-6 ${theme.textColor}`}
              >
                Placa Inteligente <span className="text-blue-500">VetLink</span>
              </h1>
              <p
                className={`text-xl mb-8 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                La solución más segura para identificar y proteger a tu mascota
              </p>

              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        isDarkMode ? "bg-teal-900" : "bg-blue-100"
                      }`}
                    >
                      {React.cloneElement(feature.icon, {
                        className: isDarkMode
                          ? "text-teal-400"
                          : "text-blue-600",
                      })}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${theme.textColor}`}>
                        {feature.title}
                      </h3>
                      <p
                        className={
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }
                      >
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <ImagePlaca />
            </div>
          </div>
        </div>
      </section>

      {/* Info Tabs */}
      <section className={`py-12 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex border-b mb-8">
              <button
                className={`py-3 px-6 font-medium ${
                  activeTab === "benefits"
                    ? `${theme.textColor} border-b-2 ${
                        isDarkMode ? "border-teal-400" : "border-blue-500"
                      }`
                    : isDarkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("benefits")}
              >
                Beneficios
              </button>
              <button
                className={`py-3 px-6 font-medium ${
                  activeTab === "how-it-works"
                    ? `${theme.textColor} border-b-2 ${
                        isDarkMode ? "border-teal-400" : "border-blue-500"
                      }`
                    : isDarkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("how-it-works")}
              >
                ¿Cómo funciona?
              </button>
              <button
                className={`py-3 px-6 font-medium ${
                  activeTab === "requirements"
                    ? `${theme.textColor} border-b-2 ${
                        isDarkMode ? "border-teal-400" : "border-blue-500"
                      }`
                    : isDarkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("requirements")}
              >
                Requisitos
              </button>
            </div>

            <div className="p-6">
              {activeTab === "benefits" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          isDarkMode ? "bg-teal-900/50" : "bg-blue-100"
                        }`}
                      >
                        {React.cloneElement(benefit.icon, {
                          className: isDarkMode
                            ? "text-teal-400"
                            : "text-blue-600",
                        })}
                      </div>
                      <p
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        {benefit.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "how-it-works" && (
                <div className="space-y-8">
                  {howItWorks.map((step) => (
                    <div key={step.step} className="flex gap-6">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          isDarkMode
                            ? "bg-teal-900 text-teal-400"
                            : "bg-blue-100 text-blue-600"
                        } font-bold`}
                      >
                        {step.step}
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-semibold mb-2 ${theme.textColor}`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "requirements" && (
                <div className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`p-1 rounded-full ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <Check
                          size={16}
                          className={
                            isDarkMode ? "text-teal-400" : "text-blue-600"
                          }
                        />
                      </div>
                      <p
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        {requirement}
                      </p>
                    </div>
                  ))}

                  <div
                    className={`mt-6 p-4 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700/50 border border-gray-600"
                        : "bg-yellow-50 border border-yellow-200"
                    }`}
                  >
                    <div className="flex gap-3">
                      <AlertTriangle
                        className={
                          isDarkMode ? "text-yellow-400" : "text-yellow-600"
                        }
                      />
                      <p
                        className={
                          isDarkMode ? "text-gray-300" : "text-yellow-800"
                        }
                      >
                        <strong>Importante:</strong> Debes tener una cuenta de
                        dueño verificada para poder adquirir la placa. Si aún no
                        has registrado a tu mascota, puedes hacerlo desde tu
                        panel de control.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="plans-section"
        className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-blue-50"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${theme.textColor}`}
            >
              Encuentra el plan perfecto
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Diferentes materiales y opciones para la seguridad de tu mascota
            </p>
          </div>

          {/* Componente de planes de precios */}
          {/* <PricingSlider /> */}

          <div
            className={`mt-8 p-6 rounded-lg max-w-4xl mx-auto ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-md`}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div
                className={`p-3 rounded-full ${
                  isDarkMode ? "bg-teal-900/50" : "bg-blue-100"
                }`}
              >
                <Info
                  className={isDarkMode ? "text-teal-400" : "text-blue-600"}
                  size={24}
                />
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${theme.textColor}`}>
                  Garantía VetLink
                </h3>
                <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                  Todas nuestras placas incluyen garantía de 1 año contra
                  defectos de fabricación. Si tu mascota crece, puedes solicitar
                  un cambio de placa con 50% de descuento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 ${theme.bgColor}`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2
            className={`text-3xl font-bold mb-8 text-center ${theme.textColor}`}
          >
            Preguntas Frecuentes
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "¿Qué pasa si mi mascota pierde la placa?",
                answer:
                  "Puedes reportarla como perdida en tu cuenta y te enviaremos una nueva con 30% de descuento.",
              },
              {
                question: "¿Cómo actualizo mi información de contacto?",
                answer:
                  "Puedes actualizarla en cualquier momento desde la sección 'Mi Perfil' en tu cuenta VetLink.",
              },
              {
                question: "¿Funciona fuera de mi país?",
                answer:
                  "Sí, el sistema funciona internacionalmente. Cualquier persona con un smartphone puede escanear el código QR.",
              },
              {
                question: "¿Puedo transferir la placa a otra mascota?",
                answer:
                  "No, cada placa está vinculada permanentemente a una mascota específica por motivos de seguridad.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <button
                  className={`w-full text-left p-4 font-medium ${
                    isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                  } flex justify-between items-center`}
                >
                  <span>{faq.question}</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`p-4 border-t ${
                    isDarkMode
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Placa;
