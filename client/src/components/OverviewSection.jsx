import { motion } from "framer-motion";
import { Landmark, Activity, BarChart2, DollarSign, Calendar, Globe } from "lucide-react";

const formatMarketCap = (num) => {
  if (!num) return "N/A";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  return num.toLocaleString();
};

const formatValue = (val, prefix = "") => {
  if (val === undefined || val === null) return "N/A";
  if (typeof val === "number") {
    return prefix + val.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  return prefix + val;
};

const OverviewSection = ({ research = {}, analysis = {} }) => {
  const { financials = {}, summary = "" } = research;
  const { marketCap, peRatio, fiftyTwoWeekHigh, fiftyTwoWeekLow, currency, exchange } = financials;

  const metrics = [
    {
      label: "Market Capitalization",
      value: formatMarketCap(marketCap),
      icon: <Landmark className="w-5 h-5 text-blue-400" />,
      desc: "Total market value of shares outstanding",
    },
    {
      label: "P/E Ratio (Trailing)",
      value: formatValue(peRatio),
      icon: <Activity className="w-5 h-5 text-indigo-400" />,
      desc: "Price-to-Earnings valuation multiple",
    },
    {
      label: "52-Week High",
      value: formatValue(fiftyTwoWeekHigh, "$"),
      icon: <BarChart2 className="w-5 h-5 text-emerald-400" />,
      desc: "Highest price traded over the past year",
    },
    {
      label: "52-Week Low",
      value: formatValue(fiftyTwoWeekLow, "$"),
      icon: <BarChart2 className="w-5 h-5 text-rose-400" />,
      desc: "Lowest price traded over the past year",
    },
    {
      label: "Trading Exchange",
      value: exchange || "N/A",
      icon: <Globe className="w-5 h-5 text-purple-400" />,
      desc: "Exchange where the security is listed",
    },
    {
      label: "Reporting Currency",
      value: currency || "N/A",
      icon: <DollarSign className="w-5 h-5 text-amber-400" />,
      desc: "Currency of financial statements",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded bg-blue-500" />
          Financial Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((m, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              key={m.label}
              className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex items-start gap-4 hover:border-slate-700/80 hover:bg-slate-900/40 transition-all duration-300"
            >
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                {m.icon}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  {m.label}
                </span>
                <span className="text-lg md:text-xl font-extrabold text-slate-100 block">
                  {m.value}
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  {m.desc}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Research Summary */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-900/20"
        >
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded bg-blue-500" />
            AI Research Synthesis
          </h2>
          <div className="prose prose-invert max-w-none text-slate-350 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
            {summary}
          </div>
        </motion.div>
      )}

      {/* LLM Financial Analysis Summary */}
      {analysis.analysis && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-900/20"
        >
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded bg-blue-500" />
            Strategic Analysis Deep-Dive
          </h2>
          <div className="prose prose-invert max-w-none text-slate-350 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
            {analysis.analysis}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OverviewSection;
