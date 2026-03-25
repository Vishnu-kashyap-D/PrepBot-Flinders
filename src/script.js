/**
 * PLACEBOT — script.js
 * Contains all business logic, API routing, markdown rendering,
 * conversation history management, and topic-locking.
 */

/* ═══════════════════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════════════════ */

/** Paste your Groq (gsk_...), Gemini (AIza...) or OpenAI (sk-...) key here,
 *  or enter it at runtime via the sidebar API key input.
 *  NEVER commit a real key to version control. */
let API_KEY = "";

/* API Endpoints */
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

/**
 * Topic Locking System Prompt
 * Sent as the first "system" message in every request.
 */
const SYSTEM_PROMPT = `You are PlaceBot, a highly professional, concise, and expert placement mentor for engineering undergraduate students.
Your ONLY purpose is to help students with campus placement preparation. This includes:
1. HR Interview questions and answers.
2. Technical interviews (DSA, web dev, core subjects).
3. Aptitude and logical reasoning.
4. Resume building, ATS optimization, and project descriptions.
5. Soft skills, email etiquette, and offer negotiation.
6. Company-specific strategies (TCS, Google, Amazon, etc.).

STRICT RULES:
- If a user asks a question UNRELATED to placements, academics, or careers, you MUST politely refuse to answer and guide them back to placement prep.
- Your answers must be structured, nicely formatted using markdown, and easy to read.
- When giving code examples, always use markdown code blocks.
- Be encouraging but direct. No fluff.`;

/* ═══════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════ */

/** Full conversation history — sent on every API call for context. */
const conversationHistory = [];

/**
 * Hard guard: only ONE request can be active at any time.
 * This prevents rate-limit exhaustion even if the UI disable
 * is somehow bypassed (e.g. rapid Enter key presses).
 */
let isRequestPending = false;

/* ═══════════════════════════════════════════════════════════
   DOM REFERENCES
═══════════════════════════════════════════════════════════ */

const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const welcomeCard = document.getElementById("welcomeCard");
const inputRow = document.getElementById("inputRow");

/* API Config Elements */
const apiKeyInput = document.getElementById("apiKeyInput");
const apiSaveBtn = document.getElementById("apiSaveBtn");
const apiStatusBadge = document.getElementById("apiStatusBadge");
