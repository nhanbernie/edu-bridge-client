"use client";

import React, { useState } from "react";
import { useAvailabilityBlock } from "@/hooks/useAvailabilityBlock";
import { useTutorId } from "@/hooks/useTutorId";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const AvailabilityBlockDemo = () => {
  const { tutorId } = useTutorId();
  const [testCourseId, setTestCourseId] = useState("f6f9765d-9d2d-4757-8958-8d722029fa55");
  const [useCourseFiler, setUseCourseFilter] = useState(false);

  const {
    availabilityBlocks,
    isLoadingBlocks,
    isCreating,
    isUpdating,
    isDeleting,
    handleCreateBlock,
    handleUpdateBlock,
    handleDeleteBlock,
    refetchBlocks,
  } = useAvailabilityBlock({
    tutorId: tutorId || undefined,
    courseId: useCourseFiler ? testCourseId : undefined,
  });

  const [formData, setFormData] = useState({
    startTime: "2025-09-26 13:00",
    endTime: "2025-09-26 16:00",
    isBooked: false,
    isRecurring: true,
    recurrenceWeeks: 0,
  });

  const [updateData, setUpdateData] = useState({
    blockId: "",
    startTime: "",
    endTime: "",
  });

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createRequest = {
      timeRanges: [
        {
          startTime: formData.startTime,
          endTime: formData.endTime,
          isBooked: formData.isBooked,
        },
      ],
      isRecurring: formData.isRecurring,
      recurrenceWeeks: formData.recurrenceWeeks,
    };

    await handleCreateBlock(createRequest);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!updateData.blockId) return;

    await handleUpdateBlock(updateData.blockId, {
      startTime: updateData.startTime,
      endTime: updateData.endTime,
    });
  };

  const handleDelete = async (blockId: string) => {
    await handleDeleteBlock(blockId);
  };

  if (isLoadingBlocks) {
    return <div>Loading availability blocks...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Availability Block Demo</h1>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="courseId">Course ID (for testing)</Label>
            <Input
              id="courseId"
              value={testCourseId}
              onChange={(e) => setTestCourseId(e.target.value)}
              placeholder="Enter course ID"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="useCourseFilter"
              checked={useCourseFiler}
              onCheckedChange={(checked) => setUseCourseFilter(!!checked)}
            />
            <Label htmlFor="useCourseFilter">Filter by Course ID</Label>
          </div>

          <div className="flex space-x-2">
            <Button onClick={refetchBlocks} variant="outline">
              Refresh All Blocks
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Availability Block</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isBooked"
                checked={formData.isBooked}
                onCheckedChange={(checked) => setFormData({ ...formData, isBooked: !!checked })}
              />
              <Label htmlFor="isBooked">Is Booked</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isRecurring"
                checked={formData.isRecurring}
                onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: !!checked })}
              />
              <Label htmlFor="isRecurring">Is Recurring</Label>
            </div>

            <div>
              <Label htmlFor="recurrenceWeeks">Recurrence Weeks</Label>
              <Input
                id="recurrenceWeeks"
                type="number"
                value={formData.recurrenceWeeks}
                onChange={(e) =>
                  setFormData({ ...formData, recurrenceWeeks: parseInt(e.target.value) || 0 })
                }
              />
            </div>

            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Block"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Update Form */}
      <Card>
        <CardHeader>
          <CardTitle>Update Availability Block</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div>
              <Label htmlFor="updateBlockId">Block ID</Label>
              <Input
                id="updateBlockId"
                value={updateData.blockId}
                onChange={(e) => setUpdateData({ ...updateData, blockId: e.target.value })}
                placeholder="Enter block ID to update"
              />
            </div>

            <div>
              <Label htmlFor="updateStartTime">New Start Time</Label>
              <Input
                id="updateStartTime"
                type="datetime-local"
                value={updateData.startTime}
                onChange={(e) => setUpdateData({ ...updateData, startTime: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="updateEndTime">New End Time</Label>
              <Input
                id="updateEndTime"
                type="datetime-local"
                value={updateData.endTime}
                onChange={(e) => setUpdateData({ ...updateData, endTime: e.target.value })}
              />
            </div>

            <Button type="submit" disabled={isUpdating || !updateData.blockId}>
              {isUpdating ? "Updating..." : "Update Block"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Availability Blocks List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {useCourseFiler
              ? `Availability Blocks (Filtered by Course: ${testCourseId})`
              : "All Availability Blocks"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {availabilityBlocks.length === 0 ? (
            <p>No availability blocks found.</p>
          ) : (
            <div className="space-y-4">
              {availabilityBlocks.map((block) => (
                <div key={block.blockId} className="border p-4 rounded">
                  <p>
                    <strong>Block ID:</strong> {block.blockId}
                  </p>
                  <p>
                    <strong>Tutor ID:</strong> {block.tutorId}
                  </p>
                  <p>
                    <strong>Start Time:</strong> {block.startTime}
                  </p>
                  <p>
                    <strong>End Time:</strong> {block.endTime}
                  </p>
                  <p>
                    <strong>Week Number:</strong> {block.weekNumber}
                  </p>
                  <p>
                    <strong>Is Recurring:</strong> {block.isRecurring ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Recurrence Weeks:</strong> {block.recurrenceWeeks}
                  </p>
                  <p>
                    <strong>Created At:</strong> {block.createdAt}
                  </p>
                  <p>
                    <strong>Updated At:</strong> {block.updatedAt || "N/A"}
                  </p>

                  {block.slots && block.slots.length > 0 && (
                    <div className="mt-2">
                      <strong>Slots:</strong>
                      <ul className="ml-4 mt-1">
                        {block.slots.map((slot, index) => (
                          <li key={index} className="text-sm">
                            {slot.startTime} - {slot.endTime}
                            <span
                              className={`ml-2 px-2 py-1 rounded text-xs ${
                                slot.isBooked
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {slot.isBooked ? "Booked" : "Available"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    onClick={() => handleDelete(block.blockId)}
                    disabled={isDeleting}
                    variant="destructive"
                    className="mt-2"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
