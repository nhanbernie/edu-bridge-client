// Removed constants import - using theme system instead
import { useMyCoursesData } from "@/features/tutor/dashboard/hooks/useMyCoursesData";
import { EBMotionCard } from "@/components/motion";
import { useTranslations } from "next-intl";
import { DashboardSkeleton } from "@/features/tutor/dashboard/components/skeletons";
import { elegantCardVariants } from "@/common/constants/motion/cardMotion.constant";

const MyCourses = () => {
  const { courseItems, isLoading, courseError, hasCourses } = useMyCoursesData();
  const t = useTranslations("tutor.dashboard.myCourses");
  const tCommon = useTranslations("tutor.dashboard");

  if (isLoading) {
    return <DashboardSkeleton title={t("title")} />;
  }

  if (courseError) {
    return (
      <div className="bg-card rounded-3xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">{t("title")}</h3>
        <div className="flex items-center justify-center h-32">
          <div className="text-destructive">{t("error")}</div>
        </div>
      </div>
    );
  }

  if (!hasCourses) {
    return (
      <div className="bg-card rounded-3xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">{t("title")}</h3>
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">{t("empty")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-foreground mb-6">{t("title")}</h3>
      <div className="space-y-4">
        {courseItems.map((course) => (
          <EBMotionCard
            key={course.id}
            variants={elegantCardVariants}
            className="p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border-l-4 border-primary"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{course.title}</p>
                <p className="text-sm text-muted-foreground">
                  {course.studentCount} {t("students")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary">{course.status}</p>
                <p className="text-xs text-muted-foreground">{course.rating}★</p>
              </div>
            </div>
          </EBMotionCard>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
