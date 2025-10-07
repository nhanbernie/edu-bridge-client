import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface TransactionHeaderProps {
  title: string;
  description: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({
  title,
  description,
  onRefresh,
  isLoading = false,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        <Button
          onClick={onRefresh}
          variant="outline"
          className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Làm mới
        </Button>
      </div>
    </div>
  );
};

export default TransactionHeader;
