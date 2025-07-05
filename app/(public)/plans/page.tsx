import PricingTabs from '@/components/public/principal/planes/PricingTabs';
import { prisma } from '@/src/lib/prisma';
import React from 'react'

export default async function page() {
    const plans = await prisma.plans.findMany({
        where: {
            isActive: true,
        },
        include: {
            features: true,
        },
        orderBy: {
            role: 'asc',
        },
    });

    return (
        <PricingTabs plans={plans} />
    )
}