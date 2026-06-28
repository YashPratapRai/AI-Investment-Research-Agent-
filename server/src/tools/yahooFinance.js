import axios from "axios";

const API_KEY = process.env.FINNHUB_API_KEY;

export const getCompanyFinancials = async (company) => {
  try {
    // Search company
    const search = await axios.get(
      "https://finnhub.io/api/v1/search",
      {
        params: {
          q: company,
          token: API_KEY,
        },
      }
    );

    if (!search.data.result.length) {
      throw new Error("Company not found.");
    }

    const symbol = search.data.result[0].symbol;

    // Quote
    const quote = await axios.get(
      "https://finnhub.io/api/v1/quote",
      {
        params: {
          symbol,
          token: API_KEY,
        },
      }
    );

    // Company Profile
    const profile = await axios.get(
      "https://finnhub.io/api/v1/stock/profile2",
      {
        params: {
          symbol,
          token: API_KEY,
        },
      }
    );

    return {
      symbol,
      companyName: profile.data.name,
      currentPrice: quote.data.c,
      marketCap: profile.data.marketCapitalization,
      peRatio: null, // Finnhub free quote doesn't provide PE here
      currency: profile.data.currency,
      exchange: profile.data.exchange,
      fiftyTwoWeekHigh: quote.data.h,
      fiftyTwoWeekLow: quote.data.l,
      sector: profile.data.finnhubIndustry,
      industry: profile.data.finnhubIndustry,
    };
  } catch (error) {
    console.error(
      "Finnhub Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};