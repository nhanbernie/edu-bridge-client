import React, { useState, useEffect } from "react";
import WhiteboardPanel from "./WhiteboardPanel";

const PrepareLoading = ({ userType }: { userType: "tutor" | "student" }) => {
  const [showWhiteboard, setShowWhiteboard] = useState(false);

  return (
    <div className="text-center">
      <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
        <span className="text-4xl font-bold text-gray-600 dark:text-gray-400">
          {userType === "tutor" ? "👨‍🏫" : "👨‍🎓"}
        </span>
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {userType === "tutor" ? "Giáo viên" : "Học sinh"}
      </h2>
      <p className="text-gray-500 dark:text-gray-400">Đang chuẩn bị video...</p>
    </div>
  );
};

export default PrepareLoading;
