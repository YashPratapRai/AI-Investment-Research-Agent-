import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, ShieldCheck, DollarSign } from "lucide-react";

const HeroCard = ({ financials = {}, decision = {} }) => {
  const { companyName, symbol, currentPrice, currency, exchange } = financials;
  const { recommendation, confidence } = decision;

  const isInvest = recommendation === "INVEST";

  // Formatter for currency
  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full rounded-3xl p-6 md:p-8 border glass-panel shadow-2xl overflow-hidden ${
        isInvest ? "border-emerald-500/30 glow-green" : "border-rose-500/30 glow-red"
      }`}
    >
      {/* Decorative Background Glows */}
      <div
        className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none ${
          isInvest ? "bg-emerald-500" : "bg-rose-500"
        }`}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
        <div>
          {/* Exchange & Symbol Badge */}
          <div className="flex items-center gap-2 mb-2 text-xs md:text-sm text-slate-400 font-medium uppercase tracking-wider">
            <span>{exchange || "NASDAQ"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-bold">
              {symbol}
            </span>
          </div>

          {/* Company Name */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-50 tracking-tight leading-none">
            {companyName}
          </h1>

          {/* Price details */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold text-slate-100">
              {formatPrice(currentPrice)}
            </span>
            <span className="text-sm text-slate-400 font-semibold">{currency || "USD"}</span>
          </div>
        </div>

        {/* Recommendation Box */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-slate-950/40 border border-slate-800/80 p-4 md:p-5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl ${
                isInvest ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
              }`}
            >
              {isInvest ? <ShieldCheck className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                AI Recommendation
              </p>
              <span
                className={`text-xl font-black tracking-wide ${
                  isInvest ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {recommendation || "PASS"}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-12 bg-slate-800" />

          {/* Confidence Score */}
          <div className="flex flex-col">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Confidence Rating
            </p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-slate-100">
                {confidence || 0}
              </span>
              <span className="text-sm text-slate-400 font-bold">%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroCard;
