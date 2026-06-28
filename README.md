# 🤖 AI Investment Research Agent

An AI-powered investment research application that analyzes a publicly traded company using financial data, market news, and Large Language Models (LLMs) to generate an investment recommendation (**INVEST** or **PASS**) with supporting reasoning.

Built as a full-stack AI application using **React**, **Node.js**, **LangGraph**, **Groq LLM**, **Yahoo Finance**, and **Tavily Search**.

---

## 🚀 Features

* 🔍 Search any publicly traded company (Apple, Microsoft, NVIDIA, Tesla, etc.)
* 📊 Fetch real-time financial information using Yahoo Finance
* 📰 Gather recent company news using Tavily Search
* 🤖 AI-powered company research and analysis using Groq LLM
* 🧠 Multi-stage AI workflow built with LangGraph
* 📈 Financial, Sentiment, and Risk scoring
* ✅ AI investment recommendation (INVEST / PASS)
* 📋 Detailed reasoning and risk analysis
* 🌙 Modern responsive dashboard built with React + Tailwind CSS

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* React Router
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* LangGraph
* LangChain
* Groq API

### External APIs

* Yahoo Finance
* Tavily Search API

---

## 🧠 AI Workflow

```text
User enters company name
          │
          ▼
Research Agent
          │
          ├── Yahoo Finance
          └── Tavily Search
          │
          ▼
Analysis Agent
          │
          ▼
Decision Agent
          │
          ▼
Final Recommendation
(INVEST / PASS)
```

---

## 📂 Project Structure

```text
ai-investment-agent/

client/
    React + Tailwind Frontend

server/
    Express Backend
    LangGraph Workflow
    AI Agents
    API Integrations

README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Investment-Research-Agent.git

cd AI-Investment-Research-Agent
```

---

### Backend

```bash
cd server

npm install

npm run dev
```

---

### Frontend

```bash
cd client

npm install

npm run dev
```

---

## 🔑 Environment Variables

### Server (.env)

```env
PORT=5000

GROQ_API_KEY=YOUR_GROQ_API_KEY

TAVILY_API_KEY=YOUR_TAVILY_API_KEY
```

---

## 📸 Screenshots

### Home Page

(Add Screenshot)

---

### AI Analysis Dashboard

(Add Screenshot)

---

### Recommendation Report

(Add Screenshot)

---

## 📈 Example Output

```text
Company

Apple Inc.

Recommendation

INVEST

Confidence

90%

Financial Score

85/100

Sentiment Score

58/100

Risk Score

40/100
```

---

## 💡 Future Improvements

* Authentication
* Company logo integration
* Historical stock charts
* Export report as PDF
* Watchlist support
* Portfolio analysis
* Compare multiple companies
* Live stock price updates
* Interactive financial charts
* AI chat with company reports

---

## 📚 Learning Outcomes

This project helped me gain practical experience with:

* AI Agent Architecture
* LangGraph Workflows
* Prompt Engineering
* Tool Calling
* REST APIs
* LLM Integration
* Full Stack Development
* React UI Development

---

## 👨‍💻 Author

**Yash Pratap Rai**

GitHub: https://github.com/YashPratapRai

LinkedIn: *(Add your LinkedIn profile here)*

---

## ⭐ If you found this project interesting, feel free to star the repository.
