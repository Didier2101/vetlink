// src/utils/planUtils.ts
interface PlanStatus {
    status: "active" | "trial" | "expired";
    message: string;
    isTrial: boolean;
}

export function calculatePlanStatus({
    isTrial,
    trialEndsAt,
    planExpiresAt,
}: {
    isTrial: boolean;
    trialEndsAt?: string;
    planExpiresAt?: string;
}): PlanStatus | null {
    const now = new Date();
    const trialEnd = trialEndsAt ? new Date(trialEndsAt) : null;
    const planExpire = planExpiresAt ? new Date(planExpiresAt) : null;

    if (isTrial && trialEnd && trialEnd > now) {
        const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return {
            status: "trial",
            message: `Prueba gratuita (${daysLeft} días restantes)`,
            isTrial: true,
        };
    }

    if (planExpire && planExpire > now) {
        return {
            status: "active",
            message: "Plan activo",
            isTrial: false,
        };
    }

    return {
        status: "expired",
        message: "Plan expirado",
        isTrial: false,
    };
}