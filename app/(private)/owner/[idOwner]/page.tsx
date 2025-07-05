import Perfil from '@/components/privado/owner/Perfil';
import { prisma } from '@/src/lib/prisma';

export default async function OwnerProfilePage({ params }: { params: { idOwner: string } }) {

    const { idOwner } = params;
    const numericIdOwner = Number(idOwner);

    // Obtener datos del owner con Prisma
    const owner = await prisma.users.findUnique({
        where: { id: numericIdOwner },
        include: {
            owners: true,
            plans: true
        }
    });


    if (!owner) {
        return <div>No se encontró el propietario.</div>;
    }

    // Ensure isProfileComplete is always a boolean
    const ownerWithDefaults = {
        ...owner,
        isProfileComplete: owner.isProfileComplete ?? false,
        isTrial: owner.isTrial ?? false,
        plans: {
            id: owner.plans.id,
            title: owner.plans.title,
            description: owner.plans.description,
            price: owner.plans.price,
            period: owner.plans.period,
            isFree: owner.plans.isFree,
            role: owner.plans.role,
            features: []
        }
    } as {
        id: number;
        email: string;
        isProfileComplete: boolean;
        createdAt: Date;
        isTrial: boolean;
        trialEndsAt: Date | null;
        planStartedAt: Date | null;
        planExpiresAt: Date | null;
        owners: {
            id: number;
            name: string;
            lastName: string;
            phone: string;
            secondaryPhone: string | null;
            city: string;
            neighborhood: string;
            address: string;
            createdAt: Date;
        };
        plans: {
            id: number;
            title: string;
            description: string;
            price: number;
            period: string;
            isFree: boolean;
            role: string;
            features: string[];
        };
    };

    return (
        <Perfil owner={ownerWithDefaults} />
    );
}