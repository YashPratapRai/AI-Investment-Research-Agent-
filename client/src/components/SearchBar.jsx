import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSubmit, initialValue = "", placeholder = "Enter company name or stock ticker..." }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center p-2 rounded-2xl glass-input border border-slate-800 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-300 shadow-lg shadow-black/40">
        <div className="flex items-center pl-4 pr-2 text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-0 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-0 text-base md:text-lg py-3 pr-4"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-blue-500/10 cursor-pointer disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/20 active:scale-98"
        >
          Analyze
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
