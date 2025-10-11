const TutorDashboardPage = () => {
  return (
    <div className="max-w-8xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tutor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">My Students</h3>
          <p className="text-3xl font-bold text-emerald-600">24</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active students</p>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Classes Today</h3>
          <p className="text-3xl font-bold text-blue-600">3</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Scheduled lessons</p>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Rating</h3>
          <p className="text-3xl font-bold text-yellow-600">4.9</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average rating</p>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Earnings</h3>
          <p className="text-3xl font-bold text-green-600">$2,350</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Today&apos;s Schedule</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <div>
                <p className="font-medium">Math Tutoring</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Jenny Wilson</p>
              </div>
              <div className="text-right">
                <p className="font-medium">9:00 AM</p>
                <p className="text-sm text-green-600">In Progress</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <div>
                <p className="font-medium">Physics Lab</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Group Session</p>
              </div>
              <div className="text-right">
                <p className="font-medium">2:00 PM</p>
                <p className="text-sm text-blue-600">Upcoming</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Chemistry Review</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">David Martinez</p>
              </div>
              <div className="text-right">
                <p className="font-medium">4:30 PM</p>
                <p className="text-sm text-blue-600">Upcoming</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="ml-2 font-medium">Emma Watson</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &ldquo;Excellent teaching style! Really helped me understand calculus.&rdquo;
              </p>
            </div>
            <div className="border-b border-gray-100 dark:border-gray-700 pb-3">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="ml-2 font-medium">Alex Johnson</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &ldquo;Very patient and explains concepts clearly.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboardPage;
