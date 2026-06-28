import { StateGraph, START, END, Annotation } from "@langchain/langgraph";

import { researchAgent } from "../agents/researchAgent.js";
import { analysisAgent } from "../agents/analysisAgent.js";
import { decisionAgent } from "../agents/decisionAgent.js";

// Define the graph state
const InvestmentState = Annotation.Root({
  company: Annotation(),
  research: Annotation(),
  analysis: Annotation(),
  decision: Annotation(),
});

// ---------------- Nodes ---------------- //

async function researchNode(state) {
  const research = await researchAgent(state.company);

  return {
    research,
  };
}

async function analysisNode(state) {
  const analysis = await analysisAgent(state.research);

  return {
    analysis,
  };
}

async function decisionNode(state) {
  const decision = await decisionAgent(state.analysis);

  return {
    decision,
  };
}

// ---------------- Graph ---------------- //

const workflow = new StateGraph(InvestmentState);

workflow.addNode("researchNode", researchNode);
workflow.addNode("analysisNode", analysisNode);
workflow.addNode("decisionNode", decisionNode);

workflow.addEdge(START, "researchNode");
workflow.addEdge("researchNode", "analysisNode");
workflow.addEdge("analysisNode", "decisionNode");
workflow.addEdge("decisionNode", END);

export const investmentGraph = workflow.compile();