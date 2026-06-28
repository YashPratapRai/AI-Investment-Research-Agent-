import { ChatGroq } from "@langchain/groq";

const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
  temperature: 0.2,
});

export default groq;