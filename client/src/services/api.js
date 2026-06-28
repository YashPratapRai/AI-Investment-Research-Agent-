import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-investment-research-agent-a80h.onrender.com/api",
});

export default api;