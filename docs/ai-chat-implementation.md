# AI Chat Implementation Plan (Integrated CLI Experience)

This plan introduces an OpenAI-powered assistant that lives inside the portfolio's terminal (CLI) interface. The React + Vite frontend continues to deploy on Vercel, while chat requests are proxied through a Vercel serverless function so the OpenAI key remains private.

---

## 1. Objectives & Guardrails

- Transform the landing CLI into a conversational assistant that can answer questions about Ronnie, projects, and skills using curated portfolio data.
- Preserve the synthwave terminal aesthetic while adding a persistent input field and send button for chat interactions.
- Allow the assistant to run local commands (e.g., execute the existing `/boot` sequence) whenever a visitor asks to open the visual portfolio.
- Never expose the OpenAI API key to the client; all traffic goes through a Vercel serverless endpoint with rate limiting.
- Keep responses grounded in the site's data. If information is missing, the assistant should say so rather than fabricate answers.

---

## 2. Data & Prompt Preparation

1. **Content Inventory**
   - Aggregate structured data from `src/data` (projects, experiences, strengths, about summary) plus highlights from `README.md`.
   - Optionally generate a pre-digested knowledge base (`public/ai-knowledge.json`) that the serverless function can reference.
2. **Prompt Template**
   - System prompt sets the tone ("You are the KRINHJ Portfolio AI guide inside a terminal interface..."), clarifies the ability to trigger local commands (e.g., the `/boot` sequence), and enforces grounded responses.
   - Include message metadata such as whether the user is already viewing the portfolio UI or still in the CLI.
3. **Context Retrieval (optional)**
   - Future iterations can embed the knowledge base and perform semantic search. Initial launch can inject curated snippets directly into the request payload.

---

## 3. Backend: Vercel Serverless Function

1. **File Placement**
   - Add `api/ai-chat.ts` (or `.js`) at the repo root. Vercel will deploy it as a serverless function.
2. **Configuration**
   - Store `OPENAI_API_KEY` in Vercel project settings. Optional envs: `AI_CHAT_MODEL` (default `gpt-4o-mini`) and token/timeout caps.
3. **Request Contract**
   - Accept JSON `{ messages: ChatMessage[], context?: { mode: 'cli' | 'portfolio' } }`.
   - Enforce history length and rate limits to control cost.
4. **OpenAI Call**
   - Use the official Node SDK (`openai.responses.create`) or direct HTTPS `fetch`.
   - Support streaming (Server-Sent Events) to keep the terminal output responsive; fall back to full responses if necessary.
5. **Grounding & Command Hooks**
   - Inject knowledge base snippets into the prompt.
   - If the model recommends running a local command (e.g., respond with a directive like `{"action":"RUN_COMMAND","command":"/boot"}`), pass that instruction back to the client for execution.
6. **Testing**
   - Run `vercel dev` locally and hit `http://localhost:3000/api/ai-chat`.
   - Add integration tests (Vitest + supertest) for request validation and error paths.

---

## 4. Frontend Integration (Terminal as Chat Surface)

1. **Terminal Component Refactor**
   - Update `src/components/CLI/Terminal.tsx` (and supporting hooks) to:
     - Render conversational turns (user + assistant) in the scrollable history.
     - Include a persistent input field and send button below the history.
     - Support `Enter` to send and shift+Enter for multi-line (optional).
2. **Message Handling**
   - Build a chat client helper (`src/lib/aiChat.ts`) that posts user messages to `/api/ai-chat`, streams assistant responses, and returns structured data.
   - Append assistant messages to terminal history in real time; preserve legacy logs for boot sequences and static system messages.
   - Treat the literal `/boot` command as a direct trigger while also allowing the assistant to interpret natural-language requests (e.g., "open the portfolio", "show me the UI") and map them to the same boot sequence.
3. **Command Execution**
   - Interpret assistant directives: if the response payload contains a `RUN_COMMAND`, dispatch the corresponding local command (e.g., call the existing command handler for `/boot` to launch the portfolio).
   - Maintain support for typed slash commands (manual `/help`, `/boot`, `/clear`, `/exit` should still work).
4. **State Management**
   - Local state (React hooks) is sufficient; use `useReducer` or similar to manage chat history and in-flight requests.
   - Trim stored history (e.g., keep last ~10 exchanges) before sending to the API.
5. **Accessibility**
   - Focus management: keep the input focused after sends; allow keyboard navigation within history.
   - Announce streaming updates with `aria-live="polite"`; ensure the send button and input have proper labels.

---

## 5. Styling & Motion

- Preserve the neon terminal shell - adjust spacing to match `docs/spacing-guidelines.md` while fitting the input bar.
- Style chat turns using existing mono fonts and subtle glow accents to distinguish user vs assistant.
- Provide visible states for loading (animated scan line), error messages, and disabled controls during requests.
- Ensure responsive behavior on mobile: input should dock at the bottom with adequate touch targets.

---

## 6. Observability & Safeguards

- Log serverless errors without capturing sensitive content.
- Rate-limit the client UI (e.g., disable send if a request is in flight) to prevent accidental spamming.
- Handle failure states gracefully: show fallback messaging and allow retry.
- Consider lightweight analytics (e.g., command usage counts) to understand chat adoption - avoid storing full transcripts unless privacy reviewed.

---

## 7. Launch Checklist

1. Implement the serverless function; verify happy path and error handling locally.
2. Refactor the terminal UI with the new input bar, streaming output, and command execution bridge.
3. Validate that manual commands (`/help`, `/boot`, `/clear`, `/exit`) still work alongside chat messages.
4. Test the auto-boot flow: assistant recognizes "show me the portfolio" and triggers `/boot`.
5. Run accessibility, responsive, and performance checks (Lighthouse, keyboard navigation, reduced motion).
6. Update supporting documentation (style/spacing guides if new patterns appear, PRD, AGENTS).
7. Deploy to a Vercel preview, run smoke tests, then promote to production.
8. Monitor usage post-launch and refine prompts, rate limits, or UI affordances based on feedback.

Iterate on this plan as we introduce retrieval augmentation, analytics, or future features such as multi-modal responses.
