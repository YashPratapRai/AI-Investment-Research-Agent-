import { motion } from "framer-motion";
import { CheckCircle, AlertOctagon, TrendingUp, ShieldAlert, ArrowUpRight, ArrowDownRight } from "lucide-react";

const DecisionCard = ({ decision = {}, analysis = {} }) => {
  const { recommendation = "PASS", confidence = 0, reasoning = [], risks = [] } = decision;
  const { strengths = [], weaknesses = [] } = analysis;

  const isInvest = recommendation === "INVEST";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
       
        <motion.div
          variants={itemVariants}
          className={`glass-panel p-6 md:p-8 rounded-3xl border shadow-xl relative overflow-hidden flex flex-col justify-between ${
            isInvest ? "border-emerald-500/20 glow-green" : "border-rose-500/20 glow-red"
          }`}
        >
        
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-slate-900/40 blur-xl pointer-events-none" />
          
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span className="w-1 h-5 rounded bg-blue-500" />
              Investment Recommendation
            </h2>

           
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 rounded-2xl ${
                    isInvest ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {isInvest ? (
                    <CheckCircle className="w-10 h-10 animate-pulse" />
                  ) : (
                    <AlertOctagon className="w-10 h-10 animate-pulse" />
                  )}
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                    Final Decision
                  </span>
                  <span
                    className={`text-3xl font-black tracking-wide ${
                      isInvest ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {recommendation}
                  </span>
                </div>
              </div>

              
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                  AI Confidence
                </span>
                <span className="text-3xl font-black text-slate-100 block">
                  {confidence}%
                </span>
              </div>
            </div>

            
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-350 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Key Rationale (Reasons)
              </h3>
              <ul className="space-y-2.5">
                {reasoning.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs md:text-sm">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
                {reasoning.length === 0 && (
                  <li className="text-slate-500 italic text-sm">No specific rationale provided.</li>
                )}
              </ul>
            </div>

         
            <div className="space-y-3 pt-4 border-t border-slate-800/60">
              <h3 className="text-sm font-bold text-slate-350 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Identified Risks
              </h3>
              <ul className="space-y-2.5">
                {risks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs md:text-sm">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-rose-500 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
                {risks.length === 0 && (
                  <li className="text-slate-500 italic text-sm">No immediate risks identified.</li>
                )}
              </ul>
            </div>

          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between"
        >
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span className="w-1 h-5 rounded bg-blue-500" />
              Company Analysis Profile
            </h2>

           
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4" />
                Strengths
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {strengths.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-slate-300 text-xs md:text-sm transition-all hover:bg-emerald-500/10"
                  >
                    <span className="flex-shrink-0 text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
                {strengths.length === 0 && (
                  <div className="text-slate-500 italic text-sm p-4 text-center border border-dashed border-slate-800 rounded-xl">
                    No strengths listed.
                  </div>
                )}
              </div>
            </div>

       
            <div className="space-y-4 pt-4 border-t border-slate-800/60">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <ArrowDownRight className="w-4 h-4" />
                Weaknesses & Concerns
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {weaknesses.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-slate-300 text-xs md:text-sm transition-all hover:bg-rose-500/10"
                  >
                    <span className="flex-shrink-0 text-rose-400 font-bold">✗</span>
                    <span>{item}</span>
                  </div>
                ))}
                {weaknesses.length === 0 && (
                  <div className="text-slate-500 italic text-sm p-4 text-center border border-dashed border-slate-800 rounded-xl">
                    No weaknesses listed.
                  </div>
                )}
              </div>
            </div>

          </div>
        </motion.div>
        
      </div>
    </motion.div>
  );
};

export default DecisionCard;
