import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export const getCompanyFinancials = async (company) => {
  try {
    // Find the correct stock symbol
    const searchResult = await yahooFinance.search(company);

    if (!searchResult?.quotes?.length) {
      throw new Error("Company not found.");
    }

    const symbol = searchResult.quotes[0].symbol;

    // Fetch quote data
    const quote = await yahooFinance.quote(symbol);

    return {
      symbol,
      companyName: quote.longName || quote.shortName,
      currentPrice: quote.regularMarketPrice,
      marketCap: quote.marketCap,
      peRatio: quote.trailingPE,
      currency: quote.currency,
      exchange: quote.fullExchangeName,
      fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
    };
  } catch (err) {
    console.error("Yahoo Finance Error:", err);
    throw new Error("Unable to fetch financial data.");
  }
};