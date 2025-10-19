"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";

import { TutorOnboardingSteps, TutorStep1, TutorStep2 } from "./components";
import { useTutorOnboarding, TutorFormData } from "./hooks/useTutorOnboarding";
import { ROUTES } from "@/common/constants/route.constant";

// Component con để sử dụng useSearchParams
const TutorOnboardingContent = () => {
  const t = useTranslations("tutor.onboard");
  const searchParams = useSearchParams();
  const { push } = useLocaleRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [step1Data, setStep1Data] = useState<TutorFormData | null>(null);
  const [step1Completed, setStep1Completed] = useState(false);
  const { submitOnboarding, isLoading } = useTutorOnboarding();

  const steps = [t("steps.step1"), t("steps.step2")];

  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam === "2") {
      setCurrentStep(1);
      setStep1Completed(true);
    }
  }, [searchParams]);


  // Step 1: Call API selectRole first
  const handleStep1Next = async (data: TutorFormData) => {
    try {
      setStep1Data(data);

      const result = await submitOnboarding(data);

      if (result && result.success) {
        setStep1Completed(true);
        setCurrentStep(1);
      }
    } catch (error) { }
  };

  const handleStep2Back = () => {
    setCurrentStep(0);
  };

  // Step 2: Only upload documents (step 1 already completed)
  const handleStep2Submit = async (documents: any[]) => {
    if (!step1Completed) {
      return;
    }

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

            {currentStep === 1 && step1Completed && (
              <div className="p-8">
                <TutorStep2
                  onSubmit={handleStep2Submit}
                  onBack={handleStep2Back}
                  isLoading={false}
                />
              </div>
            )}

            {currentStep === 1 && !step1Completed && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">{t("messages.processing")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
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
