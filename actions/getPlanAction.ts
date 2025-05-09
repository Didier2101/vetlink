import { prisma } from "@/src/lib/prisma"
import { PlanType } from "@/types/planType"

export const getPlan = async (): Promise<PlanType[]> => {
    const plan = await prisma.plan.findMany({
        where: {
            isActive: true,
        },
        include: {
            features: true,
        },
    })
    return plan as PlanType[];

}