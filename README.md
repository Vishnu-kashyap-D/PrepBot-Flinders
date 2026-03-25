# PreapBot” Personal Placement Mentor

> An AI-powered placement preparation chatbot for engineering undergraduate students.

PlaceBot is a **topic-locked AI chatbot** that acts as your personal placement mentor. Built with plain HTML, CSS and JavaScript â€” no frameworks, no backend, no installations.

---

## ðŸŽ¯ What PlaceBot Helps With

- ðŸ¤ **HR Interviews** â€” common questions, model answers, follow-ups
- ðŸ“„ **Resume Building** â€” ATS tips, bullet points, project descriptions
- ðŸ§® **Aptitude & Reasoning** â€” quantitative, logical, verbal with solutions
- ðŸ’» **Technical Rounds** â€” DSA, algorithms, arrays, trees, recursion
- ðŸ—£ï¸ **Soft Skills** â€” communication, confidence, body language
- ðŸ¢ **Company Preparation** â€” TCS, Infosys, Amazon, Google & more
- âœ‰ï¸ **Offer & Email Etiquette** â€” acceptance, follow-up, negotiation templates

---

## ðŸ—‚ Project Structure

```
PlaceBot/
â”œâ”€â”€ index.html          # Landing page
â”œâ”€â”€ chat.html           # Chatbot interface
â”œâ”€â”€ README.md
â”œâ”€â”€ .gitignore
â””â”€â”€ src/
    â”œâ”€â”€ style.css       # Dark + light theme styling
    â”œâ”€â”€ theme.js        # Theme toggle (persisted in localStorage)
    â””â”€â”€ script.js       # Chat logic, API calls, markdown renderer
```

---

## ðŸš€ How to Run

### Option 1 â€” Open locally
Open `index.html` in any browser. No server or build tools needed.

### Option 2 â€” CodeSandbox / StackBlitz / Replit
1. Create a new **Static HTML** project
2. Recreate the file structure above
3. Paste file contents â€” preview runs instantly

---

## ðŸ”‘ API Key Setup

Enter your key via the sidebar at runtime (stored in `localStorage` only):

| Provider | Key prefix | Model |
|---|---|---|
| **Groq** | `gsk_...` | `llama-3.3-70b-versatile` |
| **Gemini** | `AIza...` | `gemini-2.0-flash` |
| **OpenAI** | `sk-...` | `gpt-3.5-turbo` |

> âš ï¸ Never hardcode API keys in source files.

---

## âœ¨ Key Features

- ðŸŒ™ Dark / Light mode toggle (persisted)
- âš¡ 7 quick-action buttons for instant topic selection
- ðŸ”’ Topic-locked â€” refuses off-topic requests politely
- ðŸ’¬ Multi-turn context â€” full history sent each request
- ðŸ“ Markdown rendering â€” no library, pure JS
- ðŸš« Single-request guard â€” prevents API rate-limit exhaustion
- ðŸ“± Responsive â€” mobile and desktop

---

## ðŸ›  Tech Stack

Pure **HTML5** Â· **CSS3** Â· **Vanilla JavaScript** â€” zero dependencies.

---

## ðŸ‘¨â€ðŸ’» Author

**Vishnu Kashyap D** Â· Built for the Flinders AI Hackathon

---
*Version 1.0.0 — Ready for hackathon submission.*
