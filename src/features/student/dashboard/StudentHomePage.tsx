
const StudentHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32 px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">My Classes</h3>
            <p className="text-3xl font-bold text-emerald-600">5</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active enrollments</p>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Completed</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Lessons finished</p>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Progress</h3>
            <p className="text-3xl font-bold text-purple-600">75%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Overall completion</p>
          </div>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <div>
                <p className="font-medium">Mathematics - Algebra</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  with Prof. Sarah Johnson
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">Today, 2:00 PM</p>
                <p className="text-sm text-green-600">Join Class</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <div>
                <p className="font-medium">Physics - Mechanics</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  with Dr. Michael Chen
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">Tomorrow, 10:00 AM</p>
                <p className="text-sm text-gray-500">Scheduled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentHomePage