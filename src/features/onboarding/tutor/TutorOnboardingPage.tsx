"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { TutorOnboardingSteps, TutorStep1, TutorStep2 } from "./components";
import { useTutorOnboarding, TutorFormData } from "./hooks/useTutorOnboarding";
import { ROUTES } from "@/common/constants/route.constant";

// Component con để sử dụng useSearchParams
const TutorOnboardingContent = () => {
  const t = useTranslations("tutor.onboard");
  const tStep1 = useTranslations("tutor.onboard.step1");
  const searchParams = useSearchParams();
  const { push } = useLocaleRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [step1Data, setStep1Data] = useState<TutorFormData | null>(null);
  const [step1Completed, setStep1Completed] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingData, setPendingData] = useState<TutorFormData | null>(null);
  const { submitOnboarding, isLoading } = useTutorOnboarding();

  const steps = [t("steps.step1"), t("steps.step2")];

  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam === "2") {
      setCurrentStep(1);
      setStep1Completed(true);
    }
  }, [searchParams]);


  // Step 1: Show confirmation dialog first
  const handleStep1Next = (data: TutorFormData) => {
    setPendingData(data);
    setShowConfirmDialog(true);
  };

  // Confirm and call API
  const handleConfirmStep1 = async () => {
    if (!pendingData) return;

    try {
      setStep1Data(pendingData);
      setShowConfirmDialog(false);

      const result = await submitOnboarding(pendingData);

      if (result && result.success) {
        setStep1Completed(true);
        setCurrentStep(1);
      }
    } catch (error) {
      console.error("Error in step 1:", error);
    }
  };

  // Cancel confirmation
  const handleCancelStep1 = () => {
    setShowConfirmDialog(false);
    setPendingData(null);
  };

  const handleStep2Back = () => {
    setCurrentStep(0);
    setStep1Completed(false); // Reset step 1 completion status
  };

  // Step 2: Upload documents
  const handleStep2Submit = async (documents: any[]) => {
    // Only redirect to home after completing step 2
    console.log("Step 2 completed, redirecting to home");
    push(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Form Content */}
      <div className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-border overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <TutorOnboardingSteps steps={steps} currentStep={currentStep} />
            </div>

            {currentStep === 0 && (
              <div className="p-8">
                <TutorStep1
                  onNext={handleStep1Next}
                  initialData={step1Data || undefined}
                  isLoading={isLoading}
                />
              </div>
            )}

            {currentStep === 1 && (
              <div className="p-8">
                <TutorStep2
                  onSubmit={handleStep2Submit}
                  isLoading={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {tStep1("confirmation.title")}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {tStep1("confirmation.description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={handleCancelStep1}
              disabled={isLoading}
              className="flex-1 sm:flex-none"
            >
              {tStep1("confirmation.buttons.cancel")}
            </Button>
            <Button
              onClick={handleConfirmStep1}
              disabled={isLoading}
              className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
            >
              {isLoading ? tStep1("confirmation.buttons.processing") : tStep1("confirmation.buttons.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Component chính với Suspense boundary
const TutorOnboardingPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <TutorOnboardingContent />
    </Suspense>
  );
};

export default TutorOnboardingPage;
