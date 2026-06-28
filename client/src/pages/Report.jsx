import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, Search, RefreshCw, AlertCircle, BarChart3 } from "lucide-react";
import api from "../services/api";
import HeroCard from "../components/HeroCard";
import ScoreCards from "../components/ScoreCards";
import OverviewSection from "../components/OverviewSection";
import DecisionCard from "../components/DecisionCard";
import NewsSection from "../components/NewsSection";
import LoadingOverlay from "../components/LoadingOverlay";

const Report = () => {
  const { state: routeState } = useLocation();
  const navigate = useNavigate();

  // Manage report state locally so we can update it via header search
  const [reportData, setReportData] = useState(routeState || null);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleHeaderSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setCompanyName(searchQuery);
      setLoading(true);

      const response = await api.post("/invest", {
        company: searchQuery,
      });

      setReportData(response.data);
      setSearchQuery("");
    } catch (error) {
      console.error("Subsequent Search Error:", error);
      alert(
        error.response?.data?.message ||
        "Unable to generate analysis. Please check the company name and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // If there's no data, render an error/redirect state
  if (!reportData) {
    return (
      <div className="relative min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4">
        {/* Background radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.3)_0%,rgba(2,6,17,1)_100%)] z-0" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-800 text-center relative z-10 space-y-6 shadow-2xl"
        >
          <div className="p-4 bg-amber-500/10 text-amber-500 rounded-full w-fit mx-auto border border-amber-500/20">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-100">No Active Report Found</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              You haven't searched for a company yet, or the page was refreshed.
            </p>
          </div>

          {/* Inline search fallback */}
          <form onSubmit={handleHeaderSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g., Apple or Tesla..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 text-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer"
            >
              Analyze
            </button>
          </form>

          <div className="pt-2 border-t border-slate-900">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back Home
            </Link>
          </div>
        </motion.div>

        <LoadingOverlay isVisible={loading} companyName={companyName} />
      </div>
    );
  }

  const { research = {}, analysis = {}, decision = {} } = reportData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.25)_0%,rgba(2,6,17,1)_80%)] pointer-events-none z-0" />

      {/* Premium Header/Navigation */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-900 bg-slate-950/80 backdrop-blur-md px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all cursor-pointer"
            title="Return Home"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2 text-blue-500">
            <BarChart3 className="w-6 h-6" />
            <span className="hidden sm:inline font-extrabold text-lg tracking-wider text-slate-100 uppercase">
              Terminal
            </span>
          </div>
        </div>

        {/* Dynamic header search bar */}
        <form onSubmit={handleHeaderSearch} className="relative max-w-xs md:max-w-sm w-full mx-4">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search another company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </form>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-widest hidden md:flex">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Live market link
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10 space-y-10">
        
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between border-b border-slate-900 pb-4"
        >
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-100 tracking-tight">
              Equity Research Dossier
            </h1>
            <p className="text-xs text-slate-400">
              Generated by AI research nodes on {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Ready
          </div>
        </motion.div>

        {/* 1. Top Hero Section */}
        <HeroCard financials={research.financials} decision={decision} />

        {/* 2. Three Metric Circle Cards */}
        <ScoreCards analysis={analysis} />

        {/* 3. Investment Recommendation Card (INVEST/PASS, reasons, risks, strengths, weaknesses) */}
        <DecisionCard decision={decision} analysis={analysis} />

        {/* 4. Company Overview Section */}
        <OverviewSection research={research} analysis={analysis} />

        {/* 5. Latest News Cards Grid */}
        <NewsSection news={research.news} />

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-slate-900 text-xs text-slate-500 bg-slate-950 mt-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 AI Investment Agent. All models operational.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
          </div>
        </div>
      </footer>

      {/* Full screen loading state for subsequent searches */}
      <LoadingOverlay isVisible={loading} companyName={companyName} />
    </div>
  );
};

export default Report;