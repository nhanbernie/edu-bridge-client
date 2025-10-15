"use client";

import React from "react";

interface EBEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EBEmptyState: React.FC<EBEmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
      {icon && <div className="mb-3 flex justify-center">{icon}</div>}
      <p className="text-gray-600 text-sm mb-2 font-medium">{title}</p>
      {description && <p className="text-gray-500 text-xs mb-4">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EBEmptyState;
