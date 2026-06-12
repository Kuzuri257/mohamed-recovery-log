const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

type RecoveryEntry = {
  id: string;
  date_key: string;
  type: string;
  entry_time: string;
  data: Record<string, unknown>;
};

type AiRequest = {
  mode?: "day" | "question" | "entry";
  start?: string;
  end?: string;
  question?: string;
  entryId?: string;
  foodMap?: unknown;
  chatHistory?: unknown;
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "content-type": "application/json; charset=utf-8"
    }
  });
}

function validDateKey(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function text(value: unknown) {
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function entryTitle(entry: RecoveryEntry) {
  const d = entry.data || {};
  if (entry.type === "poop") return text(d.consistency) || "Bowel movement";
  if (entry.type === "food") return text(d.food_variation_name) || text(d.food_family_name) || text(d.canonical_food) || text(d.item) || "Food / drink";
  if (entry.type === "med") return [text(d.name), text(d.dose)].filter(Boolean).join(" ") || "Medication";
  if (entry.type === "symptom") return text(d.symptom) || "Symptom";
  if (entry.type === "sleep") return `Sleep ${text(d.total)}`.trim();
  return text(d.text) || "Note";
}

function entryDetails(entry: RecoveryEntry) {
  const d = entry.data || {};
  if (entry.type === "poop") {
    const linkedFoodNames = Array.isArray(d.linked_foods)
      ? d.linked_foods
        .map((food) => {
          if (!food || typeof food !== "object") return "";
          const item = food as Record<string, unknown>;
          return text(item.food_variation_name) || text(item.food_family_name) || text(item.canonical_food) || text(item.item_raw);
        })
        .filter(Boolean)
      : [];
    const linkedFoods = linkedFoodNames.length || (Array.isArray(d.linked_food_entry_ids)
      ? d.linked_food_entry_ids.length
      : Array.isArray(d.recent_food_ids)
        ? d.recent_food_ids.length
        : 0);
    return [
      text(d.bristol) ? `Bristol stool type ${text(d.bristol)}/7` : "",
      text(d.consistency) ? `consistency ${text(d.consistency)}` : "",
      text(d.urgency) ? `urgency ${text(d.urgency)}/5` : "",
      text(d.gas) ? `gas ${text(d.gas)}` : "",
      text(d.blood) ? `blood ${text(d.blood)}` : "",
      linkedFoodNames.length ? `Linked recent foods/drinks: ${linkedFoodNames.join(", ")}` : linkedFoods ? `${linkedFoods} linked food(s)` : "",
      text(d.notes)
    ].filter(Boolean).join("; ");
  }
  if (entry.type === "food") {
    return [
      text(d.food_family_name) ? `food family ${text(d.food_family_name)}` : "",
      text(d.food_variation_name) ? `variation ${text(d.food_variation_name)}` : "",
      text(d.food_preset_mode) ? `food family mode ${text(d.food_preset_mode)}` : "",
      text(d.food_alias) ? `entered as ${text(d.food_alias)}` : "",
      text(d.food_type) || text(d.ftype),
      text(d.portion_count) ? `portion count ${text(d.portion_count)}` : "",
      text(d.portion_label) || text(d.amount),
      text(d.ingredients) ? `ingredients ${text(d.ingredients)}` : "",
      text(d.calories) ? `${text(d.calories)} cal` : "",
      text(d.protein_g) ? `Protein ${text(d.protein_g)}g` : "",
      text(d.carbs_g) ? `Carbs ${text(d.carbs_g)}g` : "",
      text(d.fat_g) ? `Fat ${text(d.fat_g)}g` : "",
      text(d.fluid_ml) ? `${text(d.fluid_ml)} ml` : "",
      text(d.trial_status) ? `food trial ${text(d.trial_status)}` : "",
      text(d.tolerated) ? `tolerated ${text(d.tolerated)}` : "",
      text(d.notes)
    ].filter(Boolean).join("; ");
  }
  if (entry.type === "med") return text(d.notes);
  if (entry.type === "symptom") {
    const linkedFoods = Array.isArray(d.recent_food_ids) ? d.recent_food_ids.length : 0;
    return [
      text(d.severity) ? `severity ${text(d.severity)}/5` : "",
      linkedFoods ? `${linkedFoods} linked food(s)` : "",
      text(d.notes)
    ].filter(Boolean).join("; ");
  }
  if (entry.type === "sleep") {
    return [
      text(d.bedtime) ? `bed ${text(d.bedtime)}` : "",
      text(d.wakeup) ? `wake ${text(d.wakeup)}` : "",
      text(d.interruptions) ? `${text(d.interruptions)} interruptions` : "",
      text(d.whoop_recovery) ? `recovery ${text(d.whoop_recovery)}%` : "",
      text(d.whoop_sleep_score) ? `sleep score ${text(d.whoop_sleep_score)}%` : "",
      text(d.whoop_hrv) ? `HRV ${text(d.whoop_hrv)}ms` : "",
      text(d.whoop_rhr) ? `RHR ${text(d.whoop_rhr)}bpm` : "",
      text(d.notes)
    ].filter(Boolean).join("; ");
  }
  return "";
}

function compactLog(entries: RecoveryEntry[]) {
  return entries.map(entry => ({
    id: entry.id,
    date: entry.date_key,
    time: entry.entry_time,
    type: entry.type,
    title: entryTitle(entry),
    details: entryDetails(entry)
  }));
}

function addDays(dateKey: string, days: number) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return date.toISOString().slice(0, 10);
}

function buildPrompt(
  mode: AiRequest["mode"],
  start: string,
  end: string,
  focusEntries: RecoveryEntry[],
  historyEntries: RecoveryEntry[],
  foodMap: unknown,
  chatHistory: unknown,
  question?: string,
  entryId?: string
) {
  const selectedEntry = entryId ? focusEntries.find(entry => entry.id === entryId) : undefined;
  const task = mode === "entry"
    ? "Give feedback on the selected log entry, using recent history to explain why it matters and what extra detail might be useful. Preserve entry insight behavior."
    : mode === "question"
      ? "Answer the user's chat question. Use Mohamed's logs when relevant, and otherwise answer general educational recovery questions using Claude's general knowledge."
      : "Create a practical daily recovery insight using today's log and recent 3-7 day history.";

  return `You are Recovery AI, a Claude-powered assistant inside Mohamed's recovery log.

Scope:
- You can answer questions about Mohamed's logs.
- You can answer general educational recovery questions using Claude's general knowledge.
- You can help prepare doctor questions.
- You can explain recovery terms in plain English.
- You do not have live web access. Do not say you checked the web, current sources, or the latest guidance.

Important safety rules:
- Do not diagnose.
- Do not prescribe.
- Do not change medication instructions.
- Do not make treatment decisions.
- Do not say "yes, it is okay" as a definitive medical judgment.
- Do not refuse or dodge direct patient questions when general guidance can help.
- Do not reassure about incision healing or symptoms. Say what was logged and what to monitor.
- Give practical, cautious guidance only.
- Mention urgent red flags only when relevant from the log or history, and phrase them as "seek medical advice urgently if..." not as a diagnosis.
- Keep the tone calm, simple, and useful for a non-technical patient.
- Be concise by default. Do not write long essays.
- Do not repeat the full safety disclaimer inside every answer. Use short safety wording only when relevant.
- Use recent history. Compare today's pattern with earlier days when the history supports it.
- Use the Food Map summary when discussing tolerance. Treat it as a logging signal, not proof of causation.
- Treat confirmed linked foods/drinks on bowel movement logs as stronger logging signals than timing matches, but never as proof of causation.
- When food library fields are present, use food family, variation, portion count, food type, ingredients, and optional nutrition as context. Do not make nutrition dominate the answer.
- For food insights, mention bowel movement count, loose/urgent bowel movements, symptoms after the food, and evidence strength when provided.
- If the data is missing or unclear, say what should be logged next time.
- If there is not enough data to infer a pattern, say that clearly.
- For general questions, start with "In general..." and say it is general information, not a diagnosis.
- For log-aware questions, start with "Based on your logs..." or "From the entries you recorded..." when using logged data.
- Use phrases such as "may be worth watching", "a possible pattern", "not enough data yet", and "bring this up with your care team if it continues."
- Avoid saying a food caused, triggered, or was responsible for symptoms or bowel changes.
- If asked for urgent triage, medication changes, or medical decisions, stay cautious and recommend contacting the care team.

Length rules:
- Normal chat answers: 3-6 short sentences maximum.
- Direct safety questions: 4 short bullets maximum.
- Daily summary: each section should be 1-2 short sentences.
- Entry insight: 2-4 short sentences maximum.
- Follow-up questions: answer the specific question first, then stop.
- Avoid listing every possible cause or too many red flags when they are not relevant.

Direct safety questions:
For questions like "Is this okay?", "Is this normal?", "Should I worry?", "Is my stool color okay?", or "Do I need to call the doctor?", answer directly and briefly:
1. Short practical answer.
2. What would make it concerning.
3. What to log or check.
4. When to contact the care team.
Ask only the minimum missing details.

Stool color questions:
- Brown is generally expected.
- Green, yellow, or orange can happen from food, medication, bile/digestion speed, or recovery changes, but should be tracked if persistent.
- Bright red, dark red, black/tarry, or pale/white/clay-colored stool is more concerning.
- If stool is black/tarry, bright red/dark red, pale/clay-colored, or comes with severe/worsening pain, fever, dizziness, vomiting, weakness, blood, or feeling unwell, advise contacting the care team urgently.
- Ask only: exact color, whether black/tarry or bright/dark red, whether pain/fever/vomiting/dizziness/weakness/blood is present, and whether it happened once or repeatedly.

General "is this normal/okay" template:
"Maybe, but I need one or two details. [Short general guidance]. It is more concerning if [red flags]. Log [specific details]. Contact your care team if [clear escalation]."

Daily summary requirements when mode is day:
1. Today in plain English.
2. What changed from recent days.
3. Food/BM pattern signals.
4. What to watch next.
5. What to log better tomorrow.
6. Worth mentioning to your doctor, if any.
7. Safety note.
Keep each section short. If data is limited, say briefly: "Not enough logged data yet to compare clearly."

Chat answer style when mode is question:
- Direct answer first.
- Then explain whether the answer is based on logs or general information.
- Include uncertainty when relevant.
- Give practical next steps for logging or monitoring.
- Avoid long generic essays.
- If the user asks for more detail, then expand.

Entry insight style when mode is entry:
- 2-4 short sentences.
- One useful observation.
- One next logging suggestion if relevant.
- One brief safety note only if needed.

Task: ${task}
Focus date range: ${start} to ${end}
User question: ${question || ""}
Selected entry id: ${entryId || ""}
Selected entry:
${JSON.stringify(selectedEntry ? compactLog([selectedEntry])[0] : null, null, 2)}

Focus entries:
${JSON.stringify(compactLog(focusEntries), null, 2)}

Recent history before focus range:
${JSON.stringify(compactLog(historyEntries), null, 2)}

Recent chat history in this app session:
${JSON.stringify(chatHistory || [], null, 2)}

Food Map summary from the app:
${JSON.stringify(foodMap || [], null, 2)}

Return only valid JSON with exactly these keys:
{
  "status": "one short phrase, e.g. Stable log, Watch closely, Needs more detail",
  "answer": "direct concise answer when the mode is question, otherwise empty string",
  "summary": "1-3 short sentences summarizing the day, entry, or pattern",
  "today_plain": "1-2 short sentences, or empty string when not mode day",
  "changed_from_recent_days": ["0-3 short changes compared with recent days"],
  "food_bm_signals": ["0-3 short Food Map, confirmed food link, bowel movement, Bristol, urgency, gas, or symptom signals"],
  "watch_next": ["0-3 short practical things to monitor next"],
  "log_better_tomorrow": ["0-3 short concrete logging improvements"],
  "doctor_note": ["0-3 short points worth mentioning to the doctor or care team"],
  "safety_note": "one short cautious safety note only when relevant",
  "insights": ["0-3 short pattern-based observations"],
  "guidance": ["0-3 short practical bullets"],
  "log_quality": ["0-3 short missing details or logging improvements"],
  "doctor_questions": ["0-3 concise questions or points to raise with the doctor"],
  "red_flags": ["0-3 relevant urgent signs only"],
  "follow_up_questions": ["2-4 short useful questions the user could ask next"]
}`;
}

async function getEntries(req: Request, start: string, end: string) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const authHeader = req.headers.get("Authorization") || "";

  if (!supabaseUrl || !anonKey) throw new Error("Supabase environment is not configured.");
  if (!authHeader.toLowerCase().startsWith("bearer ")) throw new Error("Sign in is required.");

  const url = new URL(`${supabaseUrl}/rest/v1/recovery_entries`);
  url.searchParams.set("select", "id,date_key,type,entry_time,data");
  url.searchParams.set("date_key", `gte.${start}`);
  url.searchParams.append("date_key", `lte.${end}`);
  url.searchParams.set("order", "date_key.asc,entry_time.asc");

  const resp = await fetch(url, {
    headers: {
      "apikey": anonKey,
      "authorization": authHeader,
      "accept": "application/json"
    }
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Could not read recovery log: ${text || resp.statusText}`);
  }

  return await resp.json() as RecoveryEntry[];
}

async function callClaude(prompt: string) {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  const model = Deno.env.get("ANTHROPIC_MODEL") || "claude-haiku-4-5-20251001";

  if (!apiKey) throw new Error("Claude API key is not configured yet.");

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model,
      max_tokens: 900,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Claude request failed: ${text || resp.statusText}`);
  }

  const body = await resp.json();
  const text = body?.content?.find((part: { type?: string; text?: string }) => part.type === "text")?.text;
  if (!text) throw new Error("Claude returned an empty response.");
  return text;
}

