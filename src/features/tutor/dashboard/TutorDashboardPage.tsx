"use client";

import { useTranslations } from "next-intl";
import {
  CARD_BASE,
  CARD_COLORS,
  ROUNDED,
  SHADOW,
  CARD_TEXT,
} from "@/common/constants/css/card.constant";
import { TransactionChart } from "./components/TransactionChart";
import Schedules from "./components/Schedules";
import Review from "./components/Review";
import MyCourses from "./components/MyCourses";

const TutorDashboardPage = () => {
  const t = useTranslations("tutor.dashboard");

  return (
    <div className="max-w-8xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <TransactionChart />
        </div>

        <div className="lg:col-span-2">
          <Schedules />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MyCourses />
        </div>

        <div className="lg:col-span-1">
          <Review />
        </div>
      </div>
    </div>
  );
};

export default TutorDashboardPage;
