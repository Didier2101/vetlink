"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/principal/ThemeProvider";
import { MapPin, Star, Clock, Phone, Calendar } from "lucide-react";
import Link from "next/link";

interface Clinic {
  id: string;
  name: string;
  specialties: string[];
  rating: number;
  address: string;
  phone: string;
  hours: string;
  emergency: boolean;
  plans: {
    basic: boolean;
    premium: boolean;
  };
}

const Clinicas = () => {
  const { isDarkMode, theme } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [emergencyFilter, setEmergencyFilter] = useState(false);

  // Datos de ejemplo
  const clinics: Clinic[] = [
    {
      id: "1",
      name: "Clínica VetCare",
      specialties: ["Cirugía", "Cardiología", "Urgencias"],
      rating: 4.7,
      address: "Calle 123 #45-67, Bogotá",
      phone: "+57 123 456 7890",
      hours: "Lun-Vie: 8am-8pm, Sáb: 9am-5pm",
      emergency: true,
      plans: {
        basic: true,
        premium: true,
      },
    },
    {
      id: "2",
      name: "Centro Veterinario Paws",
      specialties: ["Dermatología", "Oftalmología"],
      rating: 4.5,
      address: "Carrera 56 #12-34, Medellín",
      phone: "+57 987 654 3210",
      hours: "Lun-Sáb: 9am-6pm",
      emergency: false,
      plans: {
        basic: true,
        premium: false,
      },
    },
    // Más clínicas...
  ];

  const specialties = [
    "Cirugía",
    "Cardiología",
    "Dermatología",
    "Oftalmología",
    "Urgencias",
    "Odontología",
  ];

  const locations = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];

  const filteredClinics = clinics.filter((clinic) => {
    return (
      (!specialtyFilter || clinic.specialties.includes(specialtyFilter)) &&
      (!locationFilter || clinic.address.includes(locationFilter)) &&
      (!emergencyFilter || clinic.emergency)
    );
  });

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : isDarkMode
            ? "text-gray-500"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div
      className={`min-h-screen ${theme.bgColor} ${theme.textColor} py-24 md:py-24 lg:py-32`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            Clínicas Veterinarias
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <Calendar size={18} />
            <span>Filtrar</span>
          </button>
        </div>

        {showFilters && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Especialidad</label>
                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className={`w-full p-2 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option value="">Todas</option>
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Ubicación</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className={`w-full p-2 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option value="">Todas</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={emergencyFilter}
                    onChange={(e) => setEmergencyFilter(e.target.checked)}
                    className="h-5 w-5 rounded"
                  />
                  <span>Solo urgencias 24/7</span>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClinics.map((clinic) => (
            <div
              key={clinic.id}
              className={`p-6 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-1">{clinic.name}</h2>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(clinic.rating)}
                    <span className="text-sm">({clinic.rating})</span>
                  </div>
                </div>
                {clinic.emergency && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      isDarkMode
                        ? "bg-red-900 text-red-300"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    Urgencias
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin
                    size={16}
                    className={`mt-0.5 ${
                      isDarkMode ? "text-gray-500" : "text-gray-600"
                    }`}
                  />
                  <span className="text-sm">{clinic.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock
                    size={16}
                    className={isDarkMode ? "text-gray-500" : "text-gray-600"}
                  />
                  <span className="text-sm">{clinic.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone
                    size={16}
                    className={isDarkMode ? "text-gray-500" : "text-gray-600"}
                  />
                  <span className="text-sm">{clinic.phone}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Especialidades:</h3>
                <div className="flex flex-wrap gap-2">
                  {clinic.specialties.slice(0, 3).map((spec, index) => (
                    <span
                      key={index}
                      className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {spec}
                    </span>
                  ))}
                  {clinic.specialties.length > 3 && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      +{clinic.specialties.length - 3} más
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  {clinic.plans.basic && clinic.plans.premium ? (
                    <span>Todos los planes</span>
                  ) : clinic.plans.basic ? (
                    <span>Plan Básico</span>
                  ) : (
                    <span>Plan Premium</span>
                  )}
                </div>
                <Link
                  href={`/clinicas/${clinic.id}`}
                  className={`px-4 py-2 rounded-lg ${theme.buttonBg} text-white hover:opacity-90`}
                >
                  Ver clínica
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredClinics.length === 0 && (
          <div
            className={`p-8 text-center rounded-xl ${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <p className="text-lg">
              No se encontraron clínicas con los filtros seleccionados
            </p>
            <button
              onClick={() => {
                setSpecialtyFilter("");
                setLocationFilter("");
                setEmergencyFilter(false);
              }}
              className={`mt-4 px-4 py-2 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clinicas;
