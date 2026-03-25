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

/* ═══════════════════════════════════════════════════════════
   UI & UTILS
═══════════════════════════════════════════════════════════ */

/** Auto-resize textarea */
function autoResizeTextarea() {
  userInput.style.height = "auto";
  userInput.style.height = userInput.scrollHeight + "px";
}

/** Scroll to bottom smoothly */
function scrollToBottom() {
  chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: "smooth" });
}

/** Format time (e.g., "14:30") */
function getTimeStr() {
  const now = new Date();
  return now.getHours().toString().padStart(2, "0") + ":" +
    now.getMinutes().toString().padStart(2, "0");
}

/** Safely escape HTML to prevent XSS */
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ── DOM Manipulation ───────────────────────────────────── */

/**
 * Creates and appends a chat bubble.
 * @param {string} content - HTML string (already markdown parsed).
 * @param {"user"|"bot"} role
 */
function appendMessage(content, role) {
  if (welcomeCard) welcomeCard.style.display = "none";

  const row = document.createElement("div");
  row.className = `msg-row ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "msg-avatar";
  avatar.textContent = role === "bot" ? "🤖" : "👤";

  const body = document.createElement("div");
  body.className = "msg-body";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.innerHTML = content; // content is trusted here (parsed MD)

  const time = document.createElement("div");
  time.className = "msg-time";
  time.textContent = getTimeStr();

  body.appendChild(bubble);
  body.appendChild(time);
  row.appendChild(avatar);
  row.appendChild(body);
  chatWindow.appendChild(row);

  scrollToBottom();
}

/** Show the animated typing dot indicator */
function showTyping() {
  const row = document.createElement("div");
  row.className = "msg-row bot";
  row.id = "typingIndicator";

  const avatar = document.createElement("div");
  avatar.className = "msg-avatar";
  avatar.textContent = "🤖";

  const body = document.createElement("div");
  body.className = "msg-body";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble typing-indicator";

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div");
    dot.className = "typing-dot";
    bubble.appendChild(dot);
  }

  body.appendChild(bubble);
  row.appendChild(avatar);
  row.appendChild(body);
  chatWindow.appendChild(row);

  scrollToBottom();
}

/** Remove the typing indicator */
function hideTyping() {
  const el = document.getElementById("typingIndicator");
  if (el) el.remove();
}

/** Lock/Unlock UI during API calls */
function setInputLocked(locked) {
  userInput.disabled = locked;
  sendBtn.disabled = locked;

  // Visual dimming on the send button wrapper
  if (locked) inputRow.style.opacity = "0.7";
  else inputRow.style.opacity = "1";
}
