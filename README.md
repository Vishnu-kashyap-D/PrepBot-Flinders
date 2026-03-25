# PlaceBot — Personal Placement Mentor

> An AI-powered placement preparation chatbot for engineering undergraduate students.

PlaceBot is a **topic-locked AI chatbot** that acts as your personal placement mentor. Built with plain HTML, CSS and JavaScript — no frameworks, no backend, no installations.

---

## 🎯 What PlaceBot Helps With

- 🤝 **HR Interviews** — common questions, model answers, follow-ups
- 📄 **Resume Building** — ATS tips, bullet points, project descriptions
- 🧮 **Aptitude & Reasoning** — quantitative, logical, verbal with solutions
- 💻 **Technical Rounds** — DSA, algorithms, arrays, trees, recursion
- 🗣️ **Soft Skills** — communication, confidence, body language
- 🏢 **Company Preparation** — TCS, Infosys, Amazon, Google & more
- ✉️ **Offer & Email Etiquette** — acceptance, follow-up, negotiation templates

---

## 🗂 Project Structure

```
PlaceBot/
├── index.html          # Landing page
├── chat.html           # Chatbot interface
├── README.md
├── .gitignore
└── src/
    ├── style.css       # Dark + light theme styling
    ├── theme.js        # Theme toggle (persisted in localStorage)
    └── script.js       # Chat logic, API calls, markdown renderer
```

---

## 🚀 How to Run

### Option 1 — Open locally
Open `index.html` in any browser. No server or build tools needed.

### Option 2 — CodeSandbox / StackBlitz / Replit
1. Create a new **Static HTML** project
2. Recreate the file structure above
3. Paste file contents — preview runs instantly

---

## 🔑 API Key Setup

Enter your key via the sidebar at runtime (stored in `localStorage` only):

| Provider | Key prefix | Model |
|---|---|---|
| **Groq** | `gsk_...` | `llama-3.3-70b-versatile` |
| **Gemini** | `AIza...` | `gemini-2.0-flash` |
| **OpenAI** | `sk-...` | `gpt-3.5-turbo` |

> ⚠️ Never hardcode API keys in source files.

---

## ✨ Key Features

- 🌙 Dark / Light mode toggle (persisted)
- ⚡ 7 quick-action buttons for instant topic selection
- 🔒 Topic-locked — refuses off-topic requests politely
- 💬 Multi-turn context — full history sent each request
- 📝 Markdown rendering — no library, pure JS
- 🚫 Single-request guard — prevents API rate-limit exhaustion
- 📱 Responsive — mobile and desktop

---

## 🛠 Tech Stack

Pure **HTML5** · **CSS3** · **Vanilla JavaScript** — zero dependencies.

---

## 👨‍💻 Author

**Vishnu Kashyap D** · Built for the Flinders AI Hackathon

---
*Version 1.0.0 � Ready for hackathon submission.*
