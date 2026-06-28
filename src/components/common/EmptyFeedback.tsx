import React from "react";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

const EmptyFeedback: React.FC = () => {
  const t = useTranslations("student.tutor.tabs");

  return (
    <div className="text-center py-12">
      <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-primary mb-2">{t("reviews.empty.title")}</h3>
      <p className="text-gray-500">{t("reviews.empty.description")}</p>
    </div>
  );
};

export default EmptyFeedback;
