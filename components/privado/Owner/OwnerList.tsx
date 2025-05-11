"use client";

import { useTheme } from "@/components/principal/ThemeProvider";
import React from "react";
import OwnerProfileForm from "./OwnerProfileForm";

const OwnerList = () => {
  const { theme } = useTheme();
  return (
    <section
      className={`relative ${theme.bgColor} py-24 md:py-24 lg:py-32 overflow-hidden min-h-[80vh] flex items-center`}
    >
      <OwnerProfileForm />
    </section>
  );
};

export default OwnerList;
