import HeroSection from "@/components/public/principal/HeroSection";
import PricingSlider from "@/components/public/principal/PricingSlider";
import ServicesSlider from "@/components/public/principal/ServicesSlider";
import SmartTagSection from "@/components/public/principal/SmartTagSection";
import TestimonialsSection from "@/components/public/principal/testimonios/Testimonials";
import { prisma } from "@/src/lib/prisma";
import Loading from "@/src/ui/Loading";
import React, { Suspense } from "react";

const InicioPage = async () => {
  const plans = await prisma.plans.findMany({
    where: {
      isActive: true,
    },
    include: {
      features: true,
    },
  });



  return (
    <Suspense fallback={<Loading />}>
      <HeroSection />
      <ServicesSlider />
      <PricingSlider plans={plans} />
      <SmartTagSection />
      <TestimonialsSection />
    </Suspense>
  );
};

export default InicioPage;
