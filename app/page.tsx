import CTASection from "@/components/principal/CTASection";
import HeroSection from "@/components/principal/HeroSection";
import HowItWorks from "@/components/principal/HowItWorks";
import PricingSlider from "@/components/principal/PricingSlider";
import ServicesSlider from "@/components/principal/ServicesSlider";
import SmartTagSection from "@/components/principal/SmartTagSection";
import TestimonialsSection from "@/components/principal/Testimonials";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSlider />
      <HowItWorks />
      <PricingSlider />
      <SmartTagSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
