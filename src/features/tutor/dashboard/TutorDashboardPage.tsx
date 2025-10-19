"use client";

import { useTranslations } from "next-intl";
import { MotionContainer, MotionItem } from "@/components/motion";
import { TransactionChart } from "./components/TransactionChart";
import Schedules from "./components/Schedules";
import Review from "./components/Review";
import MyCourses from "./components/MyCourses";

const TutorDashboardPage = () => {
  const t = useTranslations("tutor.dashboard");

  return (
    <MotionContainer className="max-w-8xl mx-auto space-y-6 lg:space-y-8 p-4 sm:p-6">
      {/* Header Section */}
      {/* <MotionItem className="mb-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">{t("welcome")} 👋</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </MotionItem> */}

      {/* First Row - Chart and Schedules */}
      <MotionItem>
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 lg:gap-8">
          <div className="xl:col-span-3">
            <TransactionChart />
          </div>

          <div className="xl:col-span-2">
            <Schedules />
          </div>
        </div>
      </MotionItem>

      {/* Second Row - Courses and Reviews */}
      <MotionItem>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <MyCourses />
          </div>

          <div className="xl:col-span-1">
            <Review />
          </div>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default TutorDashboardPage;
