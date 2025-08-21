import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  number: string;
  label: string;
  iconColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  number,
  label,
  iconColor = "text-blue-600",
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900">{number}</div>
          <div className="text-xs text-gray-600 leading-tight">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
