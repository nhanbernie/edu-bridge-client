"use client";

import React, { useState } from "react";
import { TutorOnboardingSteps, TutorStep1, TutorStep2 } from "./components";
import { useTutorOnboarding, TutorFormData } from "./hooks/useTutorOnboarding";

const TutorOnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [step1Data, setStep1Data] = useState<TutorFormData | null>(null);
  const { submitOnboarding, isLoading } = useTutorOnboarding();

  const steps = ["Thông tin cơ bản", "Tải lên hồ sơ"];

  const handleStep1Next = (data: TutorFormData) => {
    setStep1Data(data);
    setCurrentStep(1);
  };

  const handleStep2Back = () => {
    setCurrentStep(0);
  };

  const handleStep2Submit = async (files: File[]) => {
    if (step1Data) {
      // TODO: Handle file upload logic here
      // For now, just submit the step1 data
      await submitOnboarding(step1Data);
    }
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

            {currentStep === 1 && (
              <div className="p-8">
                <TutorStep2
                  onSubmit={handleStep2Submit}
                  onBack={handleStep2Back}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorOnboardingPage;
