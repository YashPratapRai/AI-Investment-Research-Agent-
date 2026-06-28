import groq from "../config/groq.js";
import { getCompanyFinancials } from "../tools/yahooFinance.js";
import { searchCompanyNews } from "../tools/tavilySearch.js";

export const researchAgent = async (company) => {
  try {
    console.log("Research started for:", company);

    const financials = await getCompanyFinancials(company);
    console.log("Financials fetched");

    const news = await searchCompanyNews(company);
    console.log("News fetched");

    const response = await groq.invoke(`
You are an expert investment research analyst.

Company: ${company}

Financial Data:
${JSON.stringify(financials, null, 2)}

Latest News:
${JSON.stringify(news, null, 2)}

Generate:
1. Company Overview
2. Financial Health
3. Recent News Summary
4. Opportunities
5. Risks
`);

    console.log("Groq completed");

    return {
      financials,
      news,
      summary: response.content,
    };
  } catch (error) {
    console.error("Research Agent Error:", error);
    throw error;
  }
};