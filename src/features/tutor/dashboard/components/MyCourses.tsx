import { CARD_BASE, ROUNDED } from "@/common/constants/css/card.constant";
import { useMyCoursesData } from "@/features/tutor/dashboard/hooks/useMyCoursesData";

const MyCourses = () => {
  const { courseItems, isLoading, courseError, hasCourses } = useMyCoursesData();

  if (isLoading) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Khóa học của tôi</h3>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Đang tải khóa học...</div>
        </div>
      </div>
    );
  }

  if (courseError) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Khóa học của tôi</h3>
        <div className="flex items-center justify-center h-32">
          <div className="text-red-500">Không thể tải khóa học</div>
        </div>
      </div>
    );
  }

  if (!hasCourses) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Khóa học của tôi</h3>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Chưa có khóa học nào</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Khóa học của tôi</h3>
      <div className="space-y-4">
        {courseItems.map((course) => (
          <div
            key={course.id}
            className={`p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20 ${ROUNDED.LG} border-l-4 border-gray-400`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{course.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course.studentCount} học sinh đang học
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">{course.status}</p>
                <p className="text-xs text-gray-500">{course.rating}★</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
