"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/principal/ThemeProvider";
import { MapPin, Star, Calendar, Filter } from "lucide-react";
import Link from "next/link";

interface Veterinarian {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  address: string;
  availability: string;
  plans: {
    basic: boolean;
    premium: boolean;
  };
}

const Veterinarios = () => {
  const { isDarkMode, theme } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Datos de ejemplo
  const veterinarians: Veterinarian[] = [
    {
      id: "1",
      name: "Dra. María González",
      specialty: "Cardiología",
      rating: 4.8,
      experience: 12,
      address: "Bogotá, Chapinero",
      availability: "Lun-Mie-Vie",
      plans: {
        basic: true,
        premium: true,
      },
    },
    {
      id: "2",
      name: "Dr. Carlos Martínez",
      specialty: "Ortopedia",
      rating: 4.6,
      experience: 8,
      address: "Medellín, El Poblado",
      availability: "Mar-Jue-Sáb",
      plans: {
        basic: true,
        premium: false,
      },
    },
    // Más veterinarios...
  ];

  const specialties = [
    "Cardiología",
    "Ortopedia",
    "Dermatología",
    "Oftalmología",
    "Cirugía",
  ];

  const locations = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];

  const filteredVets = veterinarians.filter((vet) => {
    return (
      (!specialtyFilter || vet.specialty === specialtyFilter) &&
      (!locationFilter || vet.address.includes(locationFilter))
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
            Veterinarios Disponibles
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <Filter size={18} />
            <span>Filtrar</span>
          </button>
        </div>

        {showFilters && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVets.map((vet) => (
            <div
              key={vet.id}
              className={`p-6 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-1">{vet.name}</h2>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {vet.specialty}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(vet.rating)}
                  <span className="text-sm">({vet.rating})</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={16}
                    className={isDarkMode ? "text-gray-500" : "text-gray-600"}
                  />
                  <span className="text-sm">{vet.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar
                    size={16}
                    className={isDarkMode ? "text-gray-500" : "text-gray-600"}
                  />
                  <span className="text-sm">
                    Disponible: {vet.availability}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">
                  {vet.experience} años de experiencia
                </span>
                <Link
                  href={`/veterinarios/${vet.id}`}
                  className={`px-4 py-2 rounded-lg ${theme.buttonBg} text-white hover:opacity-90`}
                >
                  Ver perfil
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredVets.length === 0 && (
          <div
            className={`p-8 text-center rounded-xl ${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <p className="text-lg">
              No se encontraron veterinarios con los filtros seleccionados
            </p>
            <button
              onClick={() => {
                setSpecialtyFilter("");
                setLocationFilter("");
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

export default Veterinarios;
