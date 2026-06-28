import groq from "../config/groq.js";
import decisionPrompt from "../prompts/decisionPrompt.js";

export const decisionAgent = async (analysis) => {
  try {

    const response = await groq.invoke(`
${decisionPrompt}

Company Analysis:

${JSON.stringify(analysis, null, 2)}
`);

    console.log("========== RAW DECISION ==========");
    console.log(response.content);
    console.log("=================================");

    const cleaned = response.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.error("Decision Agent Error:", error);

    return {
      recommendation: "PASS",
      confidence: 0,
      reasoning: [
        "Unable to generate recommendation."
      ],
      risks: [
        "Unexpected error while generating decision."
      ]
    };

  }
};