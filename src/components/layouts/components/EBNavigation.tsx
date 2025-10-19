"use client";

import { motion } from "motion/react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { useState } from "react";

const EBNavigation = ({ items }: { items: any[] }) => {
  const { push } = useLocaleRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {items.map((item, index) => (
        <motion.div
          key={`${item.href}-${index}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
        >
          <button
            onClick={() => push(item.href)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative text-sm font-medium transition-colors hover:text-primary hover:cursor-pointer ${item.active ? "text-primary" : "text-muted-foreground"
              }`}
          >
            {item.label}
            {item.active && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {!item.active && hoveredIndex === index && (
              <motion.div
                initial={{ scaleX: 0, originX: 0.5 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
              />
            )}
          </button>
        </motion.div>
      ))}
    </>
  );
};

export default EBNavigation;
