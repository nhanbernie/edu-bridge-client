"use client";

import { motion } from "motion/react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";

const EBNavigation = ({ items }: { items: any[] }) => {
  const { push } = useLocaleRouter();

  return (
    <>
      {items.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <button
            onClick={() => push(item.href)}
            className={`relative text-sm font-medium transition-colors hover:text-primary ${
              item.active ? "text-primary" : "text-muted-foreground"
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
          </button>
        </motion.div>
      ))}
    </>
  );
};

export default EBNavigation;
