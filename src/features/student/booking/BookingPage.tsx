"use client";

import React, { useState } from "react";
import {
  TutorInfo,
  PackageSelector,
  ScheduleSelector,
  BookingButton,
  SelectedSchedule,
} from "./components";

interface BookingPageProps {
  tutorId: string;
  courseId?: string;
}

interface SelectedSession {
  date: Date;
  timeSlot: string;
  sessionNumber: number;
}

const BookingPage = ({ tutorId, courseId }: BookingPageProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedSessions, setSelectedSessions] = useState<SelectedSession[]>([]);

  const handleAddSession = () => {
    if (selectedDate && selectedTime) {
      const newSession: SelectedSession = {
        date: selectedDate,
        timeSlot: selectedTime,
        sessionNumber: selectedSessions.length + 1,
      };
      setSelectedSessions([...selectedSessions, newSession]);
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  const handleRemoveSession = (sessionNumber: number) => {
    setSelectedSessions((sessions) =>
      sessions
        .filter((s) => s.sessionNumber !== sessionNumber)
        .map((s, index) => ({ ...s, sessionNumber: index + 1 }))
    );
  };

  const handleEditSession = (sessionNumber: number) => {
    const session = selectedSessions.find((s) => s.sessionNumber === sessionNumber);
    if (session) {
      setSelectedDate(session.date);
      setSelectedTime(session.timeSlot);
      handleRemoveSession(sessionNumber);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tutor Info + Packages */}
          <div className="lg:col-span-1 space-y-6">
            <TutorInfo tutorId={tutorId} courseId={courseId} />
            <PackageSelector
              selectedPackage={selectedPackage}
              onPackageChange={setSelectedPackage}
            />
          </div>

          {/* Right Column - Schedule + Booking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Schedule Selector */}
            <ScheduleSelector
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />

            {/* Add Session Button */}
            {selectedDate && selectedTime && (
              <div className="flex justify-center">
                <button
                  onClick={handleAddSession}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Thêm buổi học
                </button>
              </div>
            )}

            {/* Selected Sessions */}
            {selectedSessions.length > 0 && (
              <SelectedSchedule
                sessions={selectedSessions}
                onRemoveSession={handleRemoveSession}
                onEditSession={handleEditSession}
              />
            )}

            {/* Booking Button */}
            <BookingButton
              disabled={selectedSessions.length === 0 || !selectedPackage}
              onBook={() => {
                console.log("Booking:", {
                  tutorId,
                  courseId,
                  selectedSessions,
                  selectedPackage,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
