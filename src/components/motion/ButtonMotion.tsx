"use client";

import { motion } from "motion/react";

export const ButtonAction = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    >
      {children}
    </motion.button>
  );
};
