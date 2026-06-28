import { motion } from "framer-motion";
import { Check, ShieldCheck, Heart, AlertTriangle } from "lucide-react";

// Circular Progress Component
const CircularProgress = ({ value, colorClass, delay = 0 }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      {/* Background Circle */}
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="stroke-slate-800"
          strokeWidth="6"
          fill="transparent"
        />
        {/* Animated Progress Circle */}
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          className={`transition-colors duration-500 ${colorClass}`}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      {/* Center Value */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-xl font-extrabold text-slate-100 tracking-tight">
          {value}
        </span>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          / 100
        </span>
      </div>
    </div>
  );
};

const ScoreCards = ({ analysis = {} }) => {
  const { financialScore = 0, sentimentScore = 0, riskScore = 0 } = analysis;

  // Determine colors based on scores
  // Financial: Higher is better
  const getFinancialColor = (score) => {
    if (score >= 80) return "stroke-emerald-500 text-emerald-400";
    if (score >= 60) return "stroke-amber-500 text-amber-400";
    return "stroke-rose-500 text-rose-400";
  };

  // Sentiment: Higher is better
  const getSentimentColor = (score) => {
    if (score >= 60) return "stroke-emerald-500 text-emerald-400";
    if (score >= 40) return "stroke-amber-500 text-amber-400";
    return "stroke-rose-500 text-rose-400";
  };

  // Risk: LOWER is better (so high risk is RED, low risk is GREEN)
  const getRiskColor = (score) => {
    if (score <= 40) return "stroke-emerald-500 text-emerald-400";
    if (score <= 70) return "stroke-amber-500 text-amber-400";
    return "stroke-rose-500 text-rose-400";
  };

  const getFinancialLabel = (score) => {
    if (score >= 80) return "Excellent Health";
    if (score >= 60) return "Average Health";
    return "Weak/Poor Health";
  };

  const getSentimentLabel = (score) => {
    if (score >= 60) return "Positive Market Sentiment";
    if (score >= 40) return "Neutral Sentiment";
    return "Negative Sentiment";
  };

  const getRiskLabel = (score) => {
    if (score <= 40) return "Low Risk Level";
    if (score <= 70) return "Medium Risk Level";
    return "High Risk Level";
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
    >
      {/* Financial Score Card */}
      <motion.div
        variants={cardVariants}
        className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-all duration-300 shadow-lg shadow-black/20"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Financial Health</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100">Financial Score</h3>
          <p className={`text-sm font-medium ${getFinancialColor(financialScore).split(" ")[1]}`}>
            {getFinancialLabel(financialScore)}
          </p>
        </div>
        <CircularProgress
          value={financialScore}
          colorClass={getFinancialColor(financialScore).split(" ")[0]}
          delay={0.1}
        />
      </motion.div>

      {/* Sentiment Score Card */}
      <motion.div
        variants={cardVariants}
        className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-all duration-300 shadow-lg shadow-black/20"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Heart className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Market Sentiment</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100">Sentiment Score</h3>
          <p className={`text-sm font-medium ${getSentimentColor(sentimentScore).split(" ")[1]}`}>
            {getSentimentLabel(sentimentScore)}
          </p>
        </div>
        <CircularProgress
          value={sentimentScore}
          colorClass={getSentimentColor(sentimentScore).split(" ")[0]}
          delay={0.2}
        />
      </motion.div>

      {/* Risk Score Card */}
      <motion.div
        variants={cardVariants}
        className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-all duration-300 shadow-lg shadow-black/20"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Risk Level</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100">Risk Score</h3>
          <p className={`text-sm font-medium ${getRiskColor(riskScore).split(" ")[1]}`}>
            {getRiskLabel(riskScore)}
          </p>
        </div>
        <CircularProgress
          value={riskScore}
          colorClass={getRiskColor(riskScore).split(" ")[0]}
          delay={0.3}
        />
      </motion.div>
    </motion.div>
  );
};

export default ScoreCards;
