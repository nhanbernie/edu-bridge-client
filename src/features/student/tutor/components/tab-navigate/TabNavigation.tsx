"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "courses", label: "Khóa học" },
  { id: "schedule", label: "Lịch rảnh" },
  { id: "reviews", label: "Đánh giá" },
  { id: "awards", label: "Awards" },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex w-full">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 py-4 px-4 text-center font-medium text-sm transition-all duration-200 relative"
            )}
            style={{
              borderRadius:
                index === 0 ? "12px 0 0 0" : index === tabs.length - 1 ? "0 12px 0 0" : "0",
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
