"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PlanType } from "@/types/planType";
import PlanCard from "./placa/PlanCard";
import { concert_one } from "@/src/lib/fonts";

interface PricingSliderProps {
  plans: PlanType[];
}

const PricingSlider = ({ plans }: PricingSliderProps) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: plans.length > 1,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "12.5%", // 12.5% cada lado = 75% para la card principal
    swipe: true, // Habilita el swipe táctil
    touchMove: true, // Habilita el movimiento táctil
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "12.5%",
          infinite: plans.length > 1,
          swipe: true,
          touchMove: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "10%",
          infinite: plans.length > 1,
          swipe: true,
          touchMove: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "5%",
          infinite: plans.length > 1,
          swipe: true,
          touchMove: true,
        },
      },
    ],
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">

        <h2 className={`${concert_one.className}  text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent`}>
          Planes para todos
        </h2>
        <p className="text-center mb-12 text-gray-600">
          Elige el plan perfecto para dueños, veterinarios o clínicas
          veterinarias.
        </p>

        <div className="relative">
          {/* Botones sobrepuestos - solo visibles en md+ */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-xl items-center justify-center hover:bg-gray-900 dark:hover:bg-gray-800 hover:shadow-2xl transition-all duration-300 group"
          >
            <ChevronLeft size={32} className="text-gray-400 group-hover:text-gray-100" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-xl items-center justify-center hover:bg-gray-900 dark:hover:bg-gray-800 hover:shadow-2xl transition-all duration-300 group"
          >
            <ChevronRight size={32} className="text-gray-400 group-hover:text-gray-100" />
          </button>

          <Slider ref={sliderRef} {...settings} className="pricing-slider [&_.slick-slide]:transition-all [&_.slick-slide]:duration-300 [&_.slick-slide:not(.slick-center)]:opacity-60 [&_.slick-slide:not(.slick-center)]:scale-95 [&_.slick-center]:opacity-100 [&_.slick-center]:scale-100 [&_.slick-list]:overflow-visible">
            {plans.map((plan) => (
              <div key={plan.id} className="outline-none px-2">
                <div className="w-full">
                  <PlanCard plan={plan} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PricingSlider;