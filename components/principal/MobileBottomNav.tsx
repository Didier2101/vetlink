"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { NavLinks } from "./navbar/NavLinks";

const MobileBottomNav = () => {
  const { theme } = useTheme();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      <div
        className={`flex justify-around items-center py-3 px-2 ${theme.bgColor} border-t ${theme.borderColor}`}
      >
        <NavLinks />
      </div>
    </div>
  );
};

export default MobileBottomNav;
