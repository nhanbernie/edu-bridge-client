"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TutorOnboardingSteps, TutorStep1, TutorStep2 } from "./components";
import { useTutorOnboarding, TutorFormData } from "./hooks/useTutorOnboarding";

const TutorOnboardingPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [step1Data, setStep1Data] = useState<TutorFormData | null>(null);
  const [step1Completed, setStep1Completed] = useState(false);
  const { submitOnboarding, isLoading } = useTutorOnboarding();

  const steps = ["Thông tin cơ bản", "Tải lên hồ sơ"];

  // Step 1: Call API selectRole first
  const handleStep1Next = async (data: TutorFormData) => {
    try {
      setStep1Data(data);

      // Call API step 1 first
      const result = await submitOnboarding(data);

      if (result && result.success) {
        setStep1Completed(true);
        setCurrentStep(1);
      }
      // If failed, stay at step 1 (error handled in hook)
    } catch (error) {
      // Error handled in hook, stay at step 1
      console.error("Step 1 submission failed:", error);
    }
  };

  const handleStep2Back = () => {
    setCurrentStep(0);
  };

  // Step 2: Only upload documents (step 1 already completed)
  const handleStep2Submit = async (documents: any[]) => {
    if (!step1Completed) {
      console.error("Step 1 must be completed first");
      return;
    }

    // Documents uploaded successfully in TutorStep2
    // Redirect to home after completing all steps
    console.log("All steps completed!", documents);
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 mt-16">
      {/* Form Content */}
      <div className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <TutorOnboardingSteps steps={steps} currentStep={currentStep} />
            </div>

            {/* Step Content */}
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
                <p className="text-gray-600">Đang xử lý thông tin bước 1...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorOnboardingPage;
