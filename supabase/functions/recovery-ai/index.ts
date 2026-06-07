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
  if (entry.type === "food") return text(d.item) || "Food / drink";
  if (entry.type === "med") return [text(d.name), text(d.dose)].filter(Boolean).join(" ") || "Medication";
  if (entry.type === "symptom") return text(d.symptom) || "Symptom";
  if (entry.type === "sleep") return `Sleep ${text(d.total)}`.trim();
  return text(d.text) || "Note";
}

function entryDetails(entry: RecoveryEntry) {
  const d = entry.data || {};
  if (entry.type === "poop") {
    const linkedFoods = Array.isArray(d.recent_food_ids) ? d.recent_food_ids.length : 0;
    return [
      text(d.urgency) ? `urgency ${text(d.urgency)}/5` : "",
      text(d.gas) ? `gas ${text(d.gas)}` : "",
      text(d.blood) ? `blood ${text(d.blood)}` : "",
      linkedFoods ? `${linkedFoods} linked food(s)` : "",
      text(d.notes)
    ].filter(Boolean).join("; ");
  }
  if (entry.type === "food") {
    return [
      text(d.ftype),
      text(d.amount),
      text(d.ingredients) ? `ingredients ${text(d.ingredients)}` : "",
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
  question?: string,
  entryId?: string
) {
  const selectedEntry = entryId ? focusEntries.find(entry => entry.id === entryId) : undefined;
  const task = mode === "entry"
    ? "Give feedback on the selected log entry, using recent history to explain why it matters and what extra detail might be useful."
    : mode === "question"
      ? "Answer the user's question using today's log and recent history."
      : "Create a daily recovery summary using today's log and recent history.";

  return `You are RecoveryLog AI, a cautious post-procedure recovery log assistant for a patient and caregiver.

Important safety rules:
- Do not diagnose.
- Do not change medication instructions.
- Do not say something is safe, normal, typical, or expected.
- Do not reassure about incision healing or symptoms. Say what was logged and what to monitor.
- Give practical, cautious guidance only.
- Mention urgent red flags only when relevant from the log or history, and phrase them as "seek medical advice urgently if..." not as a diagnosis.
- Keep the tone calm, simple, and useful for a non-technical patient.
- Use recent history. Compare today's pattern with earlier days when the history supports it.
- Use the Food Map summary when discussing tolerance. Treat it as a logging signal, not proof of causation.
- For food insights, mention bowel movement count, loose/urgent bowel movements, symptoms after the food, and evidence strength when provided.
- If the data is missing or unclear, say what should be logged next time.
- If there is not enough data to infer a pattern, say that clearly.

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

Food Map summary from the app:
${JSON.stringify(foodMap || [], null, 2)}

Return only valid JSON with exactly these keys:
{
  "status": "one short phrase, e.g. Stable log, Watch closely, Needs more detail",
  "answer": "direct answer when the mode is question, otherwise empty string",
  "summary": "2-4 short sentences summarizing the day, entry, or pattern",
  "insights": ["2-5 pattern-based observations that use today and recent history"],
  "guidance": ["3-5 practical bullets for what to keep doing, monitoring, or logging"],
  "log_quality": ["0-4 missing details or logging improvements"],
  "doctor_questions": ["0-4 concise questions or points to raise with the doctor"],
  "red_flags": ["0-4 symptoms that would justify urgent medical advice if present or worsening"],
  "follow_up_questions": ["2-4 useful questions the user could ask next"]
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
      max_tokens: 1100,
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

    if (!start || !end) return jsonResponse({ error: "A valid start and end date are required." }, 400);
    if (mode === "question" && !question) return jsonResponse({ error: "Ask a question first." }, 400);
    if (mode === "entry" && !entryId) return jsonResponse({ error: "Select an entry first." }, 400);

    const orderedStart = start <= end ? start : end;
    const orderedEnd = start <= end ? end : start;
    const historyStart = addDays(orderedStart, -7);
    const entries = await getEntries(req, historyStart, orderedEnd);
    const focusEntries = entries.filter(entry => entry.date_key >= orderedStart && entry.date_key <= orderedEnd);
    const historyEntries = entries.filter(entry => entry.date_key < orderedStart);

    if (!focusEntries.length) {
      return jsonResponse({ error: "No logged entries found for that date range." }, 404);
    }
    if (mode === "entry" && !focusEntries.some(entry => entry.id === entryId)) {
      return jsonResponse({ error: "That entry was not found in the selected day." }, 404);
    }

    const text = await callClaude(buildPrompt(mode, orderedStart, orderedEnd, focusEntries, historyEntries, body.foodMap || [], question, entryId));
    let parsed: unknown;
    try {
      parsed = parseClaudeJson(text);
    } catch {
      parsed = {
        status: "Summary generated",
        answer: "",
        summary: text,
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
