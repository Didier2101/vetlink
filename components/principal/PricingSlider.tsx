"use client";

import React, { FC, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlanCard from "./placa/PlanCard";
import { PlanType } from "@/types/planType";

interface PricingSliderProps {
  plan: PlanType[];
}

const PricingSlider: FC<PricingSliderProps> = ({ plan }) => {
  const { isDarkMode, theme } = useTheme();
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
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
    <section className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold text-center mb-4 ${theme.textColor}`}
        >
          Planes para todos
        </h2>
        <p
          className={`text-center mb-12 max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Elige el plan perfecto para dueños, veterinarios o clínicas
          veterinarias.
        </p>

        <div className="relative">
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={prevSlide}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              } transition-colors`}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              } transition-colors`}
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <Slider ref={sliderRef} {...settings} className="pricing-slider">
            {plan.map((pl) => (
              <div key={pl.id} className="px-2 outline-none">
                <PlanCard pl={pl} isDarkMode={isDarkMode} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PricingSlider;
