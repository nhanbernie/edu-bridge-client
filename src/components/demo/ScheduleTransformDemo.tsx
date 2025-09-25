"use client";

import React from "react";
import { useAvailabilityBlock } from "@/hooks/useAvailabilityBlock";
import { useTutorId } from "@/hooks/useTutorId";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EBSchedule from "@/components/common/EBSchedule";
import { transformToCurrentWeekSchedule, getScheduleSummary } from "@/utils/scheduleTransform";
import { RefreshCw } from "lucide-react";

export const ScheduleTransformDemo = () => {
  const { tutorId } = useTutorId();
  const {
    availabilityBlocks,
    isLoadingBlocks,
    refetchBlocks,
  } = useAvailabilityBlock({
    tutorId: tutorId || undefined,
  });

  const transformedSchedule = transformToCurrentWeekSchedule(availabilityBlocks);
  const summary = getScheduleSummary(availabilityBlocks);

  if (isLoadingBlocks) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Schedule Transform Demo</h1>
          <p className="text-gray-600">
            Transform API data to EBSchedule format • {summary.totalSlots} slots 
            ({summary.availableSlots} available, {summary.bookedSlots} booked)
          </p>
        </div>
        <Button onClick={refetchBlocks} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Raw API Data */}
      <Card>
        <CardHeader>
          <CardTitle>Raw API Data ({availabilityBlocks.length} blocks)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
            {JSON.stringify(availabilityBlocks, null, 2)}
          </pre>
        </CardContent>
      </Card>

      {/* Transformed Schedule Data */}
      <Card>
        <CardHeader>
          <CardTitle>Transformed Schedule Data</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
            {JSON.stringify(transformedSchedule, null, 2)}
          </pre>
        </CardContent>
      </Card>

      {/* EBSchedule Component */}
      <Card>
        <CardHeader>
          <CardTitle>EBSchedule Component (Week View)</CardTitle>
        </CardHeader>
        <CardContent>
          <EBSchedule
            scheduleData={transformedSchedule}
            mode="week"
            showDate={true}
            showHeader={false}
          />
        </CardContent>
      </Card>

      {/* EBSchedule Component - List View */}
      <Card>
        <CardHeader>
          <CardTitle>EBSchedule Component (List View)</CardTitle>
        </CardHeader>
        <CardContent>
          <EBSchedule
            scheduleData={transformedSchedule}
            mode="list"
            showDate={true}
            showHeader={false}
          />
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{summary.totalBlocks}</div>
              <div className="text-sm text-blue-800">Total Blocks</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{summary.totalSlots}</div>
              <div className="text-sm text-green-800">Total Slots</div>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded">
              <div className="text-2xl font-bold text-emerald-600">{summary.availableSlots}</div>
              <div className="text-sm text-emerald-800">Available</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded">
              <div className="text-2xl font-bold text-orange-600">{summary.bookedSlots}</div>
              <div className="text-sm text-orange-800">Booked</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
