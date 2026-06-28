import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({
  suppressNotices: ["yahooSurvey"],
});

export const getCompanyFinancials = async (company) => {
  try {
    console.log("Searching company:", company);

    const searchResult = await yahooFinance.search(company);

    console.log("Search Result:", searchResult);

    if (!searchResult?.quotes?.length) {
      throw new Error("Company not found.");
    }

    const symbol = searchResult.quotes[0].symbol;

    console.log("Symbol:", symbol);

    const quote = await yahooFinance.quote(symbol);

    console.log("Quote:", quote);

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
  } catch (error) {
    console.error("========== YAHOO FINANCE ERROR ==========");
    console.error(error);
    console.error(error.stack);

    throw error;
  }
};