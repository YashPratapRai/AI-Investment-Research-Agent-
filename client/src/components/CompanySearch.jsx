import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CompanySearch = () => {
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company.trim()) return;

    try {
      setLoading(true);

      const response = await api.post("/invest", {
        company,
      });

      navigate("/report", {
        state: response.data,
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        placeholder="Enter company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full border rounded-xl px-5 py-4"
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-4 rounded-xl"
      >
        {loading ? "Analyzing..." : "Analyze Company"}
      </button>
    </form>
  );
};

export default CompanySearch;