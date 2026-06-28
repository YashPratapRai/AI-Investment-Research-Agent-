import axios from "axios";

const BASE_URL = "https://financialmodelingprep.com/api/v3";

export const getCompanyFinancials = async (company) => {
  try {
    const apiKey = process.env.FMP_API_KEY;

    // Search company
    const searchRes = await axios.get(
      `${BASE_URL}/search`,
      {
        params: {
          query: company,
          limit: 1,
          exchange: "NASDAQ",
          apikey: apiKey,
        },
      }
    );

    if (!searchRes.data.length) {
      throw new Error("Company not found.");
    }

    const symbol = searchRes.data[0].symbol;

    // Company Profile
    const profileRes = await axios.get(
      `${BASE_URL}/profile/${symbol}`,
      {
        params: {
          apikey: apiKey,
        },
      }
    );

    const profile = profileRes.data[0];

    return {
      symbol: profile.symbol,
      companyName: profile.companyName,
      currentPrice: profile.price,
      marketCap: profile.mktCap,
      peRatio: profile.pe,
      currency: profile.currency,
      exchange: profile.exchangeShortName,
      fiftyTwoWeekHigh: profile.range?.split("-")[1]?.trim(),
      fiftyTwoWeekLow: profile.range?.split("-")[0]?.trim(),
      sector: profile.sector,
      industry: profile.industry,
    };
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};