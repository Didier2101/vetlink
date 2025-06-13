// src/utils/planUtils.ts

export const calculatePlanStatus = (plan: {
    isTrial?: boolean;
    trialPeriodDays?: number;
    planStartedAt?: string;
    planExpiresAt?: string;
}) => {
    if (!plan.planExpiresAt) {
        return {
            status: "active",
            message: "Plan activo sin fecha de expiración",
            daysRemaining: Infinity,
            isTrial: false
        };
    }

    const now = new Date();
    const expiresAt = new Date(plan.planExpiresAt);
    const timeDiff = expiresAt.getTime() - now.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const isActive = daysRemaining > 0;
    const isTrial = plan.isTrial || false;

    let status = "active";
    let message = "";

    if (isTrial) {
        if (isActive) {
            message = `Prueba gratis - ${daysRemaining} día${daysRemaining !== 1 ? 's' : ''} restante${daysRemaining !== 1 ? 's' : ''}`;
        } else {
            status = "expired";
            message = "Prueba gratis finalizada";
        }
    } else {
        if (isActive) {
            message = `Plan activo - ${daysRemaining} día${daysRemaining !== 1 ? 's' : ''} restante${daysRemaining !== 1 ? 's' : ''}`;
        } else {
            status = "expired";
            message = "Plan expirado";
        }
    }

    return {
        status,
        message,
        daysRemaining,
        isTrial
    };
};