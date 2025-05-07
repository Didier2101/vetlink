"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/components/principal/ThemeProvider";
import {
  MapPin,
  ShoppingCart,
  Scissors,
  Bone,
  Phone,
  Star,
  Clock,
  X,
} from "lucide-react";

interface Store {
  id: string;
  name: string;
  type: "productos" | "servicios" | "ambos";
  rating: number;
  address: string;
  phone: string;
  services?: string[];
  products?: string[];
  hours: string;
  delivery: boolean;
  description: string;
}

const Tiendas = () => {
  const { isDarkMode, theme } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Datos de ejemplo
  const stores: Store[] = [
    {
      id: "1",
      name: "PetShop Amigos Peludos",
      type: "ambos",
      rating: 4.5,
      address: "Calle 100 #25-30, Bogotá",
      phone: "+57 123 456 7890",
      services: ["Baño", "Corte", "Veterinaria básica"],
      products: ["Alimentos", "Juguetes", "Accesorios"],
      hours: "Lun-Sab: 9am-7pm",
      delivery: true,
      description:
        "Tienda especializada en productos premium para mascotas y servicios de estética animal.",
    },
    {
      id: "2",
      name: "Super Mascotas",
      type: "productos",
      rating: 4.2,
      address: "Carrera 45 #12-34, Medellín",
      phone: "+57 987 654 3210",
      products: ["Alimentos", "Medicinas", "Camas", "Transportadoras"],
      hours: "Lun-Dom: 8am-8pm",
      delivery: true,
      description:
        "La más completa variedad de productos para tus mascotas a los mejores precios.",
    },
    {
      id: "3",
      name: "Spa Canino Mimados",
      type: "servicios",
      rating: 4.8,
      address: "Avenida 6 #78-90, Cali",
      phone: "+57 456 789 0123",
      services: ["Baño terapéutico", "Corte de raza", "Masajes", "Pedicure"],
      hours: "Mar-Vie: 10am-6pm, Sab: 9am-4pm",
      delivery: false,
      description: "Servicios de lujo para el cuidado y belleza de tu mascota.",
    },
  ];

  // Efecto para deshabilitar scroll cuando el modal está abierto
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const types = [
    { value: "productos", label: "Solo productos" },
    { value: "servicios", label: "Solo servicios" },
    { value: "ambos", label: "Productos y servicios" },
  ];

  const locations = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];

  const filteredStores = stores.filter((store) => {
    return (
      (!typeFilter || store.type === typeFilter) &&
      (!locationFilter || store.address.includes(locationFilter)) &&
      (!deliveryFilter || store.delivery)
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

  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`min-h-screen ${theme.bgColor} ${theme.textColor} py-24 md:py-24 lg:py-32`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            Tiendas para Mascotas
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
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
                <label className="block mb-2">Tipo de tienda</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={`w-full p-2 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option value="">Todos</option>
                  {types.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
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
                    checked={deliveryFilter}
                    onChange={(e) => setDeliveryFilter(e.target.checked)}
                    className="h-5 w-5 rounded"
                  />
                  <span>Con delivery</span>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className={`p-6 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } cursor-pointer hover:shadow-lg transition-shadow`}
              onClick={() => handleStoreClick(store)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-1">{store.name}</h2>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(store.rating)}
                    <span className="text-sm">({store.rating})</span>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 text-xs rounded-full ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {store.type === "productos" && "Productos"}
                  {store.type === "servicios" && "Servicios"}
                  {store.type === "ambos" && "Ambos"}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={16}
                    className={isDarkMode ? "text-gray-500" : "text-gray-600"}
                  />
                  <span className="text-sm">{store.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone
                    size={16}
                    className={isDarkMode ? "text-gray-500" : "text-gray-600"}
                  />
                  <span className="text-sm">{store.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock
                    size={16}
                    className={isDarkMode ? "text-gray-500" : "text-gray-600"}
                  />
                  <span className="text-sm">{store.hours}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {store.delivery && (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        isDarkMode
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      Delivery
                    </span>
                  )}
                </div>
                <button
                  className={`px-4 py-2 rounded-lg ${theme.buttonBg} text-white hover:opacity-90`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStoreClick(store);
                  }}
                >
                  Ver tienda
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div
            className={`p-8 text-center rounded-xl ${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <p className="text-lg">
              No se encontraron tiendas con los filtros seleccionados
            </p>
            <button
              onClick={() => {
                setTypeFilter("");
                setLocationFilter("");
                setDeliveryFilter(false);
              }}
              className={`mt-4 px-4 py-2 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Modal de detalle de tienda */}
        {showModal && selectedStore && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Fondo oscuro */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={closeModal}
            ></div>

            {/* Contenedor del modal */}
            <div className="flex items-center justify-center min-h-screen p-4">
              <div
                className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
                  isDarkMode ? "dark-scrollbar" : ""
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header del modal */}
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                  <h3 className="text-lg font-semibold dark:text-white">
                    {selectedStore.name}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Contenido del modal */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {renderStars(selectedStore.rating)}
                        <span className="text-sm">
                          ({selectedStore.rating})
                        </span>
                      </div>
                      <div
                        className={`px-2 py-1 text-xs rounded-full ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        {selectedStore.type === "productos" &&
                          "Tienda de productos"}
                        {selectedStore.type === "servicios" &&
                          "Tienda de servicios"}
                        {selectedStore.type === "ambos" &&
                          "Productos y servicios"}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="flex-shrink-0" />
                        <span>{selectedStore.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={18} className="flex-shrink-0" />
                        <span>{selectedStore.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="flex-shrink-0" />
                        <span>{selectedStore.hours}</span>
                      </div>
                      {selectedStore.delivery && (
                        <div className="flex items-center gap-2">
                          <ShoppingCart size={18} className="flex-shrink-0" />
                          <span>Servicio a domicilio disponible</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Descripción:</h3>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {selectedStore.description}
                      </p>
                    </div>

                    {selectedStore.products && (
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Bone size={18} />
                          <span>Productos disponibles:</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedStore.products.map((product, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 text-sm rounded-full ${
                                isDarkMode ? "bg-gray-700" : "bg-gray-100"
                              }`}
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedStore.services && (
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Scissors size={18} />
                          <span>Servicios ofrecidos:</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedStore.services.map((service, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 text-sm rounded-full ${
                                isDarkMode ? "bg-gray-700" : "bg-gray-100"
                              }`}
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer del modal */}
                <div className="flex justify-end p-4 border-t dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tiendas;
