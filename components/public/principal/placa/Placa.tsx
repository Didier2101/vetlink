"use client";

import React, { useState } from "react";
import {
  Shield,
  MapPin,
  Smartphone,
  Check,
  AlertTriangle,
  HeartPulse,
  Scan,
  Bell,
  Home,
  ChevronDown,
} from "lucide-react";
import ImagePlaca from "@/src/ui/ImagePlaca";

const Placa = () => {
  const [activeTab, setActiveTab] = useState<
    "benefits" | "how-it-works" | "requirements"
  >("benefits");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Shield size={24} />,
      title: "Protección Total",
      description: "ID único vinculado a tu cuenta VetLink",
    },
    {
      icon: <MapPin size={24} />,
      title: "Localización Instantánea",
      description: "Localiza a tu mascota por medio de código QR",
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

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent">
              Placa Inteligente{" "}

            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
              La solución más segura para identificar y proteger a tu mascota
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 group-hover:scale-110 transition-transform duration-300">
                    {React.cloneElement(feature.icon, {
                      className: "text-blue-600 dark:text-blue-400",
                    })}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-600 rounded-3xl opacity-10 blur-xl"></div>
              <ImagePlaca />
            </div>
          </div>
        </div>
      </section>

      {/* Info Tabs */}
      <section className="py-12 md:py-16 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
              {[
                { id: "benefits", label: "Beneficios" },
                { id: "how-it-works", label: "¿Cómo funciona?" },
                { id: "requirements", label: "Requisitos" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`py-3 px-6 font-medium text-sm md:text-base transition-colors duration-300 ${activeTab === tab.id
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  onClick={() => setActiveTab(tab.id as "benefits" | "how-it-works" | "requirements")}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8 bg-white/80 dark:bg-gray-900 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-sm">
              {activeTab === "benefits" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-4 p-5 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 group-hover:scale-110 transition-transform duration-300">
                        {React.cloneElement(benefit.icon, {
                          className: "text-blue-600 dark:text-blue-400",
                        })}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {benefit.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "how-it-works" && (
                <div className="space-y-6">
                  {howItWorks.map((step) => (
                    <div
                      key={step.step}
                      className="group flex gap-6 p-5 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 group-hover:scale-110 transition-transform duration-300 text-blue-600 dark:text-blue-400 font-bold text-xl">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
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
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50">
                        <Check
                          size={14}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {requirement}
                      </p>
                    </div>
                  ))}

                  <div className="mt-6 p-5 rounded-xl bg-yellow-50/80 dark:bg-yellow-900/20 border border-yellow-200/50 dark:border-yellow-800/50 backdrop-blur-sm">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <AlertTriangle
                          size={20}
                          className="text-yellow-600 dark:text-yellow-400 mt-0.5"
                        />
                      </div>
                      <p className="text-yellow-800 dark:text-yellow-200">
                        <strong className="font-semibold">Importante:</strong> Debes tener una cuenta de
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

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent">
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
                className="border rounded-xl overflow-hidden border-gray-200/50 dark:border-gray-700/50 hover:shadow-sm transition-shadow duration-300"
              >
                <button
                  className="w-full text-left p-5 font-medium hover:bg-gray-50/50 dark:hover:bg-gray-800/50 flex justify-between items-center transition-colors duration-300"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-gray-800 dark:text-gray-200">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 ${expandedFaq === index ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="p-5 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50">
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Placa;