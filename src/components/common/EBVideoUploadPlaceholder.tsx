"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Play, Upload } from "lucide-react";

interface EBVideoUploadPlaceholderProps {
  onClick: () => void;
}

const EBVideoUploadPlaceholder: React.FC<EBVideoUploadPlaceholderProps> = ({ onClick }) => {
  const t = useTranslations("components.ebVideoUploadPlaceholder");

  return (
    <div
      onClick={onClick}
      className="relative w-full aspect-video bg-gradient-to-br from-muted/50 via-muted/30 to-muted/50 dark:from-muted/30 dark:via-muted/20 dark:to-muted/30 rounded-xl flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-primary hover:from-primary/10 hover:via-primary/5 hover:to-primary/10 dark:hover:from-primary/20 dark:hover:via-primary/10 dark:hover:to-primary/20 transition-all duration-300 group overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative text-center z-10">
        {/* Play Button Circle */}
        <div className="relative mx-auto mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
            <Play className="w-10 h-10 text-primary-foreground fill-primary-foreground ml-1" />
          </div>
          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-all duration-700" />
        </div>

        {/* Text */}
        <h3 className="text-foreground text-base font-semibold mb-2 group-hover:text-primary transition-colors">
          {t("noVideo")}
        </h3>
        <p className="text-muted-foreground text-xs mb-4">
          <Upload className="w-3 h-3 inline mr-1" />
          {t("uploadHint")}
        </p>

        {/* Upload Hint */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg text-sm text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
          <Upload className="w-4 h-4" />
          <span className="font-medium">{t("clickToUpload")}</span>
        </div>
      </div>
    </div>
  );
};

export default EBVideoUploadPlaceholder;
