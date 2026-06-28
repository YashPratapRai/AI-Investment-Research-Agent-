import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Circle, TrendingUp } from "lucide-react";

const steps = [
  { id: 1, label: "Fetching Financial Data" },
  { id: 2, label: "Searching Latest News" },
  { id: 3, label: "Running AI Analysis" },
  { id: 4, label: "Generating Investment Decision" },
];

const LoadingOverlay = ({ isVisible, companyName }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      return;
    }

    // Set initial step
    setCurrentStep(1);

    // Simulate progress timing
    const timers = [
      setTimeout(() => setCurrentStep(2), 2200),
      setTimeout(() => setCurrentStep(3), 4800),
      setTimeout(() => setCurrentStep(4), 7500),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md px-4"
      >
        <div className="w-full max-w-md text-center">
          {/* Animated Brain/Graph Logo */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-500 mb-8 shadow-lg shadow-blue-500/5 glow-blue"
          >
            <TrendingUp className="w-10 h-10" />
          </motion.div>

          {/* Heading */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-slate-100 mb-2"
          >
            Analyzing {companyName || "Company"}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="text-slate-400 text-sm mb-10"
          >
            Synthesizing financial reports and live news articles...
          </motion.p>

          {/* Steps List */}
          <div className="space-y-4 text-left glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl bg-slate-900/50">
            {steps.map((step) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              const isPending = currentStep < step.id;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 transition-all duration-300 ${
                    isCurrent
                      ? "text-blue-400 scale-[1.02]"
                      : isCompleted
                      ? "text-emerald-400"
                      : "text-slate-500"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </motion.div>
                    )}
                    {isCurrent && (
                      <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                    )}
                    {isPending && <Circle className="w-5 h-5 text-slate-700" />}
                  </div>
                  <span className="font-medium text-sm md:text-base">
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-full bg-slate-850 h-1 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="bg-blue-500 h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width:
                  currentStep === 1
                    ? "25%"
                    : currentStep === 2
                    ? "50%"
                    : currentStep === 3
                    ? "75%"
                    : currentStep === 4
                    ? "90%"
                    : "0%",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingOverlay;
