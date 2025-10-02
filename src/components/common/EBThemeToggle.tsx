"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { EBButtonAction } from "../motion/EBButtonMotion";

const EBThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <EBButtonAction
      onClick={toggleTheme}
    >
      {theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}

    </EBButtonAction>
  );
};

export default EBThemeToggle;