function parseClaudeJson(text: string) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  return JSON.parse(candidate);
}

Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => ({})) as AiRequest;
    const mode = body.mode === "question" || body.mode === "entry" ? body.mode : "day";
    const start = validDateKey(body.start) ? body.start : "";
    const end = validDateKey(body.end) ? body.end : start;
    const question = typeof body.question === "string" ? body.question.trim().slice(0, 600) : "";
    const entryId = typeof body.entryId === "string" ? body.entryId.trim().slice(0, 120) : "";
    const chatHistory = Array.isArray(body.chatHistory)
      ? body.chatHistory.slice(-8).map((message) => {
        if (!message || typeof message !== "object") return null;
        const item = message as Record<string, unknown>;
        const role = text(item.role) === "user" ? "user" : "assistant";
        return { role, content: text(item.content).slice(0, 900) };
      }).filter(Boolean)
      : [];

    if (!start || !end) return jsonResponse({ error: "A valid start and end date are required." }, 400);
    if (mode === "question" && !question) return jsonResponse({ error: "Ask a question first." }, 400);
    if (mode === "entry" && !entryId) return jsonResponse({ error: "Select an entry first." }, 400);

    const orderedStart = start <= end ? start : end;
    const orderedEnd = start <= end ? end : start;
    const historyStart = addDays(orderedStart, -7);
    const entries = await getEntries(req, historyStart, orderedEnd);
    const focusEntries = entries.filter(entry => entry.date_key >= orderedStart && entry.date_key <= orderedEnd);
    const historyEntries = entries.filter(entry => entry.date_key < orderedStart);

    if (!focusEntries.length && mode !== "question") {
      return jsonResponse({ error: "No logged entries found for that date range." }, 404);
    }
    if (mode === "entry" && !focusEntries.some(entry => entry.id === entryId)) {
      return jsonResponse({ error: "That entry was not found in the selected day." }, 404);
    }

    const text = await callClaude(buildPrompt(mode, orderedStart, orderedEnd, focusEntries, historyEntries, body.foodMap || [], chatHistory, question, entryId));
    let parsed: unknown;
    try {
      parsed = parseClaudeJson(text);
    } catch {
      parsed = {
        status: "Summary generated",
        answer: "",
        summary: text,
        today_plain: "",
        changed_from_recent_days: [],
        food_bm_signals: [],
        watch_next: [],
        log_better_tomorrow: [],
        doctor_note: [],
        safety_note: "",
        insights: [],
        guidance: [],
        log_quality: [],
        doctor_questions: [],
        red_flags: [],
        follow_up_questions: []
      };
    }

    return jsonResponse({ result: parsed });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "AI summary failed." }, 400);
  }
});
