import axios from "axios";

export const searchCompanyNews = async (company) => {
  try {
    const response = await axios.post(
      "https://api.tavily.com/search",
      {
        api_key: process.env.TAVILY_API_KEY,
        query: `Latest news about ${company} stock and company`,
        search_depth: "advanced",
        topic: "news",
        max_results: 5,
      }
    );

    return response.data.results;
  } catch (error) {
    console.error("Tavily Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch news from Tavily.");
  }
};