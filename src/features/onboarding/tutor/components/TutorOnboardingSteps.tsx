import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

interface StepProps {
  steps: string[];
  currentStep: number;
}

const TutorOnboardingSteps: React.FC<StepProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-12">
      {/* Progress EBHeader */}
      <div className="text-center mb-8">
        <motion.h1
          className="text-3xl font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Đăng ký làm gia sư
        </motion.h1>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Bước {currentStep + 1} / {steps.length}
        </motion.p>
      </div>

      {/* Steps Progress */}
      <div className="relative">
        {/* Background Line */}
        <div className="absolute top-6 left-0 w-full h-1 bg-border rounded-full"></div>

        {/* Progress Line */}
        <motion.div
          className="absolute top-6 left-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                {/* Step Circle */}
                <motion.div
                  className={cn(
                    "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 backdrop-blur-sm",
                    isCompleted &&
                      "bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/25",
                    isCurrent &&
                      "bg-white border-emerald-500 text-emerald-600 shadow-lg ring-4 ring-emerald-500/20",
                    isPending && "bg-card border-border text-muted-foreground"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.svg
                        key="check"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    ) : (
                      <motion.span
                        key="number"
                        className="text-sm font-semibold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {index + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Pulse effect for current step */}
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-emerald-400"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>

                {/* Step Label */}
                <motion.div
                  className="mt-4 text-center max-w-[140px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <div
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isCompleted && "text-emerald-600",
                      isCurrent && "text-emerald-700 font-semibold",
                      isPending && "text-muted-foreground"
                    )}
                  >
                    {step}
                  </div>
                  {isCurrent && (
                    <motion.div
                      className="mt-1 text-xs text-emerald-600 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Đang thực hiện
                    </motion.div>
                  )}
                  {isCompleted && (
                    <motion.div
                      className="mt-1 text-xs text-emerald-600 font-medium flex items-center justify-center gap-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Hoàn thành
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Step Description */}
      <motion.div
        className="mt-8 text-center"
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="inline-flex items-center px-4 py-2 bg-emerald-50 dark:bg-emerald-950 rounded-full border border-emerald-200 dark:border-emerald-800">
          <motion.div
            className="w-2 h-2 bg-emerald-500 rounded-full mr-2"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
            {steps[currentStep]}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default TutorOnboardingSteps;
