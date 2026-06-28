import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Cpu, LineChart, Sparkles } from "lucide-react";
import api from "../services/api";
import SearchBar from "../components/SearchBar";
import LoadingOverlay from "../components/LoadingOverlay";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = async (company) => {
    if (!company.trim()) return;

    try {
      setCompanyName(company);
      setLoading(true);

      const response = await api.post("/invest", {
        company,
      });

      // Pass backend response structure to report page
      navigate("/report", {
        state: response.data,
      });
    } catch (error) {
      console.error("Analysis Request Error:", error);
      alert(
        error.response?.data?.message ||
        "Unable to generate analysis. Please check the company name and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 flex flex-col justify-between overflow-hidden">
      {/* Background radial gradient and glowing blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.3)_0%,rgba(2,6,17,1)_100%)] z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none z-0" />

      {/* Main Content Wrapper */}
      <div className="flex-grow flex flex-col justify-center items-center px-4 py-20 relative z-10">
        <div className="w-full max-w-4xl text-center space-y-8">
          
          {/* Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm font-semibold tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen equity analysis</span>
          </motion.div>

          {/* Main Hero Header */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-blue-400 leading-tight"
            >
              AI Investment Research Agent
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 font-medium leading-relaxed"
            >
              Research any publicly traded company using AI, financial metrics and live market news.
            </motion.p>
          </div>

          {/* Search Component */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4"
          >
            <SearchBar onSubmit={handleSearchSubmit} />
          </motion.div>

          {/* Feature Grid Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-16 text-left"
          >
            <div className="p-5 rounded-2xl border border-slate-900 bg-slate-900/20 space-y-2">
              <div className="p-2.5 w-fit rounded-lg bg-blue-500/10 text-blue-400">
                <LineChart className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-200">Financial Modeling</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fetch and evaluate P/E ratios, market caps, 52-week ranges, and historical metrics.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl border border-slate-900 bg-slate-900/20 space-y-2">
              <div className="p-2.5 w-fit rounded-lg bg-blue-500/10 text-blue-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-200">Agentic Reasoning</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Multi-agent LangGraph workflow reviews financials and latest search indexes.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl border border-slate-900 bg-slate-900/20 space-y-2">
              <div className="p-2.5 w-fit rounded-lg bg-blue-500/10 text-blue-400">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-200">Smart Recommendation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aggregates signals to generate decisive INVEST or PASS advice with confidence ratings.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-slate-900 text-xs text-slate-500 relative z-10 bg-slate-950">
        <p>© 2026 AI Investment Agent. Developed for institutional-grade research.</p>
      </footer>

      {/* Full screen loading state */}
      <LoadingOverlay isVisible={loading} companyName={companyName} />
    </div>
  );
};

export default Home;