"use client";

import React, { useState } from "react";
import { calculatePrice, getPeriodLabel, BillingType } from "@/src/utils/pricing";
import {
  Check,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PlanType } from "@/types/planType";
import { concert_one } from "@/src/lib/fonts";

interface PlanCardProps {
  plan: PlanType;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const [billingType, setBillingType] = useState<BillingType>('MONTHLY');


  const router = useRouter();
  const roleName = plan.role;



  const handleRegisterClick = () => {
    const finalPrice = calculatePrice(plan.price, billingType, plan.isFree);
    const params = new URLSearchParams({
      planId: plan.id.toString(),
      role: plan.role,
      planTitle: plan.title,
      planBasePrice: plan.price.toString(), // solo por transparencia
      planFinalPrice: finalPrice.toString(), // este es el precio real a cobrar
      billingType: billingType, // MONTHLY o YEARLY
      planDescription: plan.description,
      planPeriod: getPeriodLabel(billingType, plan.isFree),
      features: JSON.stringify(
        plan.features?.map((f) => ({ name: f.name, id: f.id })) || []
      ),
    });
    // Convertir URLSearchParams a un objeto para mejor visualización
    // const paramsObj = Object.fromEntries(params.entries());

    // console.log("Parámetros que se enviarán:", paramsObj);

    // Si quieres ver también cómo queda la URL completa:
    // const url = `/auth/register?${params.toString()}`;
    // console.log("URL completa:", url);

    router.push(`/auth/register?${params.toString()}`);
  };


  return (
    <div className={`relative flex flex-col h-[600px] p-6 rounded-2xl border border-gray-200 dark:border-gray-700  hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900`}>
      {!plan.isFree && (
        <div className="absolute top-4 right-4  px-3 py-1 text-xs font-bold uppercase rounded-full bg-green-500 text-white shadow-md">
          3 meses gratis
        </div>
      )}


      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-md mb-6">
        <ShoppingCart />
      </div>

      <h3 className={`${concert_one.className}  text-4xl font-bold  mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent`}>
        {plan.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
        {plan.description}
      </p>

      {/* Selector mensual/anual solo si no es gratis */}
      {!plan.isFree && (
        <div className="mb-2">
          <select
            value={billingType}
            onChange={(e) => setBillingType(e.target.value as BillingType)}
            className="text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          >
            <option value="MONTHLY">Mensual</option>
            <option value="YEARLY">Anual</option>
          </select>
        </div>
      )}

      <div className="my-4 flex items-baseline space-x-2">
        <span className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent">
          {plan.isFree
            ? "Gratis"
            : `$${calculatePrice(plan.price, billingType, plan.isFree).toLocaleString()}`}
        </span>
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {getPeriodLabel(billingType, plan.isFree)}
        </span>
      </div>



      <div className="flex-1 overflow-y-auto mb-6 space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {plan.features?.map((fac) => (
          <div key={fac.id} className="flex items-start">
            <div className="inline-flex items-center p-1 justify-center w-5 h-5 bg-green-500/20 dark:bg-green-500/30 rounded-full mr-3 mt-0.5">
              <Check size={14} className="text-green-600 dark:text-green-400" />
            </div>
            <span className="text-gray-600 dark:text-gray-300">{fac.name}</span>
          </div>
        ))}
      </div>
      {/* Agregado manualmente al final de los features */}

      <button
        onClick={handleRegisterClick}
        className={`group relative w-full py-4 px-6 rounded-2xl text-white font-semibold transition-all duration-300 mt-auto shadow-lg hover:shadow-xl hover:scale-[1.02] overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800}`}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <span className="relative">
          {roleName === "store"
            ? "Registrar tienda"
            : plan.title.includes("Premium")
              ? "Contratar plan"
              : "Registrarse"}
        </span>
      </button>
    </div>
  );
};

export default PlanCard;