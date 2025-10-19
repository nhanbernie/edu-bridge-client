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
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-2 max-w-2xl">{description}</p>
        </div>
        <Button
          onClick={onRefresh}
          variant="outline"
          className="flex items-center gap-2"
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
