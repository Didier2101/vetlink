export interface Plan {
    id: string;
    title: string;
    description: string;
    price: string;
    period: string;
    features: string[];
    buttonText: string;
    buttonVariant: "primary" | "secondary";
    popular: boolean;
    category: "owner" | "vet" | "clinic" | "store"; // Nueva categoría "store"
}

export const plans: Plan[] = [
    // Planes para Dueños
    {
        id: "owner-basic",
        title: "Dueño Básico",
        description: "Perfecto para dueños con una mascota",
        price: "$0",
        period: "/mes",
        features: [
            "1 mascota ",
            "Historial médico básico",
            "Recordatorios de vacunas",
            "Acceso a tiendas asociadas"
        ],
        buttonText: "Registrarse gratis",
        buttonVariant: "secondary",
        popular: false,
        category: "owner",
    },
    {
        id: "owner-premium",
        title: "Dueño Premium",
        description: "Para dueños con múltiples mascotas",
        price: "$4.900",
        period: "/mes",
        features: [
            "Mascotas ilimitadas",
            "Historial médico completo",
            "Descuentos en tiendas asociadas",
            "Recordatorios personalizados",
            "Acceso prioritario"
        ],
        buttonText: "Contratar plan",
        buttonVariant: "primary",
        popular: true,
        category: "owner",
    },

    // Plan para Veterinarios
    {
        id: "vet-professional",
        title: "Veterinario Profesional",
        description: "Para clínicas individuales",
        price: "$29.000",
        period: "/mes",
        features: [
            "Gestión de pacientes ilimitados",
            "Agenda de citas digital",
            "Historiales médicos completos",
            "Soporte técnico prioritario",
            "Perfil profesional verificado"
        ],
        buttonText: "Registrarse",
        buttonVariant: "primary",
        popular: false,
        category: "vet",
    },

    // Plan para Clínicas
    {
        id: "clinic-standard",
        title: "Clínica Estándar",
        description: "Para clínicas veterinarias",
        price: "$49.900",
        period: "/mes",
        features: [
            "Hasta 3 veterinarios",
            "Gestión de inventario",
            "Facturación electrónica",
            "Portal para clientes",
            "Soporte 24/7"
        ],
        buttonText: "Contactar ventas",
        buttonVariant: "primary",
        popular: false,
        category: "clinic",
    },

    // Nuevo Plan para Tiendas (Gratis)
    {
        id: "store-basic",
        title: "Tienda Básica",
        description: "Para tiendas de productos para mascotas",
        price: "$0",
        period: "/mes",
        features: [
            "Perfil público visible",
            "Listado de productos/servicios",
            "Ubicación en mapa",
            "Horarios de atención",
            "Contacto directo"
        ],
        buttonText: "Registrar tienda",
        buttonVariant: "secondary",
        popular: false,
        category: "store",
    }
];