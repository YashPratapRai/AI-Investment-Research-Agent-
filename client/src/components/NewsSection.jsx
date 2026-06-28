import { motion } from "framer-motion";
import { Newspaper, ExternalLink, Calendar } from "lucide-react";

const getDomain = (urlStr) => {
  try {
    const url = new URL(urlStr);
    return url.hostname.replace("www.", "");
  } catch (e) {
    return "External Source";
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "Recent News";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
};

const NewsSection = ({ news = [] }) => {
  if (!news || news.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center text-slate-500">
        <Newspaper className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No recent news articles found for this company.</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
        <span className="w-1 h-5 rounded bg-blue-500" />
        Latest Market Coverage
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {news.map((item, index) => (
          <motion.a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(59, 130, 246, 0.4)" }}
            className="group flex flex-col justify-between glass-panel p-5 rounded-2xl border border-slate-800/80 hover:bg-slate-900/40 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/5 relative overflow-hidden"
          >
            <div className="space-y-3">
              {/* Card Header (Source & Date) */}
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {getDomain(item.url)}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(item.published_date || item.publishedDate)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 leading-snug">
                {item.title}
              </h3>

              {/* Preview Content */}
              <p className="text-slate-400 text-xs md:text-sm line-clamp-3 leading-relaxed">
                {item.content}
              </p>
            </div>

            {/* Read More Footer */}
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-slate-300 transition-colors duration-200">
              <span>Read Full Coverage</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-all duration-200" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default NewsSection;
