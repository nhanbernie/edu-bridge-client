import React from "react";
import { BookOpen, User, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SessionInfoCardProps {
  courseTitle: string;
  tutorName?: string;
  studentName?: string | null;
  startTime: string;
  endTime: string;
}

const SessionInfoCard: React.FC<SessionInfoCardProps> = ({
  courseTitle,
  tutorName,
  studentName,
  startTime,
  endTime,
}) => {
  return (
    <Card className="border-0 shadow-sm bg-gray-50 dark:bg-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">{courseTitle}</span>
            </div>
            {tutorName && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">{tutorName}</span>
              </div>
            )}
            {studentName && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">{studentName}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">
                {new Date(startTime).toLocaleDateString("vi-VN")} -{" "}
                {new Date(startTime).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionInfoCard;
