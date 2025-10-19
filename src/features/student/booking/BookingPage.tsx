"use client";

import React, { useState, useEffect } from "react";
import {
  TutorInfo,
  PackageSelector,
  ScheduleSelector,
  SelectedSchedule,
  PaymentConfirmDialog,
} from "./components";
import PaymentQRCodeDialog from "./components/PaymentQRCodeDialog";
import { useBookingFlow } from "./hooks";
import { Button } from "@/components/ui/button";
import { useManageCourses } from "@/features/tutor/courses/hooks/useManageCourses";
import { useAvailabilityBlock } from "@/hooks/useAvailabilityBlock";
import BookingGuideModal from "@/features/student/booking/components/BookingGuideModal";
import { useTranslations } from "next-intl";

interface BookingPageProps {
  tutorId: string;
  courseId?: string;
}

interface SelectedSession {
  date: Date;
  timeSlot: string;
  sessionNumber: number;
  blockId: string;
}

const BOOKING_GUIDE_KEY = "edubridge_booking_guide_seen";

const BookingPage = ({ tutorId, courseId }: BookingPageProps) => {
  const t = useTranslations("student.booking");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedSessions, setSelectedSessions] = useState<SelectedSession[]>([]);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // API hooks
  const coursesHook = useManageCourses(tutorId, courseId);
  const availabilityHook = useAvailabilityBlock({
    tutorId,
    courseId,
  });

  // Booking flow hook
  const bookingFlow = useBookingFlow({ tutorId, courseId });

  // Check if user has seen the guide
  useEffect(() => {
    const hasSeenGuide = localStorage.getItem(BOOKING_GUIDE_KEY);
    if (!hasSeenGuide) {
      setShowGuideModal(true);
    }
  }, []);

  // Handle close guide modal
  const handleCloseGuide = () => {
    setShowGuideModal(false);
    localStorage.setItem(BOOKING_GUIDE_KEY, "true");
  };

  // Get total sessions from package using API data
  const getPackageSessions = (packageId: string | null) => {
    if (!packageId || !coursesHook.packages) return 0;

    const selectedPackage = coursesHook.packages.find((pkg) => pkg.packageId === packageId);
    return selectedPackage ? selectedPackage.numberOfSessions : 0;
  };

  const totalSessions = getPackageSessions(selectedPackage);
  const currentSessionCount = selectedSessions.length;
  const isScheduleDisabled = currentSessionCount >= totalSessions;

  const handleAddSession = () => {
    if (selectedDate && selectedTime && selectedBlockId && currentSessionCount < totalSessions) {
      const newSession: SelectedSession = {
        date: selectedDate,
        timeSlot: selectedTime,
        sessionNumber: selectedSessions.length + 1,
        blockId: selectedBlockId,
      };
      setSelectedSessions([...selectedSessions, newSession]);
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedBlockId(null);
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
      setSelectedBlockId(session.blockId);
      handleRemoveSession(sessionNumber);
    }
  };

  return (
    <>
      {/* Booking Guide Modal */}
      <BookingGuideModal isOpen={showGuideModal} onClose={handleCloseGuide} />

      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Tutor Info + Packages */}
            <div className="lg:col-span-1 space-y-6">
              <TutorInfo tutorId={tutorId} courseId={courseId} />
              <PackageSelector
                selectedPackage={selectedPackage}
                onPackageChange={setSelectedPackage}
                packages={coursesHook.packages}
                isLoading={coursesHook.isPackagesLoading}
              />
            </div>

            {/* Right Column - Schedule + Booking */}
            <div className="lg:col-span-2 space-y-6">
              {/* Schedule Selector */}
              <ScheduleSelector
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedBlockId={selectedBlockId}
                selectedPackage={selectedPackage}
                onDateChange={setSelectedDate}
                onTimeChange={(time, blockId) => {
                  setSelectedTime(time);
                  setSelectedBlockId(blockId);
                }}
                onAddSession={handleAddSession}
                currentSessionCount={currentSessionCount}
                totalSessions={totalSessions}
                isDisabled={isScheduleDisabled}
                tutorId={tutorId}
                courseId={courseId}
                availabilityBlocks={availabilityHook.availabilityBlocks}
                isLoadingAvailability={availabilityHook.isLoadingBlocks}
                selectedSessions={selectedSessions}
              />

              {/* Selected Sessions */}
              {selectedSessions.length > 0 && (
                <SelectedSchedule
                  sessions={selectedSessions}
                  onRemoveSession={handleRemoveSession}
                  onEditSession={handleEditSession}
                />
              )}

              {/* Booking Button */}
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    if (selectedPackage && selectedSessions.length === totalSessions) {
                      bookingFlow.handleCreateBooking({
                        selectedPackage,
                        selectedSessions,
                      });
                    }
                  }}
                  disabled={
                    currentSessionCount < totalSessions ||
                    !selectedPackage ||
                    totalSessions === 0 ||
                    bookingFlow.isLoading
                  }
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground py-3 text-base font-medium"
                  size="lg"
                >
                  {bookingFlow.isLoading
                    ? t("page.processing")
                    : currentSessionCount < totalSessions || !selectedPackage || totalSessions === 0
                      ? t("page.selectAll")
                      : t("page.bookNow")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Confirmation Dialog */}
        <PaymentConfirmDialog
          open={bookingFlow.showPaymentDialog}
          onConfirm={bookingFlow.handleConfirmPayment}
          onCancel={bookingFlow.handleCancelPayment}
          isLoading={bookingFlow.isLoading}
          bookingId={bookingFlow.bookingId}
        />

        {/* QR Code Dialog */}
        {bookingFlow.paymentData && (
          <PaymentQRCodeDialog
            isOpen={bookingFlow.showQRDialog}
            onClose={bookingFlow.handleCloseQRDialog}
            paymentData={bookingFlow.paymentData}
          />
        )}
      </div>
    </>
  );
};

export default BookingPage;
