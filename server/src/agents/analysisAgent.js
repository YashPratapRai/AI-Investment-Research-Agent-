import groq from "../config/groq.js";
import analysisPrompt from "../prompts/analysisPrompt.js";

export const analysisAgent = async (researchData) => {
  try {
    const response = await groq.invoke(`
${analysisPrompt}

Research Data:

${JSON.stringify(researchData, null, 2)}
`);

    console.log("========== RAW LLM RESPONSE ==========");
    console.log(response.content);
    console.log("======================================");

    const cleaned = response.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("Analysis Agent Error:", error);
    throw error;
  }
};