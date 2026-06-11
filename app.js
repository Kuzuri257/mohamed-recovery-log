// ─── State ───────────────────────────────────────────────────────────────────
const APP_TIME_ZONE = 'Asia/Bahrain';
const BAHRAIN_OFFSET_MINUTES = 3 * 60;
const SURGERY_DATE_KEY = '2026-06-02';
const START_DATE_KEY = '2026-06-07';
const STORAGE_KEY = 'recovery-log-v2';
const LEGACY_STORAGE_KEY = 'recovery-log-cache';
const DELETED_STORAGE_KEY = 'recovery-log-deleted-v1';
const FOOD_LIBRARY_STORAGE_KEY = 'recovery-log-food-library-v21';
const FOOD_LIBRARY_SEEDED_KEY = 'recovery-log-food-library-seeded-v21';
const THEME_STORAGE_KEY = 'recovery-log-theme';
const MED_PRESETS = [
  { name: 'Paracetamol', dose: '500mg' },
  { name: 'Imodium', dose: '1 tablet' },
  { name: 'Electrolytes', dose: '1 sachet' }
];
const BRISTOL_TYPES = [
  { value: '1', short: 'Hard lumps', label: 'Separate hard lumps', tone: 'hard', color: '#5c3326', tint: '#f3dfc1' },
  { value: '2', short: 'Lumpy', label: 'Sausage-shaped, lumpy', tone: 'hard', color: '#704127', tint: '#f3dfc1' },
  { value: '3', short: 'Cracked', label: 'Sausage with cracks', tone: 'ideal', color: '#8c5a36', tint: '#f6e6c9' },
  { value: '4', short: 'Smooth', label: 'Smooth, soft sausage', tone: 'ideal', color: '#9d6a3d', tint: '#f6e6c9' },
  { value: '5', short: 'Soft blobs', label: 'Soft blobs, clear edges', tone: 'loose', color: '#b6763c', tint: '#f8e8cc' },
  { value: '6', short: 'Mushy', label: 'Fluffy or mushy pieces', tone: 'loose', color: '#bb7d42', tint: '#f8e8cc' },
  { value: '7', short: 'Watery', label: 'Watery, no solid pieces', tone: 'watery', color: '#c88a4d', tint: '#faebd4' }
];
const FOOD_PRESETS = [
  { key: 'chicken-broth', name: 'Chicken broth', icon: '🥣', aliases: ['chicken broth', 'chicken broth soup', 'clear chicken soup', 'broth soup'], required: ['chicken', 'broth'] },
  { key: 'chicken-soup', name: 'Chicken soup', icon: '🍲', aliases: ['chicken soup', 'chicken vegetable soup'], required: ['chicken', 'soup'] },
  { key: 'white-rice', name: 'White rice', icon: '🍚', aliases: ['white rice', 'plain rice', 'rice'], required: ['rice'] },
  { key: 'banana', name: 'Banana', icon: '🍌', aliases: ['banana', 'ripe banana'], required: ['banana'] },
  { key: 'toast', name: 'Toast', icon: '🍞', aliases: ['toast', 'white toast', 'bread toast'], required: ['toast'] },
  { key: 'yogurt', name: 'Yogurt', icon: '🥛', aliases: ['yogurt', 'plain yogurt', 'greek yogurt'], required: ['yogurt'] },
  { key: 'low-fat-milk', name: 'Low-fat milk', icon: '🥛', aliases: ['low fat milk', 'low-fat milk', 'skim milk'], required: ['milk'] },
  { key: 'egg', name: 'Egg', icon: '🥚', aliases: ['egg', 'boiled egg', 'scrambled egg'], required: ['egg'] },
  { key: 'potato', name: 'Potato', icon: '🥔', aliases: ['potato', 'mashed potato', 'boiled potato'], required: ['potato'] },
  { key: 'oats', name: 'Oats', icon: '🥣', aliases: ['oats', 'oatmeal', 'porridge'], required: ['oats'] }
];
const STARTER_FOOD_PRESETS = [
  { name: 'Chicken broth', food_type: 'Liquid', ingredients: 'Chicken stock, water, light seasoning', default_portion_label: '1 bowl', portion_amount: 1, portion_unit: 'bowl', pinned: true, variations: ['Clear broth', 'Creamy broth'] },
  { name: 'Chicken soup', food_type: 'Mixed', ingredients: 'Chicken, broth, soft vegetables', default_portion_label: '1 bowl', portion_amount: 1, portion_unit: 'bowl', pinned: false, variations: [] },
  { name: 'White rice', food_type: 'Soft', ingredients: 'White rice', default_portion_label: '1 bowl', portion_amount: 1, portion_unit: 'bowl', calories: 205, protein_g: 4, carbs_g: 45, fat_g: 0, pinned: true, variations: [] },
  { name: 'Banana', food_type: 'Soft', ingredients: 'Banana', default_portion_label: '1 small banana', portion_amount: 1, portion_unit: 'banana', calories: 90, protein_g: 1, carbs_g: 23, fat_g: 0, pinned: true, variations: ['Half banana'] },
  { name: 'Toast', food_type: 'Solid', ingredients: 'White bread', default_portion_label: '1 slice', portion_amount: 1, portion_unit: 'slice', calories: 80, protein_g: 3, carbs_g: 15, fat_g: 1, pinned: false, variations: ['Plain toast'] },
  { name: 'Yogurt', food_type: 'Soft', ingredients: 'Milk cultures', default_portion_label: '1 cup', portion_amount: 1, portion_unit: 'cup', calories: 120, protein_g: 8, carbs_g: 12, fat_g: 4, pinned: true, variations: ['Plain yogurt', 'Low-fat yogurt'] },
  { name: 'Low-fat milk', food_type: 'Liquid', ingredients: 'Milk', default_portion_label: '1 cup', portion_amount: 1, portion_unit: 'cup', calories: 100, protein_g: 8, carbs_g: 12, fat_g: 2, pinned: false, variations: [] },
  { name: 'Egg', food_type: 'Solid', ingredients: 'Egg', default_portion_label: '1 egg', portion_amount: 1, portion_unit: 'egg', calories: 70, protein_g: 6, carbs_g: 0, fat_g: 5, pinned: true, variations: ['Boiled egg', 'Egg with cheese', 'Scrambled egg'] },
  { name: 'Potato', food_type: 'Soft', ingredients: 'Potato', default_portion_label: '1 small potato', portion_amount: 1, portion_unit: 'potato', calories: 130, protein_g: 3, carbs_g: 30, fat_g: 0, pinned: false, variations: ['Mashed potato', 'Boiled potato'] },
  { name: 'Oats', food_type: 'Soft', ingredients: 'Oats, water', default_portion_label: '1 bowl', portion_amount: 1, portion_unit: 'bowl', calories: 150, protein_g: 5, carbs_g: 27, fat_g: 3, pinned: true, variations: ['Plain oats'] }
];

let allDays = {}; // { 'YYYY-MM-DD': [entries] }
let deletedEntryIds = [];
let foodPresets = [];
let foodPresetVariations = [];
let foodLibraryFilter = 'all';
let selectedFoodPresetId = '';
let activeFoodLogPresetId = '';
let activeFoodLogVariationId = '';
let activeFoodLogMode = 'once';
let currentDay = todayKey();
let fabOpen = false;
let supabaseClient = null;
let currentUser = null;
let applyingCloud = false;
let syncPanelOpen = false;
let activeMainTab = 'log';
let editingEntryId = null;
let foodMapFilter = 'important';
let foodMapSort = 'reaction';

function todayKey() {
  return keyFromBahrainDate(new Date());
}

function keyFromBahrainDate(date) {
  const bahrainClock = new Date(date.getTime() + BAHRAIN_OFFSET_MINUTES * 60000);
  return bahrainClock.toISOString().slice(0, 10);
}

function utcDayFromKey(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

function addDaysToKey(dateKey, days) {
  return new Date(utcDayFromKey(dateKey) + days * 86400000).toISOString().slice(0, 10);
}

function dateInBahrainFromKey(dateKey) {
  return new Date(utcDayFromKey(dateKey) - BAHRAIN_OFFSET_MINUTES * 60000);
}

function dayNumber(dateKey) {
  const diff = Math.round((utcDayFromKey(dateKey) - utcDayFromKey(SURGERY_DATE_KEY)) / 86400000);
  return diff + 1;
}

function formatBahrainDate(dateKey, options) {
  return dateInBahrainFromKey(dateKey).toLocaleDateString('en-GB', {
    timeZone: APP_TIME_ZONE,
    ...options
  });
}

function formatFullDate(dateKey) {
  return formatBahrainDate(dateKey, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function currentBahrainTime() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: APP_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date());
  const hour = parts.find(part => part.type === 'hour')?.value || '00';
  const minute = parts.find(part => part.type === 'minute')?.value || '00';
  return `${hour}:${minute}`;
}

function appRedirectUrl() {
  return window.location.href.split('#')[0].split('?')[0];
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

function currentTheme() {
  return document.documentElement.dataset.theme === 'night' ? 'night' : 'day';
}

function applyTheme(theme, persist = true) {
  const nextTheme = theme === 'night' ? 'night' : 'day';
  document.documentElement.dataset.theme = nextTheme === 'night' ? 'night' : '';
  if (persist) {
    try { localStorage.setItem(THEME_STORAGE_KEY, nextTheme); } catch(e) {}
  }
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.textContent = nextTheme === 'night' ? 'Day' : 'Night';
    toggle.setAttribute('aria-label', nextTheme === 'night' ? 'Switch to day mode' : 'Switch to night mode');
  }
  const meta = document.getElementById('themeColorMeta');
  if (meta) meta.setAttribute('content', nextTheme === 'night' ? '#121212' : '#FAF7F2');
}

function toggleTheme() {
  applyTheme(currentTheme() === 'night' ? 'day' : 'night');
}

// ─── Storage ─────────────────────────────────────────────────────────────────
function saveLocal() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 2,
      savedAt: new Date().toISOString(),
      days: allDays
    }));
    localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(deletedEntryIds));
    return true;
  } catch(e) {
    setSyncStatus('error');
    return false;
  }
}

function loadLocal() {
  try {
    const deletedRaw = localStorage.getItem(DELETED_STORAGE_KEY);
    if (deletedRaw) deletedEntryIds = JSON.parse(deletedRaw) || [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      allDays = parsed.days || {};
      return;
    }
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      allDays = JSON.parse(legacyRaw);
      saveLocal();
    }
  } catch(e) { allDays = {}; }
}

function newLocalId(prefix = 'local') {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, ch => {
    const r = Math.random() * 16 | 0;
    const v = ch === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function normalizeFoodType(value) {
  const type = String(value || 'Unknown').trim();
  return ['Unknown', 'Liquid', 'Soft', 'Solid', 'Mixed'].includes(type) ? type : 'Unknown';
}

function saveFoodLibraryLocal() {
  try {
    localStorage.setItem(FOOD_LIBRARY_STORAGE_KEY, JSON.stringify({
      version: 21,
      savedAt: new Date().toISOString(),
      presets: foodPresets,
      variations: foodPresetVariations
    }));
    return true;
  } catch(e) {
    return false;
  }
}

function loadFoodLibraryLocal() {
  try {
    const raw = localStorage.getItem(FOOD_LIBRARY_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    foodPresets = Array.isArray(parsed.presets) ? parsed.presets : [];
    foodPresetVariations = Array.isArray(parsed.variations) ? parsed.variations : [];
  } catch(e) {
    foodPresets = [];
    foodPresetVariations = [];
  }
}

function seedStarterFoodLibrary(force = false) {
  if (!force && foodPresets.length) return false;
  const existing = new Set(foodPresets.map(food => normalizeFoodName(food.name)));
  const now = new Date().toISOString();
  STARTER_FOOD_PRESETS.forEach(seed => {
    if (existing.has(normalizeFoodName(seed.name))) return;
    const id = newLocalId('food');
    foodPresets.push({
      id,
      user_id: currentUser?.id || '',
      source: 'starter',
      name: seed.name,
      normalized_name: normalizeFoodName(seed.name),
      food_type: normalizeFoodType(seed.food_type),
      ingredients: seed.ingredients || '',
      default_portion_label: seed.default_portion_label || '',
      portion_amount: seed.portion_amount || '',
      portion_unit: seed.portion_unit || '',
      calories: seed.calories ?? '',
      protein_g: seed.protein_g ?? '',
      carbs_g: seed.carbs_g ?? '',
      fat_g: seed.fat_g ?? '',
      notes: seed.notes || '',
      pinned: !!seed.pinned,
      archived: false,
      created_at: now,
      updated_at: now
    });
    (seed.variations || []).forEach(name => {
      foodPresetVariations.push({
        id: newLocalId('variation'),
        user_id: currentUser?.id || '',
        preset_id: id,
        name,
        normalized_name: normalizeFoodName(name),
        food_type: '',
        ingredients: '',
        portion_label: '',
        portion_amount: '',
        portion_unit: '',
        calories: '',
        protein_g: '',
        carbs_g: '',
        fat_g: '',
        notes: '',
        created_at: now,
        updated_at: now
      });
    });
    existing.add(normalizeFoodName(seed.name));
  });
  try { localStorage.setItem(FOOD_LIBRARY_SEEDED_KEY, 'true'); } catch(e) {}
  saveFoodLibraryLocal();
  return true;
}

function ensureFoodLibrarySeeded() {
  loadFoodLibraryLocal();
  seedStarterFoodLibrary(false);
}

function foodTypeToLegacyFtype(type) {
  return {
    Liquid: 'Fluid',
    Soft: 'Soft food',
    Solid: 'Solid food',
    Mixed: 'Soft food',
    Unknown: ''
  }[normalizeFoodType(type)] || '';
}

function foodPresetById(id) {
  return foodPresets.find(food => food.id === id) || null;
}

function foodVariationById(id) {
  return foodPresetVariations.find(variation => variation.id === id) || null;
}

function foodVariationsForPreset(id) {
  return foodPresetVariations.filter(variation => variation.preset_id === id);
}

function foodNutritionLine(food) {
  const bits = [];
  if (food?.calories !== '' && food?.calories !== null && food?.calories !== undefined) bits.push(`${food.calories} cal`);
  if (food?.protein_g !== '' && food?.protein_g !== null && food?.protein_g !== undefined) bits.push(`Protein ${food.protein_g}g`);
  if (food?.carbs_g !== '' && food?.carbs_g !== null && food?.carbs_g !== undefined) bits.push(`Carbs ${food.carbs_g}g`);
  if (food?.fat_g !== '' && food?.fat_g !== null && food?.fat_g !== undefined) bits.push(`Fat ${food.fat_g}g`);
  return bits.join(' · ');
}

function foodLibraryRows(includeArchived = false) {
  return foodPresets
    .filter(food => includeArchived ? food.archived : !food.archived)
    .slice()
    .sort((a, b) => (b.pinned === true) - (a.pinned === true) || a.name.localeCompare(b.name));
}

function recentlyLoggedFoodPresetIds(limit = 8) {
  const seen = new Set();
  const ids = [];
  allEntriesWithDates().slice().reverse().forEach(entry => {
    if (entry.type !== 'food') return;
    const id = entry.data?.food_preset_id;
    if (!id || seen.has(id)) return;
    if (!foodPresetById(id) || foodPresetById(id)?.archived) return;
    seen.add(id);
    ids.push(id);
  });
  return ids.slice(0, limit);
}

async function loadFoodLibraryFromCloud() {
  if (!supabaseClient || !currentUser) return false;
  const presetsResult = await supabaseClient
    .from('food_presets')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('name', { ascending: true });
  if (presetsResult.error) throw presetsResult.error;
  const variationsResult = await supabaseClient
    .from('food_preset_variations')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('name', { ascending: true });
  if (variationsResult.error) throw variationsResult.error;
  foodPresets = presetsResult.data || [];
  foodPresetVariations = variationsResult.data || [];
  if (!foodPresets.length) {
    seedStarterFoodLibrary(true);
    await uploadFoodLibraryToCloud();
  }
  saveFoodLibraryLocal();
  return true;
}

async function uploadFoodLibraryToCloud() {
  if (!supabaseClient || !currentUser || applyingCloud) return;
  const now = new Date().toISOString();
  const asNumberOrNull = value => value === '' || value === null || value === undefined ? null : Number(value);
  const presets = foodPresets.map(food => ({
    ...food,
    user_id: currentUser.id,
    normalized_name: normalizeFoodName(food.name),
    food_type: normalizeFoodType(food.food_type),
    portion_amount: asNumberOrNull(food.portion_amount),
    calories: asNumberOrNull(food.calories),
    protein_g: asNumberOrNull(food.protein_g),
    carbs_g: asNumberOrNull(food.carbs_g),
    fat_g: asNumberOrNull(food.fat_g),
    updated_at: food.updated_at || now
  }));
  const variations = foodPresetVariations.map(variation => ({
    ...variation,
    user_id: currentUser.id,
    normalized_name: normalizeFoodName(variation.name),
    portion_amount: asNumberOrNull(variation.portion_amount),
    calories: asNumberOrNull(variation.calories),
    protein_g: asNumberOrNull(variation.protein_g),
    carbs_g: asNumberOrNull(variation.carbs_g),
    fat_g: asNumberOrNull(variation.fat_g),
    updated_at: variation.updated_at || now
  }));
  if (presets.length) {
    const result = await supabaseClient.from('food_presets').upsert(presets, { onConflict: 'id' });
    if (result.error) throw result.error;
  }
  if (variations.length) {
    const result = await supabaseClient.from('food_preset_variations').upsert(variations, { onConflict: 'id' });
    if (result.error) throw result.error;
  }
}

function persistFoodLibrary() {
  saveFoodLibraryLocal();
  renderFoodLibrary();
  renderFoodMap();
  uploadFoodLibraryToCloud().catch(e => {
    setAuthStatus(`Food Library saved locally. Cloud sync needs v21 SQL: ${e.message}`);
  });
}

// Show sync status
function setSyncStatus(state) {
  const el = document.getElementById('syncStatus');
  if (!el) return;
  const states = {
    saving: { icon: '⏳', text: 'Saving...', color: 'var(--ink-faint)' },
    saved:  { icon: '✅', text: 'Saved on this device', color: 'var(--accent-teal)' },
    synced: { icon: '✅', text: 'Synced to Supabase', color: 'var(--accent-teal)' },
    syncwait: { icon: '⏳', text: 'Syncing...', color: 'var(--ink-faint)' },
    local: { icon: '📱', text: 'Local mode', color: 'var(--ink-faint)' },
    error:  { icon: '⚠️', text: 'Save failed — export backup now', color: 'var(--accent-amber)' },
    loading:{ icon: '⏳', text: 'Loading your log...', color: 'var(--ink-faint)' },
  };
  const s = states[state] || states.saved;
  el.innerHTML = `<span style="color:${s.color};font-size:11px;font-family:'DM Mono',monospace">${s.icon} ${s.text}</span>`;
}

function save() {
  setSyncStatus('saving');
  setSyncStatus(saveLocal() ? 'saved' : 'error');
}

function load() {
  loadLocal();
  ensureFoodLibrarySeeded();
  if (!allDays[currentDay]) allDays[currentDay] = [];
  renderAll();
  setSyncStatus('saved');
  setReportToToday();
}

// ─── Supabase sync ────────────────────────────────────────────────────────────
function setAuthStatus(message) {
  const el = document.getElementById('authStatus');
  if (el) el.textContent = message;
}

function toggleSyncPanel(force) {
  syncPanelOpen = typeof force === 'boolean' ? force : !syncPanelOpen;
  const panel = document.getElementById('syncPanel');
  if (panel) panel.classList.toggle('hidden', !syncPanelOpen);
}

function switchMainTab(tab) {
  activeMainTab = ['log', 'foodmap', 'foodlibrary', 'tools'].includes(tab) ? tab : 'log';
  fabOpen = false;
  const logView = document.getElementById('logView');
  const foodMapView = document.getElementById('foodMapView');
  const foodLibraryView = document.getElementById('foodLibraryView');
  const toolsView = document.getElementById('toolsView');
  const logBtn = document.getElementById('logTabBtn');
  const foodMapBtn = document.getElementById('foodMapTabBtn');
  const foodLibraryBtn = document.getElementById('foodLibraryTabBtn');
  const toolsBtn = document.getElementById('toolsTabBtn');
  const quickBar = document.querySelector('.quick-log-bar');
  const fabOptions = document.getElementById('fabOptions');
  if (logView) logView.classList.toggle('hidden', activeMainTab !== 'log');
  if (foodMapView) foodMapView.classList.toggle('hidden', activeMainTab !== 'foodmap');
  if (foodLibraryView) foodLibraryView.classList.toggle('hidden', activeMainTab !== 'foodlibrary');
  if (toolsView) toolsView.classList.toggle('hidden', activeMainTab !== 'tools');
  if (logBtn) logBtn.classList.toggle('active', activeMainTab === 'log');
  if (foodMapBtn) foodMapBtn.classList.toggle('active', activeMainTab === 'foodmap');
  if (foodLibraryBtn) foodLibraryBtn.classList.toggle('active', activeMainTab === 'foodlibrary');
  if (toolsBtn) toolsBtn.classList.toggle('active', activeMainTab === 'tools');
  if (quickBar) quickBar.classList.toggle('hidden', activeMainTab !== 'log');
  if (fabOptions) fabOptions.classList.add('hidden');
  if (activeMainTab === 'foodmap') renderFoodMap();
  if (activeMainTab === 'foodlibrary') renderFoodLibrary();
}

function toggleAdvancedTools() {
  const body = document.getElementById('advancedTools');
  const caret = document.getElementById('advancedCaret');
  if (!body) return;
  const willOpen = body.classList.contains('hidden');
  body.classList.toggle('hidden', !willOpen);
  if (caret) caret.textContent = willOpen ? '-' : '+';
}

function updateAuthUI() {
  const signedOut = document.getElementById('authSignedOut');
  const signedIn = document.getElementById('authSignedIn');
  const emailLabel = document.getElementById('authEmailLabel');
  const toggleBtn = document.getElementById('syncToggleBtn');
  if (!signedOut || !signedIn) return;
  signedOut.classList.toggle('hidden', !!currentUser);
  signedIn.classList.toggle('hidden', !currentUser);
  if (emailLabel && currentUser) emailLabel.textContent = `Signed in as ${currentUser.email || 'Mohamed'}`;
  if (toggleBtn) toggleBtn.textContent = currentUser ? 'Account' : 'Sign in';
}

function renderAIList(title, items) {
  if (!Array.isArray(items) || !items.length) return '';
  return `
    <div class="ai-list-title">${escapeHTML(title)}</div>
    <ul class="ai-list">${items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>
  `;
}

function setAIButtonLoading(isLoading) {
  const summaryBtn = document.getElementById('aiSummaryBtn');
  const askBtn = document.getElementById('aiAskBtn');
  if (summaryBtn) {
    summaryBtn.disabled = isLoading;
    summaryBtn.textContent = isLoading ? 'Thinking...' : 'Summarize today';
  }
  if (askBtn) askBtn.disabled = isLoading;
}

function showAIError(message, targetId = 'aiSummaryResult') {
  const result = document.getElementById(targetId);
  if (!result) return;
  result.innerHTML = `<div class="ai-error">${escapeHTML(message)}</div>`;
}

function showAISummary(result, targetId = 'aiSummaryResult') {
  const target = document.getElementById(targetId);
  if (!target) return;
  const data = result || {};
  const detailHTML = [
    renderAIList('Insights', data.insights),
    renderAIList('Guidance', data.guidance),
    renderAIList('Improve tomorrow’s log', data.log_quality),
    renderAIList('Doctor questions', data.doctor_questions),
    renderAIList('Red flags to watch', data.red_flags),
    renderAIList('Ask next', data.follow_up_questions)
  ].filter(Boolean).join('');
  target.innerHTML = `
    <div class="ai-result">
      <div class="ai-status-pill">${escapeHTML(data.status || 'Summary')}</div>
      ${data.answer ? `<div class="ai-summary-text">${escapeHTML(data.answer)}</div>` : ''}
      <div class="ai-summary-text">${escapeHTML(data.summary || 'No summary returned.')}</div>
      ${detailHTML ? `<details class="ai-detail"><summary>Show details</summary>${detailHTML}</details>` : ''}
    </div>
  `;
}

async function runRecoveryAI(mode, extraBody = {}, loadingMessage = 'Claude is reading today’s log and recent history...', targetId = 'aiSummaryResult') {
  if (!supabaseClient) {
    showAIError('Cloud sync is not configured yet.', targetId);
    return null;
  }
  if (!currentUser) {
    toggleSyncPanel(true);
    showAIError('Sign in first, then Claude can use the synced log and history.', targetId);
    return null;
  }
  const entries = allDays[currentDay] || [];
  if (!entries.length) {
    showAIError('Add at least one entry for this day before asking Claude.', targetId);
    return null;
  }

  setAIButtonLoading(true);
  showAIError(loadingMessage, targetId);
  try {
    await uploadLocalEntries();
    const foodMap = buildFoodMapModel();
    const { data, error } = await supabaseClient.functions.invoke('recovery-ai', {
      body: {
        mode,
        start: currentDay,
        end: currentDay,
        foodMap: foodMap.cards.slice(0, 12).map(card => ({
          food: card.name,
          food_type: card.foodType,
          aliases: card.aliases,
          variations: card.aliases,
          archived: card.archived,
          status: card.label,
          meals: card.meals,
          bm_after: card.bmLinks,
          loose_bm_after: card.looseBms,
          symptoms_after: card.symptomLinks,
          reaction_score: card.reactionScore,
          evidence: { marked: card.markedLinks, timing: card.timingLinks }
        })),
        ...extraBody
      }
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    showAISummary(data?.result, targetId);
    return data?.result || null;
  } catch(e) {
    showAIError(`AI summary failed: ${e.message || e}`, targetId);
    return null;
  } finally {
    setAIButtonLoading(false);
  }
}

async function generateAISummary() {
  await runRecoveryAI('day');
}

async function askAIQuestion() {
  const input = document.getElementById('aiQuestion');
  const question = (input?.value || '').trim();
  if (!question) {
    showAIError('Type a question first.');
    return;
  }
  await runRecoveryAI('question', { question }, 'Claude is checking today against recent history...');
}

async function generateEntryInsight(button) {
  const entryId = button?.dataset?.entryId || '';
  if (!entryId) {
    showAIError('Could not identify that entry.');
    return;
  }
  const targetId = `aiEntryResult-${entryId}`;
  button.disabled = true;
  button.textContent = 'Thinking...';
  await runRecoveryAI('entry', { entryId }, 'Claude is reviewing that entry with recent history...', targetId);
  button.disabled = false;
  button.textContent = 'AI insight';
}

async function loadSyncConfig() {
  if (window.RECOVERY_SUPABASE_CONFIG?.supabaseUrl && window.RECOVERY_SUPABASE_CONFIG?.supabaseAnonKey) {
    return window.RECOVERY_SUPABASE_CONFIG;
  }
  try {
    const resp = await fetch('/api/config');
    if (!resp.ok) return null;
    const cfg = await resp.json();
    if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) return null;
    return cfg;
  } catch(e) {
    return null;
  }
}

function entriesAsRows() {
  const rows = [];
  Object.keys(allDays).forEach(dateKey => {
    (allDays[dateKey] || []).forEach(entry => {
      if (!entry || !entry.id || deletedEntryIds.includes(entry.id)) return;
      rows.push({
        id: entry.id,
        user_id: currentUser.id,
        date_key: dateKey,
        type: entry.type,
        entry_time: entry.time,
        data: entry.data || {},
        updated_at: new Date().toISOString()
      });
    });
  });
  return rows;
}

function rowToEntry(row) {
  return {
    id: row.id,
    type: row.type,
    time: row.entry_time,
    data: row.data || {}
  };
}

function mergeRows(rows) {
  rows.forEach(row => {
    if (!row || deletedEntryIds.includes(row.id)) return;
    if (!allDays[row.date_key]) allDays[row.date_key] = [];
    const entries = allDays[row.date_key];
    const idx = entries.findIndex(entry => entry.id === row.id);
    const incoming = rowToEntry(row);
    if (idx >= 0) entries[idx] = incoming;
    else entries.push(incoming);
  });
  saveLocal();
  renderAll();
}

async function loadCloudEntries() {
  if (!supabaseClient || !currentUser) return;
  const result = await supabaseClient
    .from('recovery_entries')
    .select('id,date_key,type,entry_time,data,updated_at')
    .eq('user_id', currentUser.id)
    .order('date_key', { ascending: true })
    .order('entry_time', { ascending: true });
  if (result.error) throw result.error;
  mergeRows(result.data || []);
}

async function uploadLocalEntries() {
  if (!supabaseClient || !currentUser) return;
  const rows = entriesAsRows();
  for (let i = 0; i < rows.length; i += 100) {
    const chunk = rows.slice(i, i + 100);
    if (!chunk.length) continue;
    const result = await supabaseClient.from('recovery_entries').upsert(chunk, { onConflict: 'user_id,id' });
    if (result.error) throw result.error;
  }
}

async function pushEntryToCloud(dateKey, entry) {
  if (!supabaseClient || !currentUser || applyingCloud) return;
  const row = {
    id: entry.id,
    user_id: currentUser.id,
    date_key: dateKey,
    type: entry.type,
    entry_time: entry.time,
    data: entry.data || {},
    updated_at: new Date().toISOString()
  };
  setSyncStatus('syncwait');
  const result = await supabaseClient.from('recovery_entries').upsert(row, { onConflict: 'user_id,id' });
  setSyncStatus(result.error ? 'error' : 'synced');
  if (result.error) setAuthStatus(`Sync error: ${result.error.message}`);
}

async function deleteEntryFromCloud(id) {
  if (!supabaseClient || !currentUser) return;
  setSyncStatus('syncwait');
  const result = await supabaseClient
    .from('recovery_entries')
    .delete()
    .eq('user_id', currentUser.id)
    .eq('id', id);
  setSyncStatus(result.error ? 'error' : 'synced');
  if (result.error) setAuthStatus(`Delete sync error: ${result.error.message}`);
}

async function initSupabaseSync() {
  const cfg = await loadSyncConfig();
  if (cfg && !window.supabase) {
    for (let i = 0; i < 20 && !window.supabase; i += 1) {
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }
  if (!cfg || !window.supabase) {
    setSyncStatus('local');
    setAuthStatus('Cloud sync is not configured yet. Add Supabase env vars when deploying.');
    updateAuthUI();
    return;
  }
  supabaseClient = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  const sessionResult = await supabaseClient.auth.getSession();
  await applySupabaseUser(sessionResult.data?.session?.user || null);
  supabaseClient.auth.onAuthStateChange((_event, session) => {
    applySupabaseUser(session?.user || null);
  });
}

async function applySupabaseUser(user) {
  currentUser = user || null;
  updateAuthUI();
  if (!currentUser) {
    setAuthStatus('Not signed in');
    setSyncStatus('local');
    return;
  }
  setAuthStatus('Syncing local entries to Supabase...');
  setSyncStatus('syncwait');
  try {
    applyingCloud = true;
    await uploadLocalEntries();
    await loadCloudEntries();
    try {
      await loadFoodLibraryFromCloud();
    } catch(foodError) {
      setAuthStatus(`Entries synced. Food Library is local until v21 SQL is installed: ${foodError.message}`);
    }
    applyingCloud = false;
    if (document.getElementById('authStatus')?.textContent.startsWith('Entries synced.')) {
      // Keep the Food Library SQL hint visible.
    } else {
      setAuthStatus('Synced. New entries will update across devices.');
    }
    setSyncStatus('synced');
    renderFoodLibrary();
  } catch(e) {
    applyingCloud = false;
    setAuthStatus(`Sync error: ${e.message}`);
    setSyncStatus('error');
  }
}

async function sendSignInCode() {
  if (!supabaseClient) {
    setAuthStatus('Supabase is not configured yet.');
    return;
  }
  const email = document.getElementById('authEmail').value.trim();
  if (!email) {
    setAuthStatus('Enter an email first.');
    return;
  }
  const result = await supabaseClient.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: appRedirectUrl() }
  });
  toggleSyncPanel(true);
  setAuthStatus(result.error ? `Sign-in error: ${result.error.message}` : 'Code sent. Open the email and paste the 6-digit code here.');
}

async function verifyCode() {
  if (!supabaseClient) {
    setAuthStatus('Supabase is not configured yet.');
    return;
  }
  const email = document.getElementById('authEmail').value.trim();
  const token = document.getElementById('authCode').value.trim();
  if (!email || token.length < 6) {
    setAuthStatus('Enter email and the 6-digit code.');
    return;
  }
  const result = await supabaseClient.auth.verifyOtp({ email, token, type: 'email' });
  if (result.error) setAuthStatus(`Code error: ${result.error.message}`);
  else {
    document.getElementById('authCode').value = '';
    toggleSyncPanel(false);
  }
}

async function signOut() {
  if (supabaseClient) await supabaseClient.auth.signOut();
  currentUser = null;
  updateAuthUI();
  setAuthStatus('Signed out. Local data remains on this device.');
  setSyncStatus('local');
  toggleSyncPanel(false);
}

// ─── Render ───────────────────────────────────────────────────────────────────
function renderAll() {
  renderDayNav();
  renderTimeline();
  renderStats();
  renderStoolChart();
  renderFoodMap();
  renderFoodLibrary();
  document.getElementById('headerDate').textContent = formatFullDate(currentDay);
  document.getElementById('dayBadge').textContent = 'Day ' + dayNumber(currentDay);
}

function getDayKeys() {
  const keys = new Set(Object.keys(allDays));
  keys.add(currentDay);
  keys.add(todayKey());
  return Array.from(keys).sort();
}

function daySignalClasses(dateKey) {
  const entries = allDays[dateKey] || [];
  if (!entries.length) return [];
  let watch = false;
  let alert = false;
  entries.forEach(entry => {
    const d = entry.data || {};
    if (entry.type === 'poop') {
      const urgency = parseNumber(d.urgency);
      const bristol = parseNumber(d.bristol);
      if (/loose|watery/i.test(d.consistency || '') || urgency >= 4 || (d.bristol && (bristol <= 2 || bristol >= 5))) watch = true;
      if ((d.blood && d.blood !== 'No') || urgency >= 5 || (d.bristol && bristol >= 6)) alert = true;
    }
    if (entry.type === 'symptom') {
      const severity = parseNumber(d.severity);
      if (severity >= 3) watch = true;
      if (severity >= 4) alert = true;
    }
  });
  const signals = ['teal'];
  if (watch) signals.push('amber');
  if (alert) signals.push('rose');
  return signals;
}

function buildDayTileHTML(dateKey) {
  const active = dateKey === currentDay;
  const dow = formatBahrainDate(dateKey, { weekday: 'short' }).slice(0, 3).toUpperCase();
  const dom = formatBahrainDate(dateKey, { day: 'numeric' });
  const signals = daySignalClasses(dateKey)
    .map(cls => `<span class="day-signal ${escapeHTML(cls)}"></span>`)
    .join('');
  return `
    <button class="day-tile ${active ? 'active' : ''}" onclick="switchDay('${escapeHTML(dateKey)}')" title="${escapeHTML(formatFullDate(dateKey))}">
      <span class="day-tile-dow">${escapeHTML(dow)}</span>
      <span class="day-tile-num">${escapeHTML(dom)}</span>
      <span class="day-signals">${signals}</span>
    </button>
  `;
}

function renderDayNav() {
  const row = document.getElementById('weekRow');
  if (!row) return;
  const currentUTC = utcDayFromKey(currentDay);
  const jsDay = new Date(currentUTC).getUTCDay();
  const mondayOffset = jsDay === 0 ? -6 : 1 - jsDay;
  const weekKeys = Array.from({ length: 7 }, (_, i) => addDaysToKey(currentDay, mondayOffset + i));
  row.innerHTML = `
    <button class="day-arrow" onclick="goDay(-1)" aria-label="Previous day">←</button>
    ${weekKeys.map(buildDayTileHTML).join('')}
    <button class="day-arrow" onclick="goDay(1)" aria-label="Next day">→</button>
  `;
}

function goDay(dir) {
  switchDay(addDaysToKey(currentDay, dir));
}

function renderTimeline() {
  const tl = document.getElementById('timeline');
  const entries = (allDays[currentDay] || []).slice().sort((a,b) => a.time.localeCompare(b.time));
  
  if (entries.length === 0) {
    tl.innerHTML = `<div class="empty-state" id="emptyState"><div class="empty-icon">📋</div><p>No entries yet.<br>Tap + to log your first event.</p></div>`;
    return;
  }

  tl.innerHTML = entries.map((e,i) => buildEntryHTML(e, i)).join('');
}

function buildEntryHTML(e, i) {
  const iconClass = `icon-${e.type}`;
  const icons = { poop:'🚽', food:'🍽️', med:'💊', symptom:'😣', note:'📝', sleep:'🌙' };
  
  let title = '';
  let tags = [];

  if (e.type === 'poop') {
    title = e.data.consistency || 'Bowel movement';
    if (e.data.bristol) {
      const bristol = bristolType(e.data.bristol);
      tags.push({ cls: bristol?.tone === 'ideal' ? 'tag-food' : bristol?.tone === 'watery' ? 'tag-symptom' : 'tag-poop', txt: `Bristol ${e.data.bristol}${bristol ? ` · ${bristol.short}` : ''}` });
    }
    if (e.data.urgency) tags.push({ cls: 'tag-poop', txt: `Urgency ${e.data.urgency}/5` });
    if (e.data.gas) tags.push({ cls: 'tag-poop', txt: `Gas: ${e.data.gas}` });
    const linkedFoodCount = Array.isArray(e.data.linked_food_entry_ids)
      ? e.data.linked_food_entry_ids.length
      : Array.isArray(e.data.recent_food_ids)
        ? e.data.recent_food_ids.length
        : 0;
    if (linkedFoodCount) tags.push({ cls: 'tag-food', txt: `${linkedFoodCount} linked food${linkedFoodCount === 1 ? '' : 's'}` });
    if (e.data.notes) tags.push({ cls: 'tag-note', txt: e.data.notes });
  } else if (e.type === 'food') {
    title = e.data.food_variation_name || e.data.food_family_name || e.data.canonical_food || e.data.item || 'Food / drink';
    if (e.data.food_family_name && e.data.food_variation_name) tags.push({ cls: 'tag-food', txt: `Family: ${e.data.food_family_name}` });
    if (e.data.food_alias) tags.push({ cls: 'tag-note', txt: `Entered: ${e.data.food_alias}` });
    if (e.data.portion_count) tags.push({ cls: 'tag-food', txt: `${e.data.portion_count} portion${String(e.data.portion_count) === '1' ? '' : 's'}` });
    if (e.data.portion_label || e.data.amount) tags.push({ cls: 'tag-food', txt: e.data.portion_label || e.data.amount });
    if (e.data.food_type) tags.push({ cls: 'tag-food', txt: e.data.food_type });
    if (e.data.fluid_ml) tags.push({ cls: 'tag-food', txt: `${e.data.fluid_ml} ml` });
    if (e.data.trial_status) tags.push({ cls: e.data.trial_status === 'Testing new' ? 'tag-symptom' : 'tag-food', txt: e.data.trial_status });
    if (e.data.ingredients) tags.push({ cls: 'tag-note', txt: e.data.ingredients });
    if (e.data.tolerated) tags.push({ cls: e.data.tolerated === 'Yes' ? 'tag-food' : 'tag-symptom', txt: e.data.tolerated === 'Yes' ? '✓ Tolerated' : '✗ Not tolerated' });
    if (e.data.notes) tags.push({ cls: 'tag-note', txt: e.data.notes });
  } else if (e.type === 'med') {
    title = e.data.name || 'Medication';
    if (e.data.dose) tags.push({ cls: 'tag-med', txt: e.data.dose });
    if (e.data.notes) tags.push({ cls: 'tag-note', txt: e.data.notes });
  } else if (e.type === 'symptom') {
    title = e.data.symptom || 'Symptom';
    if (e.data.severity) tags.push({ cls: 'tag-symptom', txt: `Severity ${e.data.severity}/5` });
    if (Array.isArray(e.data.recent_food_ids) && e.data.recent_food_ids.length) tags.push({ cls: 'tag-food', txt: `${e.data.recent_food_ids.length} food link(s)` });
    if (e.data.notes) tags.push({ cls: 'tag-note', txt: e.data.notes });
  } else if (e.type === 'sleep') {
    title = `Slept ${e.data.bedtime || '?'} → ${e.data.wakeup || '?'}`;
    if (e.data.total) tags.push({ cls: 'tag-sleep', txt: e.data.total });
    if (e.data.interruptions) tags.push({ cls: 'tag-sleep', txt: `${e.data.interruptions} interruption(s)` });
    if (e.data.whoop_recovery) tags.push({ cls: 'tag-sleep', txt: `Recovery ${e.data.whoop_recovery}%` });
    if (e.data.whoop_hrv) tags.push({ cls: 'tag-sleep', txt: `HRV ${e.data.whoop_hrv}ms` });
    if (e.data.notes) tags.push({ cls: 'tag-note', txt: e.data.notes });
  } else if (e.type === 'note') {
    title = e.data.text || 'Note';
  }

  const tagsHTML = tags.map(t => `<span class="tag ${escapeHTML(t.cls)}">${escapeHTML(t.txt)}</span>`).join('');

  return `
    <div class="timeline-entry">
      <div class="entry-icon-wrap ${escapeHTML(iconClass)}">${escapeHTML(icons[e.type] || '•')}</div>
      <div class="entry-body">
        <div class="entry-actions">
          <button class="entry-action" data-entry-id="${escapeHTML(e.id)}" onclick="editEntryFromButton(this)">Edit</button>
          <button class="entry-action delete" data-entry-id="${escapeHTML(e.id)}" onclick="deleteEntryFromButton(this)">✕</button>
        </div>
        <div class="entry-time">${escapeHTML(e.time)}</div>
        <div class="entry-title">${escapeHTML(title)}</div>
        ${tagsHTML ? `<div class="entry-tags">${tagsHTML}</div>` : ''}
        <button class="entry-ai-btn" data-entry-id="${escapeHTML(e.id)}" onclick="generateEntryInsight(this)">AI insight</button>
        <div class="entry-ai-result" id="aiEntryResult-${escapeHTML(e.id)}"></div>
      </div>
    </div>
  `;
}

function renderStats() {
  const entries = allDays[currentDay] || [];
  const bm = entries.filter(e => e.type === 'poop').length;
  const food = entries.filter(e => e.type === 'food' && e.data.ftype !== 'Fluid').length;
  let fluids = 0;
  entries.filter(e => e.type === 'food').forEach(e => {
    if (e.data.fluid_ml) fluids += Number(e.data.fluid_ml) || 0;
  });
  const meds = entries.filter(e => e.type === 'med').length;
  document.getElementById('statBM').textContent = bm;
  document.getElementById('statFood').textContent = food;
  document.getElementById('statFluids').textContent = fluids || '—';
  document.getElementById('statMeds').textContent = meds;
}

function bristolType(value) {
  return BRISTOL_TYPES.find(type => type.value === String(value || ''));
}

function bristolTone(value) {
  return bristolType(value)?.tone || 'unknown';
}

function bristolVisual(value) {
  const type = String(value || '');
  if (type === '1') return `
    <svg class="bristol-visual" viewBox="0 0 120 78" aria-hidden="true">
      <ellipse class="bristol-shape" cx="27" cy="43" rx="12" ry="10" transform="rotate(-14 27 43)"></ellipse>
      <ellipse class="bristol-shape" cx="49" cy="30" rx="10" ry="9" transform="rotate(13 49 30)"></ellipse>
      <ellipse class="bristol-shape" cx="70" cy="47" rx="13" ry="11" transform="rotate(-10 70 47)"></ellipse>
      <ellipse class="bristol-shape" cx="93" cy="31" rx="10" ry="8" transform="rotate(11 93 31)"></ellipse>
      <ellipse class="bristol-shape" cx="44" cy="57" rx="9" ry="7" transform="rotate(-18 44 57)"></ellipse>
      <ellipse class="bristol-highlight" cx="25" cy="39" rx="4" ry="2"></ellipse>
      <ellipse class="bristol-highlight" cx="68" cy="43" rx="4" ry="2"></ellipse>
    </svg>`;
  if (type === '2') return `
    <svg class="bristol-visual" viewBox="0 0 120 78" aria-hidden="true">
      <path class="bristol-shape" d="M20 44c4-17 18-24 33-19 8-8 22-7 30 2 13-1 22 7 22 18 0 12-10 20-25 19-17 4-33 3-48-2-9-3-14-10-12-18Z"></path>
      <circle class="bristol-highlight" cx="40" cy="38" r="7"></circle>
      <circle class="bristol-highlight" cx="61" cy="34" r="6"></circle>
      <circle class="bristol-highlight" cx="80" cy="42" r="7"></circle>
      <path class="bristol-mark" d="M34 53c12 4 24 3 35-2M51 29c4 6 4 13-1 20M75 30c6 6 7 15 2 23"></path>
    </svg>`;
  if (type === '3') return `
    <svg class="bristol-visual" viewBox="0 0 120 78" aria-hidden="true">
      <path class="bristol-shape" d="M18 41c4-16 22-21 46-18 26 3 41 10 40 23-2 14-20 18-46 15-27-3-43-8-40-20Z"></path>
      <path class="bristol-highlight" d="M36 36c15-5 35-5 52 1" opacity="0.55"></path>
      <path class="bristol-mark" d="M34 34l-4 8 7 6M53 29l-5 10 8 8M72 33l-4 8 7 8M90 37l-5 6 4 6"></path>
    </svg>`;
  if (type === '4') return `
    <svg class="bristol-visual" viewBox="0 0 120 78" aria-hidden="true">
      <path class="bristol-shape" d="M15 50c12-18 36-30 65-27 17 2 28 9 27 17-2 10-19 13-42 12-24-1-38 5-50-2Z"></path>
      <path class="bristol-highlight" d="M32 44c16-12 40-15 61-7" opacity="0.55"></path>
    </svg>`;
  if (type === '5') return `
    <svg class="bristol-visual" viewBox="0 0 120 78" aria-hidden="true">
      <ellipse class="bristol-shape" cx="31" cy="47" rx="15" ry="10" transform="rotate(-19 31 47)"></ellipse>
      <ellipse class="bristol-shape" cx="58" cy="39" rx="16" ry="10" transform="rotate(7 58 39)"></ellipse>
      <ellipse class="bristol-shape" cx="86" cy="51" rx="17" ry="11" transform="rotate(-8 86 51)"></ellipse>
      <ellipse class="bristol-highlight" cx="56" cy="36" rx="6" ry="2"></ellipse>
    </svg>`;
  if (type === '6') return `
    <svg class="bristol-visual" viewBox="0 0 120 78" aria-hidden="true">
      <path class="bristol-shape" d="M18 49c-4-14 11-25 24-17 6-9 21-8 27 1 13-6 29 5 27 19-2 16-23 22-36 11-14 9-36 3-42-14Z"></path>
      <path class="bristol-shape" d="M80 27c4-10 20-9 23 2 3 10-8 18-17 12-5-3-8-8-6-14Z"></path>
      <path class="bristol-mark" d="M35 45c9 5 20 5 30 0M52 58c10 3 21 1 30-6"></path>
    </svg>`;
  return `
    <svg class="bristol-visual" viewBox="0 0 120 78" aria-hidden="true">
      <path class="bristol-shape" d="M20 51c9-16 61-18 78-3 10 8-5 21-34 21-31 0-53-8-44-18Z" opacity="0.58"></path>
      <path class="bristol-highlight" d="M35 51c18-6 39-6 58 0" opacity="0.45"></path>
      <path class="bristol-water" d="M20 31c12-9 25-9 37 0M63 31c12-9 25-9 37 0M35 46c17-8 36-8 53 0"></path>
    </svg>`;
}

function renderStoolChart() {
  const chart = document.getElementById('stoolChart');
  if (!chart) return;
  const keys = Array.from({ length: 7 }, (_, idx) => addDaysToKey(currentDay, idx - 6));
  const hasAny = keys.some(key => (allDays[key] || []).some(entry => entry.type === 'poop'));
  if (!hasAny) {
    chart.innerHTML = `<div class="stool-empty" style="grid-column:1/-1">Add bowel movements with a Bristol type to see the 7-day stool trend.</div>`;
    return;
  }
  chart.innerHTML = keys.map(key => {
    const bms = (allDays[key] || [])
      .filter(entry => entry.type === 'poop')
      .slice()
      .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    const bars = bms.length ? bms.map(entry => {
      const value = Number(entry.data?.bristol || 0);
      const height = value ? Math.max(12, Math.round((value / 7) * 66)) : 10;
      const title = bristolType(value)?.label || entry.data?.consistency || 'Bowel movement';
      return `<span class="stool-bar ${escapeHTML(bristolTone(value))}" style="height:${height}px" title="${escapeHTML(title)}"></span>`;
    }).join('') : '';
    return `
      <div class="stool-day">
        <div class="stool-bars">${bars || '<span class="stool-empty">—</span>'}</div>
        <div class="stool-day-label">${escapeHTML(formatBahrainDate(key, { weekday: 'short' }).slice(0, 3))}</div>
      </div>
    `;
  }).join('');
}

function normalizeFoodName(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(the|with|and|small|large|cup|bowl|plate|glass)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function displayFoodName(value) {
  const text = String(value || '').trim();
  return text ? text.replace(/\s+/g, ' ') : 'Unnamed food';
}

function foodSlug(value) {
  return normalizeFoodName(value).replace(/\s+/g, '-') || `food-${Date.now()}`;
}

function titleCaseFood(value) {
  return normalizeFoodName(value)
    .split(' ')
    .filter(Boolean)
    .map(word => word.length <= 2 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || displayFoodName(value);
}

function foodPresetByName(name) {
  return foodPresetCatalog().find(preset => preset.name === name || preset.key === name);
}

function learnedFoodPresets() {
  const presets = new Map();
  allEntriesWithDates().filter(entry => entry.type === 'food').forEach(entry => {
    const d = entry.data || {};
    if (d.food_preset_mode === 'separate') return;
    const name = displayFoodName(d.canonical_food || d.item);
    if (!normalizeFoodName(name)) return;
    const key = d.food_preset_key || foodSlug(name);
    if (!presets.has(key)) {
      presets.set(key, {
        key,
        name,
        icon: '🍽️',
        aliases: [name],
        required: compactFoodWords(name),
        learned: true
      });
    }
    const preset = presets.get(key);
    [d.item, d.item_raw, d.food_alias, d.ingredients].filter(Boolean).forEach(value => {
      const alias = displayFoodName(value);
      if (normalizeFoodName(alias) && !preset.aliases.some(existing => normalizeFoodName(existing) === normalizeFoodName(alias))) {
        preset.aliases.push(alias);
      }
    });
  });
  return Array.from(presets.values());
}

function foodPresetCatalog() {
  const merged = new Map();
  FOOD_PRESETS.forEach(preset => merged.set(preset.key, { ...preset, aliases: [...preset.aliases], required: [...(preset.required || [])] }));
  foodPresets.filter(food => !food.archived).forEach(food => {
    const variations = foodVariationsForPreset(food.id);
    merged.set(food.id, {
      key: food.id,
      name: food.name,
      icon: '🍽️',
      aliases: [food.name, food.ingredients || '', ...variations.map(v => v.name)].filter(Boolean),
      required: compactFoodWords(food.name),
      library: true,
      preset_id: food.id
    });
  });
  learnedFoodPresets().forEach(preset => {
    if (!merged.has(preset.key)) {
      merged.set(preset.key, preset);
      return;
    }
    const existing = merged.get(preset.key);
    preset.aliases.forEach(alias => {
      if (!existing.aliases.some(value => normalizeFoodName(value) === normalizeFoodName(alias))) existing.aliases.push(alias);
    });
  });
  return Array.from(merged.values());
}

function compactFoodWords(value) {
  return normalizeFoodName(value)
    .split(' ')
    .filter(word => word && !['the','with','and','small','large','cup','bowl','plate','glass','soup','cream','plain','clear','soft','fresh','boiled','cooked','grilled','baked','hot','cold'].includes(word));
}

function editDistance(a, b) {
  const left = String(a || '');
  const right = String(b || '');
  if (!left) return right.length;
  if (!right) return left.length;
  const prev = Array.from({ length: right.length + 1 }, (_, i) => i);
  const curr = Array(right.length + 1).fill(0);
  for (let i = 1; i <= left.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= right.length; j++) {
      curr[j] = left[i - 1] === right[j - 1]
        ? prev[j - 1]
        : Math.min(prev[j - 1], prev[j], curr[j - 1]) + 1;
    }
    for (let j = 0; j <= right.length; j++) prev[j] = curr[j];
  }
  return prev[right.length];
}

function wordSimilarity(a, b) {
  const left = String(a || '');
  const right = String(b || '');
  if (!left || !right) return 0;
  if (left === right) return 1;
  const distance = editDistance(left, right);
  return Math.max(0, 1 - distance / Math.max(left.length, right.length));
}

function bestWordSimilarity(word, options) {
  return Math.max(0, ...options.map(option => wordSimilarity(word, option)));
}

function matchFoodPresets(value, limit = 4) {
  const normalized = normalizeFoodName(value);
  if (!normalized) return [];
  const words = normalized.split(' ').filter(Boolean);
  const candidates = foodPresetCatalog().map(preset => {
    let score = 0;
    const aliasWords = new Set();
    const searchableAliases = [preset.name, ...(preset.aliases || [])];
    searchableAliases.forEach(alias => {
      const normalizedAlias = normalizeFoodName(alias);
      normalizedAlias.split(' ').filter(Boolean).forEach(word => aliasWords.add(word));
      if (normalized === normalizedAlias) score += 100;
      else if (normalized.includes(normalizedAlias) || normalizedAlias.includes(normalized)) score += 62 + Math.min(18, normalizedAlias.length);
    });
    const required = preset.required || [];
    const matchedRequired = required.filter(word => words.includes(word) || bestWordSimilarity(word, words) >= 0.78).length;
    if (required.length && matchedRequired === required.length) score += 42 + matchedRequired * 8;
    else score += matchedRequired * 8;
    const presetWords = compactFoodWords(preset.name);
    const matchedPresetWords = presetWords.filter(word => words.includes(word) || bestWordSimilarity(word, words) >= 0.78).length;
    score += matchedPresetWords * 14;
    words.forEach(word => {
      const best = bestWordSimilarity(word, Array.from(aliasWords));
      if (best >= 0.9) score += 14;
      else if (best >= 0.78) score += 9;
      else if (best >= 0.68 && word.length >= 5) score += 4;
    });
    const hasBrothLikeWord = words.some(word => wordSimilarity(word, 'broth') >= 0.76);
    if (preset.key === 'chicken-soup' && hasBrothLikeWord) score -= 58;
    if (preset.key === 'chicken-broth' && hasBrothLikeWord) score += 18;
    if (preset.key === 'low-fat-milk' && (words.includes('cream') || words.includes('yogurt'))) score -= 35;
    return { preset, score };
  })
    .filter(candidate => candidate.score >= 34)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return candidates.map(candidate => ({
    ...candidate.preset,
    confidence: Math.max(55, Math.min(96, Math.round(candidate.score)))
  }));
}

function matchFoodPreset(value) {
  return matchFoodPresets(value, 1)[0] || null;
}

function foodCanonicalName(entryOrData) {
  const d = entryOrData?.data || entryOrData || {};
  if (d.food_family_name) return d.food_family_name;
  if (d.food_preset_id && foodPresetById(d.food_preset_id)) return foodPresetById(d.food_preset_id).name;
  const explicit = displayFoodName(d.canonical_food || d.item);
  if (d.food_preset_mode === 'separate') return explicit;
  if (d.canonical_food) return d.canonical_food;
  const match = matchFoodPreset(explicit);
  return match?.name || explicit;
}

function foodCanonicalKey(entryOrData) {
  const d = entryOrData?.data || entryOrData || {};
  if (d.food_preset_id) return d.food_preset_id;
  if (d.food_family_name) return normalizeFoodName(d.food_family_name);
  if (d.food_preset_mode === 'separate') return normalizeFoodName(d.item || d.item_raw);
  if (d.food_preset_key) return d.food_preset_key;
  const name = foodCanonicalName(entryOrData);
  const preset = foodPresetByName(name) || matchFoodPreset(name);
  return preset?.key || normalizeFoodName(name);
}

function foodRawName(entryOrData) {
  const d = entryOrData?.data || entryOrData || {};
  return displayFoodName(d.item_raw || d.food_alias || d.item || d.ingredients || 'Food');
}

function foodAlias(entryOrData) {
  const raw = foodRawName(entryOrData);
  const canonical = foodCanonicalName(entryOrData);
  const d = entryOrData?.data || entryOrData || {};
  const variation = d.food_variation_name || '';
  if (variation && normalizeFoodName(variation) !== normalizeFoodName(canonical)) return variation;
  return normalizeFoodName(raw) && normalizeFoodName(raw) !== normalizeFoodName(canonical) ? raw : '';
}

function foodRelationWindowHours(entryType) {
  return entryType === 'poop' ? 12 : 8;
}

function isLooseBM(entry) {
  return /watery|very loose|loose/i.test(entry.data?.consistency || '');
}

function severityNumber(entry) {
  return parseNumber(entry.data?.severity || entry.data?.urgency);
}

function foodMapEntries(daysBack = 14) {
  const current = entryDateTime(currentDay, '23:59');
  const earliest = current - (daysBack - 1) * 24 * 60 * 60 * 1000;
  return allEntriesWithDates().filter(entry => {
    const ts = entryDateTime(entry.dateKey, entry.time);
    return ts >= earliest && ts <= current;
  });
}

function linkedFoodsForOutcome(outcome, foodsById, allFoods) {
  const snapshotFoods = Array.isArray(outcome.data?.linked_foods)
    ? outcome.data.linked_foods.filter(food => food && (food.entry_id || food.item_raw || food.food_family_name))
    : [];
  const explicitIds = Array.isArray(outcome.data?.linked_food_entry_ids)
    ? outcome.data.linked_food_entry_ids.filter(Boolean)
    : Array.isArray(outcome.data?.recent_food_ids)
      ? outcome.data.recent_food_ids.filter(Boolean)
      : [];
  const explicit = explicitIds.map(id => foodsById.get(id)).filter(Boolean);
  if (snapshotFoods.length || explicit.length) {
    const explicitById = new Map(explicit.map(food => [food.id, food]));
    const confirmed = snapshotFoods.map(snapshot => {
      const existing = explicitById.get(snapshot.entry_id);
      if (existing) return existing;
      return {
        id: snapshot.entry_id || `snapshot-${normalizeFoodName(snapshot.food_family_name || snapshot.item_raw || 'food')}`,
        type: 'food',
        time: snapshot.time || outcome.time,
        dateKey: outcome.dateKey,
        data: {
          item: snapshot.item_raw || snapshot.canonical_food || snapshot.food_family_name || 'Food / drink',
          item_raw: snapshot.item_raw || '',
          canonical_food: snapshot.canonical_food || snapshot.food_family_name || '',
          food_family_name: snapshot.food_family_name || snapshot.canonical_food || snapshot.item_raw || 'Food / drink',
          food_variation_name: snapshot.food_variation_name || '',
          food_preset_id: snapshot.food_preset_id || '',
          food_variation_id: snapshot.food_variation_id || '',
          portion_count: snapshot.portion_count || '',
          food_type: snapshot.food_type || '',
          ftype: foodTypeToLegacyFtype(snapshot.food_type || 'Unknown')
        }
      };
    });
    explicit.forEach(food => {
      if (!confirmed.some(item => item.id === food.id)) confirmed.push(food);
    });
    return confirmed.map(food => ({ food, confidence: 'confirmed' }));
  }

  const outcomeTs = entryDateTime(outcome.dateKey, outcome.time);
  const windowMs = foodRelationWindowHours(outcome.type) * 60 * 60 * 1000;
  return allFoods
    .filter(food => {
      const foodTs = entryDateTime(food.dateKey, food.time);
      return foodTs <= outcomeTs && outcomeTs - foodTs <= windowMs;
    })
    .slice(-3)
    .map(food => ({ food, confidence: 'timing' }));
}

function buildFoodMapModel() {
  const entries = foodMapEntries(14);
  const foods = entries.filter(entry => entry.type === 'food' && (entry.data?.item || entry.data?.ingredients || entry.data?.ftype !== 'Fluid'));
  const outcomes = entries.filter(entry => entry.type === 'poop' || entry.type === 'symptom');
  const foodsById = new Map(foods.map(entry => [entry.id, entry]));
  const groups = new Map();

  function ensureFoodGroup(entry) {
    const rawName = foodRawName(entry);
    const canonicalName = foodCanonicalName(entry);
    const key = foodCanonicalKey(entry) || entry.id;
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        name: canonicalName,
        foodType: entry.data?.food_type || foodPresetById(entry.data?.food_preset_id)?.food_type || '',
        archived: !!foodPresetById(entry.data?.food_preset_id)?.archived,
        firstTs: entryDateTime(entry.dateKey, entry.time),
        lastTs: entryDateTime(entry.dateKey, entry.time),
        meals: 0,
        trialMeals: 0,
        fluids: 0,
        ingredients: new Set(),
        bmLinks: 0,
        markedLinks: 0,
        timingLinks: 0,
        looseBms: 0,
        urgentBms: 0,
        maxUrgency: 0,
        symptomLinks: 0,
        strongSymptoms: 0,
        maxSymptom: 0,
        notes: [],
        aliases: new Set(),
        logs: 0
      });
    }
    const group = groups.get(key);
    return { group, canonicalName };
  }

  foods.forEach(entry => {
    const { group, canonicalName } = ensureFoodGroup(entry);
    group.name = canonicalName;
    group.foodType = group.foodType || entry.data?.food_type || foodPresetById(entry.data?.food_preset_id)?.food_type || '';
    group.archived = group.archived || !!foodPresetById(entry.data?.food_preset_id)?.archived;
    if (foodAlias(entry)) group.aliases.add(foodAlias(entry));
    if (entry.data?.food_variation_name) group.aliases.add(entry.data.food_variation_name);
    group.logs += 1;
    group.meals += entry.data?.ftype === 'Fluid' ? 0 : 1;
    group.fluids += parseNumber(entry.data?.fluid_ml);
    if (entry.data?.trial_status === 'Testing new') group.trialMeals += 1;
    if (entry.data?.ingredients) {
      String(entry.data.ingredients).split(',').map(item => item.trim()).filter(Boolean).forEach(item => group.ingredients.add(item));
    }
    if (entry.data?.notes) group.notes.push(entry.data.notes);
    group.firstTs = Math.min(group.firstTs, entryDateTime(entry.dateKey, entry.time));
    group.lastTs = Math.max(group.lastTs, entryDateTime(entry.dateKey, entry.time));
  });

  outcomes.forEach(outcome => {
    linkedFoodsForOutcome(outcome, foodsById, foods).forEach(({ food, confidence }) => {
      const key = foodCanonicalKey(food) || food.id;
      const existing = groups.get(key);
      const group = existing || ensureFoodGroup(food).group;
      if (confidence === 'confirmed') group.markedLinks += 1;
      else group.timingLinks += 1;
      if (outcome.type === 'poop') {
        group.bmLinks += 1;
        if (isLooseBM(outcome)) group.looseBms += 1;
        const urgency = severityNumber(outcome);
        if (urgency >= 4) group.urgentBms += 1;
        group.maxUrgency = Math.max(group.maxUrgency, urgency);
      } else if (outcome.type === 'symptom') {
        group.symptomLinks += 1;
        const severity = severityNumber(outcome);
        if (severity >= 4) group.strongSymptoms += 1;
        group.maxSymptom = Math.max(group.maxSymptom, severity);
      }
    });
  });

  const cards = Array.from(groups.values()).map(group => {
    const exposure = Math.max(1, group.logs || group.meals || 1);
    const outcomeCount = group.bmLinks + group.symptomLinks;
    const looseRate = group.bmLinks ? group.looseBms / group.bmLinks : 0;
    const symptomRate = group.symptomLinks ? group.strongSymptoms / group.symptomLinks : 0;
    const reactionScore = Math.min(100, Math.round(
      (group.looseBms * 22) +
      (group.urgentBms * 18) +
      (group.strongSymptoms * 20) +
      (group.maxUrgency * 4) +
      (group.maxSymptom * 5) +
      (group.markedLinks * 5)
    ));
    let status = 'unknown';
    let label = 'Need data';
    if (outcomeCount >= 2 && (reactionScore >= 48 || looseRate >= 0.55 || symptomRate >= 0.5)) {
      status = 'trigger';
      label = 'Possible trigger';
    } else if (outcomeCount >= 1 && (reactionScore >= 24 || group.maxUrgency >= 3 || group.maxSymptom >= 3)) {
      status = 'watch';
      label = 'Watch';
    } else if (group.meals >= 2 && reactionScore < 24) {
      status = 'ok';
      label = 'Seems OK';
    }
    return {
      ...group,
      ingredients: Array.from(group.ingredients).slice(0, 4),
      notes: group.notes.slice(-2),
      aliases: Array.from(group.aliases).slice(0, 5),
      outcomeCount,
      exposure,
      reactionScore,
      status,
      label,
      looseRate,
      symptomRate,
      lastLabel: new Date(group.lastTs).toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'short' })
    };
  });

  return {
    cards,
    totalFoods: cards.length,
    triggerCount: cards.filter(card => card.status === 'trigger').length,
    watchCount: cards.filter(card => card.status === 'watch').length,
    outcomeCount: outcomes.length
  };
}

function foodDots(value, tone) {
  const filled = Math.max(0, Math.min(5, Math.round(value)));
  const cls = tone === 'trigger' ? 'food-dot-on' : tone === 'watch' ? 'food-dot-mid' : tone === 'ok' ? 'food-dot-ok' : 'food-dot-off';
  return Array.from({ length: 5 }, (_, i) => `<span class="${i < filled ? cls : 'food-dot-off'}">●</span>`).join('');
}

function foodCardHTML(card) {
  const width = Math.max(8, Math.min(100, card.reactionScore || (card.status === 'unknown' ? 18 : 8)));
  const bmDots = card.bmLinks ? Math.min(5, card.looseBms + card.urgentBms + Math.ceil(card.maxUrgency / 2)) : 0;
  const symptomDots = card.symptomLinks ? Math.min(5, card.strongSymptoms + Math.ceil(card.maxSymptom / 2)) : 0;
  const confidenceDots = Math.min(5, card.markedLinks + Math.ceil(card.timingLinks / 2));
  const chips = [
    `${card.meals || 0} meal${card.meals === 1 ? '' : 's'}`,
    card.trialMeals ? `${card.trialMeals} new trial` : '',
    card.bmLinks ? `${card.bmLinks} BM after` : '',
    card.symptomLinks ? `${card.symptomLinks} symptom after` : '',
    card.markedLinks ? `${card.markedLinks} confirmed link${card.markedLinks === 1 ? '' : 's'}` : '',
    card.timingLinks ? `${card.timingLinks} timing match${card.timingLinks === 1 ? '' : 'es'}` : ''
  ].filter(Boolean);
  const note = card.status === 'trigger'
    ? `Logged pattern: ${card.looseBms} loose BM(s), ${card.urgentBms} urgent BM(s), and ${card.strongSymptoms} strong symptom(s) after this food.`
    : card.status === 'watch'
      ? `Some reaction signals appear after this food. Keep linking future BM/symptom logs to improve confidence.`
      : card.status === 'ok'
        ? `No strong reaction pattern is visible yet from the logged history.`
        : `Needs more linked bowel movement or symptom logs before drawing a pattern.`;
  return `
    <article class="food-card">
      <div class="food-card-head">
          <div>
            <div class="food-card-name">${escapeHTML(card.name)}</div>
          <div class="food-card-meta">${card.foodType ? `${escapeHTML(card.foodType)} · ` : ''}${escapeHTML(card.logs || card.meals || 0)} logs · Last logged ${escapeHTML(card.lastLabel)}${card.archived ? ' · Archived' : ''}</div>
          </div>
        <span class="food-status ${escapeHTML(card.status)}">${escapeHTML(card.label)}</span>
      </div>
      <div class="food-signal-row">
        <div class="food-signal-label">BM effect</div>
        <div class="food-dots">${foodDots(bmDots, card.status)}</div>
        <div class="food-score">${escapeHTML(card.bmLinks)}</div>
      </div>
      <div class="food-signal-row">
        <div class="food-signal-label">Symptoms</div>
        <div class="food-dots">${foodDots(symptomDots, card.status)}</div>
        <div class="food-score">${escapeHTML(card.symptomLinks)}</div>
      </div>
      <div class="food-signal-row">
        <div class="food-signal-label">Confirmed links</div>
        <div class="food-dots">${foodDots(confidenceDots, card.markedLinks ? 'ok' : 'unknown')}</div>
        <div class="food-score">${escapeHTML(card.markedLinks)}</div>
      </div>
      <div class="food-signal-row">
        <div class="food-signal-label">Timing matches</div>
        <div class="food-dots">${foodDots(Math.min(5, Math.ceil(card.timingLinks / 2)), 'unknown')}</div>
        <div class="food-score">${escapeHTML(card.timingLinks)}</div>
      </div>
      <div class="food-meter ${escapeHTML(card.status)}"><span style="width:${width}%"></span></div>
      <div class="food-meter-label"><span>Reaction signal</span><span>${escapeHTML(card.reactionScore)}/100</span></div>
      <div class="food-card-chips">
        ${chips.map(chip => `<span class="tag tag-food">${escapeHTML(chip)}</span>`).join('')}
        ${card.archived ? `<span class="tag tag-note">Archived</span>` : ''}
        ${card.ingredients.map(item => `<span class="tag tag-note">${escapeHTML(item)}</span>`).join('')}
      </div>
      ${card.aliases.length ? `
        <div class="food-aliases">
          <div class="food-aliases-label">Grouped variations</div>
          <div class="food-card-chips">${card.aliases.map(alias => `<span class="tag tag-note">${escapeHTML(alias)}</span>`).join('')}</div>
        </div>
      ` : ''}
      <p class="food-card-note">${escapeHTML(note)}</p>
    </article>
  `;
}

function setFoodMapFilter(nextFilter) {
  foodMapFilter = nextFilter;
  renderFoodMap();
}

function toggleFoodMapSort() {
  foodMapSort = foodMapSort === 'reaction' ? 'recent' : 'reaction';
  renderFoodMap();
}

function renderFoodMap() {
  const content = document.getElementById('foodMapContent');
  const statsEl = document.getElementById('foodMapStats');
  const filtersEl = document.getElementById('foodMapFilters');
  const sortBtn = document.getElementById('foodMapSortBtn');
  if (!content || !statsEl || !filtersEl) return;

  const model = buildFoodMapModel();
  const search = (document.getElementById('foodMapSearch')?.value || '').trim().toLowerCase();
  statsEl.innerHTML = `
    <div class="food-mini-stat"><strong>${escapeHTML(model.totalFoods)}</strong><span>foods tracked</span></div>
    <div class="food-mini-stat"><strong>${escapeHTML(model.triggerCount + model.watchCount)}</strong><span>need attention</span></div>
    <div class="food-mini-stat"><strong>${escapeHTML(model.outcomeCount)}</strong><span>BM/symptom logs</span></div>
  `;
  const filters = [
    ['important', 'Important'],
    ['trigger', 'Triggers'],
    ['watch', 'Watch'],
    ['ok', 'Seems OK'],
    ['unknown', 'Need data'],
    ['all', 'All']
  ];
  filtersEl.innerHTML = filters.map(([key, label]) =>
    `<button class="food-filter-chip ${foodMapFilter === key ? 'active' : ''}" onclick="setFoodMapFilter('${key}')">${escapeHTML(label)}</button>`
  ).join('');
  if (sortBtn) sortBtn.textContent = foodMapSort === 'reaction' ? 'Highest reaction' : 'Most recent';

  let cards = model.cards.filter(card => {
    if (search && !`${card.name} ${card.ingredients.join(' ')} ${card.aliases.join(' ')}`.toLowerCase().includes(search)) return false;
    if (foodMapFilter === 'all') return true;
    if (foodMapFilter === 'important') return card.status === 'trigger' || card.status === 'watch';
    return card.status === foodMapFilter;
  });
  cards = cards.sort((a, b) => foodMapSort === 'recent'
    ? b.lastTs - a.lastTs
    : (b.reactionScore - a.reactionScore) || (b.outcomeCount - a.outcomeCount) || (b.lastTs - a.lastTs)
  );

  if (!model.cards.length) {
    content.innerHTML = `<div class="empty-state"><div class="empty-icon">🍽️</div><p>Log foods, then link bowel movements or symptoms to build the Food Map.</p></div>`;
    return;
  }
  if (!cards.length) {
    content.innerHTML = `<div class="empty-state"><div class="empty-icon">🔎</div><p>No foods match this filter yet.</p></div>`;
    return;
  }

  const sections = [
    ['trigger', 'Possible triggers', '🚩', true],
    ['watch', 'Watch closely', '⚠️', true],
    ['ok', 'Seems OK', '✅', false],
    ['unknown', 'Need more logs', '🧩', false]
  ].map(([status, title, icon, open]) => {
    const items = cards.filter(card => card.status === status);
    if (!items.length) return '';
    return `
      <details class="food-group" ${open ? 'open' : ''}>
        <summary>
          <span class="food-group-label"><span>${icon}</span><strong>${escapeHTML(title)}</strong></span>
          <span class="food-group-count">${items.length}</span>
        </summary>
        <div class="food-group-body">${items.map(foodCardHTML).join('')}</div>
      </details>
    `;
  }).filter(Boolean).join('');

  content.innerHTML = sections;
}

function setFoodLibraryFilter(nextFilter) {
  foodLibraryFilter = nextFilter || 'all';
  renderFoodLibrary();
}

function selectFoodLibraryPreset(id, openDetail = false) {
  selectedFoodPresetId = id || selectedFoodPresetId;
  renderFoodLibrary();
  if (openDetail && window.innerWidth < 760) openFoodLibrarySheet('detail', selectedFoodPresetId);
}

function recentFoodChipHTML(food) {
  return `<button class="food-quick-chip" onclick="selectFoodLibraryPreset('${escapeHTML(food.id)}', true)">${escapeHTML(food.name)}</button>`;
}

function foodLibraryRowHTML(food) {
  const variations = foodVariationsForPreset(food.id);
  const nutrition = foodNutritionLine(food);
  const primaryAction = food.archived
    ? `<button class="food-row-action primary" onclick="unarchiveFoodPreset('${escapeHTML(food.id)}')">Unarchive</button>`
    : `<button class="food-row-action primary" onclick="openFoodLogForPreset('${escapeHTML(food.id)}')">Log</button>`;
  return `
    <div class="food-library-row ${food.id === selectedFoodPresetId ? 'selected' : ''}">
      <button class="food-row-main" onclick="selectFoodLibraryPreset('${escapeHTML(food.id)}', true)">
        <div class="food-row-title">${escapeHTML(food.name)}${food.archived ? ' · Archived' : ''}</div>
        <div class="food-row-meta">${escapeHTML(normalizeFoodType(food.food_type))}${food.default_portion_label ? ` · ${escapeHTML(food.default_portion_label)}` : ''}${variations.length ? ` · ${variations.length} variation${variations.length === 1 ? '' : 's'}` : ''}</div>
        ${nutrition ? `<div class="food-row-meta">${escapeHTML(nutrition)}</div>` : ''}
      </button>
      <div class="food-row-actions">
        ${primaryAction}
        <button class="food-row-action" onclick="openFoodLibrarySheet('detail', '${escapeHTML(food.id)}')">More</button>
      </div>
    </div>
  `;
}

function renderFoodLibraryDetail() {
  const detail = document.getElementById('foodLibraryDetail');
  if (!detail) return '';
  const available = foodLibraryRows(foodLibraryFilter === 'archived');
  const food = foodPresetById(selectedFoodPresetId) || available[0] || foodPresets[0];
  if (!food) {
    detail.innerHTML = `<div class="food-detail-title">No saved foods yet</div><p class="food-detail-meta">Add a food to make logging faster.</p>`;
    return '';
  }
  selectedFoodPresetId = food.id;
  const variations = foodVariationsForPreset(food.id);
  const recentLogs = allEntriesWithDates()
    .filter(entry => entry.type === 'food' && entry.data?.food_preset_id === food.id)
    .slice(-3)
    .reverse()
    .map(entry => `${formatBahrainDate(entry.dateKey, { day: 'numeric', month: 'short' })} ${entry.time}`)
    .join(' · ');
  const foodMap = buildFoodMapModel().cards.find(card => card.key === food.id || normalizeFoodName(card.name) === normalizeFoodName(food.name));
  const actionButtons = food.archived
    ? `
      <button class="tool-btn primary" onclick="unarchiveFoodPreset('${escapeHTML(food.id)}')">Unarchive</button>
      <button class="tool-btn" onclick="openFoodLibrarySheet('edit', '${escapeHTML(food.id)}')">Edit</button>
      <button class="tool-btn" onclick="openFoodLibrarySheet('variation', '${escapeHTML(food.id)}')">Add variation</button>
    `
    : `
      <button class="tool-btn primary" onclick="openFoodLogForPreset('${escapeHTML(food.id)}')">Log</button>
      <button class="tool-btn" onclick="openFoodLibrarySheet('edit', '${escapeHTML(food.id)}')">Edit</button>
      <button class="tool-btn" onclick="openFoodLibrarySheet('variation', '${escapeHTML(food.id)}')">Add variation</button>
      <button class="tool-btn" onclick="archiveFoodPreset('${escapeHTML(food.id)}')">Archive</button>
    `;
  const html = `
    <div class="food-detail-title">${escapeHTML(food.name)}</div>
    <p class="food-detail-meta">${escapeHTML(normalizeFoodType(food.food_type))}${food.default_portion_label ? ` · Default: ${escapeHTML(food.default_portion_label)}` : ''}</p>
    <div class="food-detail-grid">
      <div class="food-detail-stat"><strong>${escapeHTML(normalizeFoodType(food.food_type))}</strong><span>Food type</span></div>
      <div class="food-detail-stat"><strong>${escapeHTML(food.default_portion_label || 'Not set')}</strong><span>Default portion</span></div>
      <div class="food-detail-stat"><strong>${escapeHTML(food.calories || 'Not set')}</strong><span>Calories</span></div>
      <div class="food-detail-stat"><strong>${escapeHTML(food.protein_g ? `${food.protein_g}g` : 'Not set')}</strong><span>Protein</span></div>
    </div>
    <div class="food-detail-note"><strong>Ingredients</strong><br>${escapeHTML(food.ingredients || 'Not saved yet')}</div>
    <div class="food-detail-note"><strong>Variations</strong><br>${variations.length ? variations.map(v => escapeHTML(v.name)).join(' · ') : 'No variations yet'}</div>
    <div class="food-detail-note"><strong>Recent logs</strong><br>${escapeHTML(recentLogs || 'No recent logs yet')}</div>
    <div class="food-detail-note"><strong>Food Map signal</strong><br>${foodMap ? `${escapeHTML(foodMap.label)} · ${escapeHTML(foodMap.reactionScore)}/100` : 'Not enough history yet'}</div>
    <div class="food-detail-actions">
      ${actionButtons}
    </div>
  `;
  detail.innerHTML = html;
  return html;
}

function renderFoodLibrary() {
  const list = document.getElementById('foodLibraryList');
  if (!list) return;
  const query = normalizeFoodName(document.getElementById('foodLibrarySearch')?.value || '');
  const filters = document.getElementById('foodLibraryFilters');
  const filterDefs = [['all', 'All'], ['Liquid', 'Liquid'], ['Soft', 'Soft'], ['Solid', 'Solid'], ['Mixed', 'Mixed'], ['archived', 'Archived']];
  if (filters) {
    filters.innerHTML = filterDefs.map(([key, label]) =>
      `<button class="food-filter-chip ${foodLibraryFilter === key ? 'active' : ''}" onclick="setFoodLibraryFilter('${escapeHTML(key)}')">${escapeHTML(label)}</button>`
    ).join('');
  }
  const recentEl = document.getElementById('foodLibraryRecent');
  const recent = recentlyLoggedFoodPresetIds(8).map(foodPresetById).filter(Boolean);
  if (recentEl) recentEl.innerHTML = recent.length ? recent.map(recentFoodChipHTML).join('') : `<span class="food-row-meta">Recent foods will appear here after logging.</span>`;
  const pinnedEl = document.getElementById('foodLibraryPinned');
  const pinned = foodPresets.filter(food => food.pinned && !food.archived).slice(0, 10);
  if (pinnedEl) pinnedEl.innerHTML = pinned.length ? pinned.map(recentFoodChipHTML).join('') : `<span class="food-row-meta">Pin favorite foods for faster logging.</span>`;

  const includeArchived = foodLibraryFilter === 'archived';
  let rows = foodLibraryRows(includeArchived).filter(food => {
    if (foodLibraryFilter !== 'all' && foodLibraryFilter !== 'archived' && normalizeFoodType(food.food_type) !== foodLibraryFilter) return false;
    if (!query) return true;
    const variationText = foodVariationsForPreset(food.id).map(v => v.name).join(' ');
    return normalizeFoodName(`${food.name} ${food.ingredients || ''} ${variationText}`).includes(query);
  });
  if (!selectedFoodPresetId && rows[0]) selectedFoodPresetId = rows[0].id;
  list.innerHTML = rows.length
    ? rows.map(foodLibraryRowHTML).join('')
    : `<div class="empty-state"><div class="empty-icon">🔎</div><p>No foods match this view.</p></div>`;
  renderFoodLibraryDetail();
}

function openFoodLibrarySheet(kind, id = '') {
  const food = foodPresetById(id || selectedFoodPresetId);
  const body = document.getElementById('modalBody');
  const title = document.getElementById('modalTitle');
  if (!body || !title) return;
  editingEntryId = null;
  if (kind === 'detail' && food) {
    selectedFoodPresetId = food.id;
    renderFoodLibraryDetail();
    title.textContent = food.name;
    body.innerHTML = renderFoodLibraryDetailSheet(food);
  } else if (kind === 'edit' && food) {
    title.textContent = `Edit ${food.name}`;
    body.innerHTML = buildFoodPresetForm(food);
  } else if (kind === 'variation' && food) {
    title.textContent = 'Add variation';
    body.innerHTML = buildFoodVariationForm(food);
  } else {
    title.textContent = 'Add saved food';
    body.innerHTML = buildFoodPresetForm(null);
  }
  document.getElementById('modalOverlay').classList.remove('hidden');
}

function renderFoodLibraryDetailSheet(food) {
  const old = document.getElementById('foodLibraryDetail')?.innerHTML || '';
  return `
    ${old}
    <button class="btn-cancel" onclick="closeModal()">Close</button>
  `;
}

function buildFoodPresetForm(food) {
  const isEdit = !!food;
  return `
    <input type="hidden" id="preset_id" value="${escapeHTML(food?.id || '')}">
    <div class="form-group"><label class="form-label">Food name</label><input class="form-input" id="preset_name" value="${escapeHTML(food?.name || '')}" placeholder="Example: Eggs"></div>
    <div class="form-group"><label class="form-label">Food type</label><select class="form-select" id="preset_food_type">
      ${['Unknown', 'Liquid', 'Soft', 'Solid', 'Mixed'].map(type => `<option ${normalizeFoodType(food?.food_type) === type ? 'selected' : ''}>${type}</option>`).join('')}
    </select></div>
    <div class="form-group"><label class="form-label">Ingredients</label><input class="form-input" id="preset_ingredients" value="${escapeHTML(food?.ingredients || '')}" placeholder="Optional"></div>
    <div class="confirm-grid">
      <div class="form-group"><label class="form-label">Default portion</label><input class="form-input" id="preset_default_portion_label" value="${escapeHTML(food?.default_portion_label || '')}" placeholder="1 bowl"></div>
      <div class="form-group"><label class="form-label">Portion unit</label><input class="form-input" id="preset_portion_unit" value="${escapeHTML(food?.portion_unit || '')}" placeholder="bowl"></div>
    </div>
    <div class="confirm-grid">
      <div class="form-group"><label class="form-label">Portion amount</label><input class="form-input" id="preset_portion_amount" value="${escapeHTML(food?.portion_amount || '')}" inputmode="decimal"></div>
      <div class="form-group"><label class="form-label">Calories</label><input class="form-input" id="preset_calories" value="${escapeHTML(food?.calories || '')}" inputmode="decimal"></div>
    </div>
    <div class="confirm-grid">
      <div class="form-group"><label class="form-label">Protein (g)</label><input class="form-input" id="preset_protein_g" value="${escapeHTML(food?.protein_g || '')}" inputmode="decimal"></div>
      <div class="form-group"><label class="form-label">Carbs (g)</label><input class="form-input" id="preset_carbs_g" value="${escapeHTML(food?.carbs_g || '')}" inputmode="decimal"></div>
    </div>
    <div class="confirm-grid">
      <div class="form-group"><label class="form-label">Fat (g)</label><input class="form-input" id="preset_fat_g" value="${escapeHTML(food?.fat_g || '')}" inputmode="decimal"></div>
      <div class="form-group"><label class="form-label">Pinned</label><select class="form-select" id="preset_pinned"><option value="false">No</option><option value="true" ${food?.pinned ? 'selected' : ''}>Yes</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" id="preset_notes">${escapeHTML(food?.notes || '')}</textarea></div>
    <button class="btn-submit" onclick="saveFoodPresetFromForm()">${isEdit ? 'Save changes' : 'Save food'}</button>
    ${isEdit ? (food.archived
      ? `<button class="btn-submit" onclick="unarchiveFoodPreset('${escapeHTML(food.id)}')">Unarchive</button>`
      : `<button class="btn-cancel" onclick="archiveFoodPreset('${escapeHTML(food.id)}')">Archive</button>`) : ''}
    <button class="btn-cancel" onclick="closeModal()">Cancel</button>
  `;
}

function saveFoodPresetFromForm() {
  const id = (document.getElementById('preset_id') || {}).value || newLocalId('food');
  const name = (document.getElementById('preset_name') || {}).value.trim();
  if (!name) {
    alert('Enter a food name.');
    return;
  }
  const now = new Date().toISOString();
  const existing = foodPresetById(id);
  const row = {
    ...(existing || {}),
    id,
    user_id: currentUser?.id || existing?.user_id || '',
    source: existing?.source || 'user',
    name,
    normalized_name: normalizeFoodName(name),
    food_type: normalizeFoodType((document.getElementById('preset_food_type') || {}).value),
    ingredients: (document.getElementById('preset_ingredients') || {}).value || '',
    default_portion_label: (document.getElementById('preset_default_portion_label') || {}).value || '',
    portion_amount: (document.getElementById('preset_portion_amount') || {}).value || '',
    portion_unit: (document.getElementById('preset_portion_unit') || {}).value || '',
    calories: (document.getElementById('preset_calories') || {}).value || '',
    protein_g: (document.getElementById('preset_protein_g') || {}).value || '',
    carbs_g: (document.getElementById('preset_carbs_g') || {}).value || '',
    fat_g: (document.getElementById('preset_fat_g') || {}).value || '',
    notes: (document.getElementById('preset_notes') || {}).value || '',
    pinned: (document.getElementById('preset_pinned') || {}).value === 'true',
    archived: existing?.archived || false,
    created_at: existing?.created_at || now,
    updated_at: now
  };
  const idx = foodPresets.findIndex(food => food.id === id);
  if (idx >= 0) foodPresets[idx] = row;
  else foodPresets.push(row);
  selectedFoodPresetId = id;
  persistFoodLibrary();
  closeModal();
}

function buildFoodVariationForm(food) {
  return `
    <input type="hidden" id="variation_preset_id" value="${escapeHTML(food.id)}">
    <div class="food-log-selected">
      <div class="food-row-title">${escapeHTML(food.name)}</div>
      <div class="food-row-meta">Food family</div>
    </div>
    <div class="form-group"><label class="form-label">Variation name</label><input class="form-input" id="variation_name" placeholder="Example: ${escapeHTML(food.name)} with cream"></div>
    <div class="form-group"><label class="form-label">Ingredients or preparation</label><input class="form-input" id="variation_ingredients" placeholder="Optional"></div>
    <div class="form-group"><label class="form-label">Portion override</label><input class="form-input" id="variation_portion_label" placeholder="Optional"></div>
    <div class="form-group"><label class="form-label">Notes</label><textarea class="form-textarea" id="variation_notes"></textarea></div>
    <button class="btn-submit" onclick="saveFoodVariationFromForm()">Save variation</button>
    <button class="btn-cancel" onclick="closeModal()">Cancel</button>
  `;
}

function saveFoodVariationFromForm() {
  const presetId = (document.getElementById('variation_preset_id') || {}).value;
  const name = (document.getElementById('variation_name') || {}).value.trim();
  if (!presetId || !name) {
    alert('Enter a variation name.');
    return;
  }
  const now = new Date().toISOString();
  foodPresetVariations.push({
    id: newLocalId('variation'),
    user_id: currentUser?.id || '',
    preset_id: presetId,
    name,
    normalized_name: normalizeFoodName(name),
    food_type: '',
    ingredients: (document.getElementById('variation_ingredients') || {}).value || '',
    portion_label: (document.getElementById('variation_portion_label') || {}).value || '',
    portion_amount: '',
    portion_unit: '',
    calories: '',
    protein_g: '',
    carbs_g: '',
    fat_g: '',
    notes: (document.getElementById('variation_notes') || {}).value || '',
    created_at: now,
    updated_at: now
  });
  selectedFoodPresetId = presetId;
  persistFoodLibrary();
  closeModal();
}

function archiveFoodPreset(id) {
  const food = foodPresetById(id);
  if (!food) return;
  if (!confirm(`Archive ${food.name}? Old logs and reports will still keep it.`)) return;
  food.archived = true;
  food.updated_at = new Date().toISOString();
  persistFoodLibrary();
  closeModal();
}

function unarchiveFoodPreset(id) {
  const food = foodPresetById(id);
  if (!food) return;
  food.archived = false;
  food.updated_at = new Date().toISOString();
  selectedFoodPresetId = id;
  if (foodLibraryFilter === 'archived') foodLibraryFilter = 'all';
  persistFoodLibrary();
  closeModal();
}

// ─── Day switching ─────────────────────────────────────────────────────────────
function switchDay(key) {
  if (!allDays[key]) allDays[key] = [];
  currentDay = key;
  renderAll();
}

// ─── FAB ──────────────────────────────────────────────────────────────────────
function toggleFab() {
  fabOpen = !fabOpen;
  document.getElementById('fabOptions').classList.toggle('hidden', !fabOpen);
  document.getElementById('fabMain').classList.toggle('open', fabOpen);
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function openModal(type, entryId = null) {
  fabOpen = false;
  document.getElementById('fabOptions').classList.add('hidden');
  document.getElementById('fabMain').classList.remove('open');

  editingEntryId = entryId;
  const editingEntry = entryId ? (allDays[currentDay] || []).find(entry => entry.id === entryId) : null;
  const timeStr = editingEntry ? editingEntry.time : currentBahrainTime();
  const titles = { poop:'🚽 Bowel movement', food:'🍽️ Food / drink', med:'💊 Medication', symptom:'😣 Symptom', note:'📝 Quick note', sleep:'🌙 Sleep' };
  document.getElementById('modalTitle').textContent = `${editingEntry ? 'Edit' : ''} ${titles[type]}`.trim();

  const body = document.getElementById('modalBody');
  body.innerHTML = buildForm(type, timeStr);
  document.getElementById('modalOverlay').classList.remove('hidden');

  bindModalControls(body);

  if (type === 'food') setupFoodPresetUI();
  if (type === 'poop') {
    const timeInput = document.getElementById('f_time');
    if (timeInput) timeInput.addEventListener('change', refreshRecentFoodLinks);
  }

  if (editingEntry) {
    fillForm(type, editingEntry);
    if (type === 'food') updateFoodPresetSuggestion();
    const submit = body.querySelector('.btn-submit');
    if (submit) submit.textContent = 'Save changes';
  }
}

function bindModalControls(scope = document) {
  scope.querySelectorAll('.chip').forEach(c => {
    if (c.dataset.bound === 'true') return;
    c.dataset.bound = 'true';
    c.addEventListener('click', () => {
      const grp = c.dataset.group;
      if (grp && c.dataset.multi !== 'true') {
        scope.querySelectorAll(`.chip[data-group="${grp}"]`).forEach(x => x.classList.remove('selected'));
      }
      c.classList.toggle('selected');
    });
  });

  scope.querySelectorAll('.urgency-btn').forEach((b,i) => {
    if (b.dataset.bound === 'true') return;
    b.dataset.bound = 'true';
    b.addEventListener('click', () => {
      scope.querySelectorAll('.urgency-btn').forEach(x => x.className = 'urgency-btn');
      b.classList.add(`sel-${i+1}`);
      b.dataset.selected = 'true';
    });
  });

  scope.querySelectorAll('.med-preset').forEach(btn => {
    if (btn.dataset.bound === 'true') return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => {
      const name = document.getElementById('f_name');
      const dose = document.getElementById('f_dose');
      if (name) name.value = btn.dataset.name || '';
      if (dose) dose.value = btn.dataset.dose || '';
    });
  });
}

function setFieldValue(id, value) {
  const field = document.getElementById(id);
  if (field) field.value = value || '';
}

function selectChip(group, value) {
  if (!value) return;
  const chips = Array.from(document.querySelectorAll(`.chip[data-group="${group}"]`));
  const match = chips.find(chip => (chip.dataset.value || chip.textContent) === String(value));
  if (match) match.classList.add('selected');
}

function selectChipsByValue(group, values) {
  const selected = new Set(Array.isArray(values) ? values.map(String) : []);
  if (!selected.size) return;
  document.querySelectorAll(`.chip[data-group="${group}"]`).forEach(chip => {
    if (selected.has(chip.dataset.value || chip.textContent)) chip.classList.add('selected');
  });
}

function selectUrgency(value) {
  if (!value) return;
  const buttons = Array.from(document.querySelectorAll('.urgency-btn'));
  const match = buttons.find(button => button.textContent === String(value));
  if (match) {
    match.classList.add(`sel-${value}`);
    match.dataset.selected = 'true';
  }
}

function entryDateTime(dateKey, time) {
  const [y, m, d] = String(dateKey || currentDay).split('-').map(Number);
  const [hh, mm] = String(time || '00:00').split(':').map(Number);
  return Date.UTC(y || 1970, (m || 1) - 1, d || 1, hh || 0, mm || 0);
}

function allEntriesWithDates() {
  return Object.keys(allDays).flatMap(dateKey =>
    (allDays[dateKey] || []).map(entry => ({ ...entry, dateKey }))
  ).sort((a, b) => entryDateTime(a.dateKey, a.time) - entryDateTime(b.dateKey, b.time));
}

function recentFoodEntries(beforeTime, hours = 12) {
  const cutoff = entryDateTime(currentDay, beforeTime || currentBahrainTime());
  const earliest = cutoff - hours * 60 * 60 * 1000;
  return allEntriesWithDates()
    .filter(entry => entry.type === 'food')
    .filter(entry => entry.data?.ftype !== 'Fluid' || entry.data?.item)
    .filter(entry => {
      const ts = entryDateTime(entry.dateKey, entry.time);
      return ts <= cutoff && ts >= earliest;
    })
    .slice(-8)
    .reverse();
}

function foodEntryDisplayName(entry) {
  const d = entry?.data || {};
  return d.food_variation_name || d.food_family_name || d.canonical_food || d.item_raw || d.item || 'Food / drink';
}

function minutesBeforeOutcome(foodEntry, outcomeTime, outcomeDateKey = currentDay) {
  const foodTs = entryDateTime(foodEntry.dateKey || currentDay, foodEntry.time);
  const outcomeTs = entryDateTime(outcomeDateKey, outcomeTime || currentBahrainTime());
  return Math.max(0, Math.round((outcomeTs - foodTs) / 60000));
}

function minutesBeforeLabel(minutes) {
  if (minutes < 60) return `${minutes}m before`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h${mins ? ` ${mins}m` : ''} before`;
}

function linkedFoodSnapshot(entry, outcomeTime, outcomeDateKey = currentDay) {
  const d = entry.data || {};
  return {
    entry_id: entry.id,
    time: entry.time || '',
    item_raw: d.item_raw || d.item || '',
    canonical_food: d.canonical_food || d.food_family_name || d.item || '',
    food_family_name: d.food_family_name || d.canonical_food || d.item || '',
    food_variation_name: d.food_variation_name || '',
    food_preset_id: d.food_preset_id || '',
    food_variation_id: d.food_variation_id || '',
    portion_count: d.portion_count || '',
    food_type: d.food_type || d.ftype || '',
    minutes_before_bm: minutesBeforeOutcome(entry, outcomeTime, outcomeDateKey)
  };
}

function selectedLinkedFoodIdsForEditing() {
  if (!editingEntryId) return null;
  const entry = (allDays[currentDay] || []).find(item => item.id === editingEntryId);
  if (!entry) return null;
  if (Array.isArray(entry.data?.linked_food_entry_ids)) return entry.data.linked_food_entry_ids.filter(Boolean);
  if (Array.isArray(entry.data?.recent_food_ids)) return entry.data.recent_food_ids.filter(Boolean);
  return [];
}

function recentFoodLinkHTML(timeStr) {
  const foods = recentFoodEntries(timeStr, 12);
  const selectedForEdit = selectedLinkedFoodIdsForEditing();
  if (!foods.length) {
    return `
      <div class="form-group" id="recentFoodLinkSection">
        <label class="form-label">Recent foods before this bowel movement</label>
        <p class="food-link-help">No food or drink logs were found in the previous 12 hours. You can still save this bowel movement without linking foods.</p>
      </div>
    `;
  }
  const selectedIds = new Set(selectedForEdit || foods.map(entry => entry.id));
  return `
    <div class="form-group" id="recentFoodLinkSection">
      <label class="form-label">Recent foods before this bowel movement</label>
      <p class="food-link-help">Confirm which foods or drinks should be linked to this bowel movement. This helps Food Map notice patterns over time.</p>
      <div class="chip-group">
        ${foods.map(entry => {
          const minutes = minutesBeforeOutcome(entry, timeStr);
          const label = `${foodEntryDisplayName(entry)} — ${minutesBeforeLabel(minutes)}`;
          return `<button class="chip ${selectedIds.has(entry.id) ? 'selected' : ''}" data-group="recent_food_ids" data-multi="true" data-value="${escapeHTML(entry.id)}">${escapeHTML(label)}</button>`;
        }).join('')}
      </div>
      <div class="food-preset-actions" style="margin-top:8px">
        <button type="button" class="food-preset-action" onclick="selectAllRecentFoodLinks()">Select all</button>
        <button type="button" class="food-preset-action" onclick="clearRecentFoodLinks()">Clear</button>
        <button type="button" class="food-preset-action" onclick="focusRecentFoodLinks()">Edit linked foods</button>
      </div>
    </div>
  `;
}

function refreshRecentFoodLinks() {
  const section = document.getElementById('recentFoodLinkSection');
  if (!section) return;
  const time = (document.getElementById('f_time') || {}).value || currentBahrainTime();
  const wrapper = document.createElement('div');
  wrapper.innerHTML = recentFoodLinkHTML(time).trim();
  section.replaceWith(wrapper.firstElementChild);
  bindModalControls(document.getElementById('modalBody'));
}

function selectAllRecentFoodLinks() {
  document.querySelectorAll('.chip[data-group="recent_food_ids"]').forEach(chip => chip.classList.add('selected'));
}

function clearRecentFoodLinks() {
  document.querySelectorAll('.chip[data-group="recent_food_ids"]').forEach(chip => chip.classList.remove('selected'));
}

function focusRecentFoodLinks() {
  const section = document.getElementById('recentFoodLinkSection');
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function fillForm(type, entry) {
  const d = entry.data || {};
  setFieldValue('f_time', entry.time);
  if (type === 'poop') {
    selectChip('bristol', d.bristol);
    selectChip('consistency', d.consistency);
    selectUrgency(d.urgency);
    selectChip('gas', d.gas);
    selectChip('blood', d.blood);
    selectChipsByValue('recent_food_ids', d.linked_food_entry_ids || d.recent_food_ids);
    setFieldValue('f_notes', d.notes);
  } else if (type === 'food') {
    setFieldValue('f_date', entry.dateKey || currentDay);
    setFieldValue('f_item', d.item_raw || d.food_alias || d.item);
    setFieldValue('f_food_search', d.food_family_name || d.canonical_food || d.item || '');
    setFieldValue('f_item_raw', d.item_raw || d.food_alias || d.item);
    setFieldValue('f_canonical_food', d.food_preset_mode === 'separate' ? '' : (d.canonical_food || d.item));
    setFieldValue('f_food_preset_key', d.food_preset_key || (d.canonical_food ? foodSlug(d.canonical_food) : ''));
    setFieldValue('f_food_preset_mode', d.food_preset_mode || (d.canonical_food ? 'preset' : ''));
    setFieldValue('f_food_preset_id', d.food_preset_id);
    setFieldValue('f_food_variation_id', d.food_variation_id);
    setFieldValue('f_food_family_name', d.food_family_name);
    setFieldValue('f_food_variation_name', d.food_variation_name);
    const canonicalField = document.getElementById('f_canonical_food');
    if (canonicalField && d.food_preset_mode === 'separate') canonicalField.dataset.auto = 'disabled';
    setFieldValue('f_amount', d.amount);
    setFieldValue('f_ingredients', d.ingredients);
    setFieldValue('f_fluid_ml', d.fluid_ml);
    selectChip('food_type', d.food_type || ({ Fluid: 'Liquid', 'Soft food': 'Soft', 'Solid food': 'Solid', Snack: 'Solid' }[d.ftype] || 'Unknown'));
    setFieldValue('f_portion_count', d.portion_count || '1');
    const box = document.getElementById('portionCountBox');
    if (box) box.textContent = d.portion_count || '1';
    if (d.food_preset_id) selectFoodForLogging(d.food_preset_id, d.food_variation_id);
    setFieldValue('f_notes', d.notes);
  } else if (type === 'med') {
    setFieldValue('f_name', d.name);
    setFieldValue('f_dose', d.dose);
    setFieldValue('f_notes', d.notes);
  } else if (type === 'symptom') {
    const knownSymptoms = ['Perianal irritation','Bloating','Nausea','Cramping','Fatigue','Pain (wound)','Urgency','Tenesmus','Other'];
    if (knownSymptoms.includes(d.symptom)) selectChip('symptom', d.symptom);
    else {
      selectChip('symptom', 'Other');
      setFieldValue('f_custom', d.symptom);
    }
    selectUrgency(d.severity);
    selectChipsByValue('recent_food_ids', d.recent_food_ids);
    setFieldValue('f_notes', d.notes);
  } else if (type === 'sleep') {
    setFieldValue('f_bedtime', d.bedtime);
    setFieldValue('f_wakeup', d.wakeup);
    setFieldValue('f_total', d.total);
    setFieldValue('f_interruptions', d.interruptions);
    setFieldValue('f_recovery', d.whoop_recovery);
    setFieldValue('f_sleep_score', d.whoop_sleep_score);
    setFieldValue('f_hrv', d.whoop_hrv);
    setFieldValue('f_rhr', d.whoop_rhr);
    setFieldValue('f_notes', d.notes);
  } else if (type === 'note') {
    setFieldValue('f_text', d.text);
  }
}

function buildForm(type, timeStr) {
  if (type === 'poop') return `
    <div class="form-group">
      <label class="form-label">Time</label>
      <input class="form-input" type="time" id="f_time" value="${timeStr}">
    </div>
    <div class="form-group">
      <label class="form-label">Bristol stool type</label>
      <div class="bristol-grid">
        ${BRISTOL_TYPES.map(item => `
          <button class="chip bristol-card" data-group="bristol" data-value="${escapeHTML(item.value)}" style="--bristol-color:${escapeHTML(item.color)};--bristol-tint:${escapeHTML(item.tint)}" aria-label="Bristol type ${escapeHTML(item.value)} ${escapeHTML(item.label)}">
            <span class="bristol-type-num"><small>TYPE</small>${escapeHTML(item.value)}</span>
            ${bristolVisual(item.value)}
            <span class="bristol-text">
              <strong>${escapeHTML(item.short)}</strong>
              <span>${escapeHTML(item.label)}</span>
            </span>
          </button>
        `).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Consistency</label>
      <div class="chip-group">
        ${['Watery','Very loose','Loose','Semi-formed','Formed'].map(c=>`<button class="chip" data-group="consistency">${c}</button>`).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Urgency (1 = calm, 5 = emergency)</label>
      <div class="urgency-row">
        ${[1,2,3,4,5].map(n=>`<button class="urgency-btn">${n}</button>`).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Gas</label>
      <div class="chip-group">
        ${['None','A little','Moderate','A lot'].map(c=>`<button class="chip" data-group="gas">${c}</button>`).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Blood? (be honest 🙏)</label>
      <div class="chip-group">
        ${['No','A little','Yes'].map(c=>`<button class="chip" data-group="blood">${c}</button>`).join('')}
      </div>
    </div>
    ${recentFoodLinkHTML(timeStr)}
    <div class="form-group">
      <label class="form-label">Notes (optional)</label>
      <textarea class="form-textarea" id="f_notes" placeholder="e.g. cramping before, took a while..."></textarea>
    </div>
    <button class="btn-submit" onclick="submitEntry('poop')">Save</button>
    <button class="btn-cancel" onclick="closeModal()">Cancel</button>
  `;

  if (type === 'food') return `
    <div class="confirm-grid">
      <div class="form-group">
        <label class="form-label">Confirm date</label>
        <input class="form-input" type="date" id="f_date" value="${currentDay}">
      </div>
      <div class="form-group">
        <label class="form-label">Confirm time</label>
        <input class="form-input" type="time" id="f_time" value="${timeStr}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Food / drink</label>
      <input class="form-input" type="text" id="f_food_search" placeholder="Search saved foods..." autocomplete="off">
    </div>
    <div class="food-picker-card">
      <div class="food-library-section-title">Recently logged</div>
      <div class="food-chip-row" id="foodLogRecent"></div>
      <div class="food-library-section-title" style="margin-top:10px">Pinned foods</div>
      <div class="food-chip-row" id="foodLogPinned"></div>
    </div>
    <div class="form-group">
      <label class="form-label">Or type a new food</label>
      <input class="form-input" type="text" id="f_item" placeholder="Example: chicken broth soup with cream" autocomplete="off">
      <input type="hidden" id="f_item_raw">
      <input type="hidden" id="f_canonical_food">
      <input type="hidden" id="f_food_preset_key">
      <input type="hidden" id="f_food_preset_mode">
      <input type="hidden" id="f_food_preset_id">
      <input type="hidden" id="f_food_variation_id">
      <input type="hidden" id="f_food_family_name">
      <input type="hidden" id="f_food_variation_name">
    </div>
    <div id="foodLogMatches"></div>
    <div class="food-log-selected hidden" id="foodLogSelected"></div>
    <div class="form-group">
      <label class="form-label">Portion count</label>
      <div class="portion-stepper">
        <button type="button" class="tool-btn" onclick="adjustPortionCount(-0.5)">-</button>
        <div class="portion-count-box" id="portionCountBox">1</div>
        <button type="button" class="tool-btn" onclick="adjustPortionCount(0.5)">+</button>
      </div>
      <input type="hidden" id="f_portion_count" value="1">
    </div>
    <div class="form-group">
      <label class="form-label">Portion label</label>
      <input class="form-input" type="text" id="f_amount" placeholder="e.g. 200ml, 1 cup, 1 bowl">
    </div>
    <div class="form-group">
      <label class="form-label">Main ingredients (optional)</label>
      <input class="form-input" type="text" id="f_ingredients" placeholder="e.g. rice, chicken, milk, banana">
    </div>
    <div class="form-group">
      <label class="form-label">Fluid amount (ml)</label>
      <input class="form-input" type="number" id="f_fluid_ml" min="0" step="10" placeholder="Only for drinks / fluids">
    </div>
    <div class="form-group">
      <label class="form-label">Type</label>
      <div class="chip-group">
        ${['Liquid','Soft','Solid','Mixed','Unknown'].map(c=>`<button class="chip" data-group="food_type" data-value="${c}">${c}</button>`).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Today’s changes</label>
      <textarea class="form-textarea" id="f_notes" placeholder="Optional note or modification"></textarea>
    </div>
    <div class="form-group">
      <label class="form-label">What should happen?</label>
      <div class="food-mode-list">
        <button type="button" class="food-mode-option selected" data-mode="once" onclick="setFoodLogMode('once')"><strong>Log once only</strong><span>Save today’s entry without changing the Food Library.</span></button>
        <button type="button" class="food-mode-option" data-mode="variation" onclick="setFoodLogMode('variation')"><strong>Save as new variation</strong><span>Use today’s version again in the future.</span></button>
        <button type="button" class="food-mode-option" data-mode="update" onclick="setFoodLogMode('update')"><strong>Update saved food</strong><span>Change the default saved food details.</span></button>
      </div>
    </div>
    <div class="form-group hidden" id="variationNameGroup">
      <label class="form-label">Variation name</label>
      <input class="form-input" id="f_variation_name_input" placeholder="Example: Chicken broth with cream">
    </div>
    <input type="hidden" id="f_trial_status" value="">
    <button class="btn-submit" onclick="submitEntry('food')">Save</button>
    <button class="btn-cancel" onclick="closeModal()">Cancel</button>
  `;

  if (type === 'med') return `
    <div class="form-group">
      <label class="form-label">Time</label>
      <input class="form-input" type="time" id="f_time" value="${timeStr}">
    </div>
    <div class="form-group">
      <label class="form-label">Common meds</label>
      <div class="chip-group">
        ${MED_PRESETS.map(m=>`<button class="chip med-preset" data-name="${escapeHTML(m.name)}" data-dose="${escapeHTML(m.dose)}">${escapeHTML(m.name)} ${escapeHTML(m.dose)}</button>`).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Medication name</label>
      <input class="form-input" type="text" id="f_name" placeholder="e.g. Paracetamol, Imodium...">
    </div>
    <div class="form-group">
      <label class="form-label">Dose</label>
      <input class="form-input" type="text" id="f_dose" placeholder="e.g. 500mg, 1 tablet">
    </div>
    <div class="form-group">
      <label class="form-label">Notes (optional)</label>
      <textarea class="form-textarea" id="f_notes" placeholder="e.g. taken with food, prescribed by..."></textarea>
    </div>
    <button class="btn-submit" onclick="submitEntry('med')">Save</button>
    <button class="btn-cancel" onclick="closeModal()">Cancel</button>
  `;

  if (type === 'symptom') return `
    <div class="form-group">
      <label class="form-label">Time</label>
      <input class="form-input" type="time" id="f_time" value="${timeStr}">
    </div>
    <div class="form-group">
      <label class="form-label">Symptom</label>
      <div class="chip-group">
        ${['Perianal irritation','Bloating','Nausea','Cramping','Fatigue','Pain (wound)','Urgency','Tenesmus','Other'].map(c=>`<button class="chip" data-group="symptom">${c}</button>`).join('')}
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Custom symptom (if Other)</label>
      <input class="form-input" type="text" id="f_custom" placeholder="Describe...">
    </div>
    <div class="form-group">
      <label class="form-label">Severity (1 = mild, 5 = severe)</label>
      <div class="urgency-row">
        ${[1,2,3,4,5].map(n=>`<button class="urgency-btn">${n}</button>`).join('')}
      </div>
    </div>
    ${recentFoodLinkHTML(timeStr)}
    <div class="form-group">
      <label class="form-label">Notes (optional)</label>
      <textarea class="form-textarea" id="f_notes" placeholder="Any triggers? What helped?"></textarea>
    </div>
    <button class="btn-submit" onclick="submitEntry('symptom')">Save</button>
    <button class="btn-cancel" onclick="closeModal()">Cancel</button>
  `;

  if (type === 'sleep') return `
    <div class="sleep-grid">
      <div class="form-group">
        <label class="form-label">Bedtime</label>
        <input class="form-input" type="time" id="f_bedtime">
      </div>
      <div class="form-group">
        <label class="form-label">Wake-up time</label>
        <input class="form-input" type="time" id="f_wakeup" value="${timeStr}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Total sleep (e.g. 5h 30m)</label>
      <input class="form-input" type="text" id="f_total" placeholder="e.g. 6h 15m">
    </div>
    <div class="form-group">
      <label class="form-label">Night interruptions / false alarms</label>
      <input class="form-input" type="number" id="f_interruptions" placeholder="0" min="0">
    </div>
    <div class="divider"></div>
    <div class="form-label" style="margin-bottom:10px">Whoop metrics <span style="font-weight:400;color:var(--ink-faint)">(optional — check your Whoop app)</span></div>
    <div class="sleep-grid">
      <div class="form-group">
        <label class="form-label">Recovery %</label>
        <input class="form-input" type="number" id="f_recovery" placeholder="e.g. 68">
      </div>
      <div class="form-group">
        <label class="form-label">Sleep score %</label>
        <input class="form-input" type="number" id="f_sleep_score" placeholder="e.g. 75">
      </div>
      <div class="form-group">
        <label class="form-label">HRV (ms)</label>
        <input class="form-input" type="number" id="f_hrv" placeholder="e.g. 42">
      </div>
      <div class="form-group">
        <label class="form-label">Resting HR (bpm)</label>
        <input class="form-input" type="number" id="f_rhr" placeholder="e.g. 58">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes (optional)</label>
      <textarea class="form-textarea" id="f_notes" placeholder="How did you feel waking up?"></textarea>
    </div>
    <button class="btn-submit" onclick="submitEntry('sleep')">Save</button>
    <button class="btn-cancel" onclick="closeModal()">Cancel</button>
  `;

  if (type === 'note') return `
    <div class="form-group">
      <label class="form-label">Time</label>
      <input class="form-input" type="time" id="f_time" value="${timeStr}">
    </div>
    <div class="form-group">
      <label class="form-label">Note</label>
      <textarea class="form-textarea" id="f_text" placeholder="Anything worth noting — doctor visit, how you feel, observations..." style="min-height:120px"></textarea>
    </div>
    <button class="btn-submit" onclick="submitEntry('note')">Save</button>
    <button class="btn-cancel" onclick="closeModal()">Cancel</button>
  `;
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
  editingEntryId = null;
}

function closeOnOverlay(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

function getSelected(group) {
  const el = document.querySelector(`.chip[data-group="${group}"].selected`);
  return el ? (el.dataset.value || el.textContent) : '';
}

function getSelectedValues(group) {
  return Array.from(document.querySelectorAll(`.chip[data-group="${group}"].selected`))
    .map(el => el.dataset.value || el.textContent)
    .filter(Boolean);
}

function getUrgency() {
  const el = document.querySelector('.urgency-btn[data-selected="true"]');
  return el ? el.textContent : '';
}

function setupFoodPresetUI() {
  activeFoodLogPresetId = '';
  activeFoodLogVariationId = '';
  activeFoodLogMode = 'once';
  renderFoodLogPicker();
  const search = document.getElementById('f_food_search');
  const item = document.getElementById('f_item');
  if (search) search.addEventListener('input', renderFoodLogPicker);
  if (item) item.addEventListener('input', () => {
    if (!activeFoodLogPresetId) renderFoodLogPicker();
  });
}

function openFoodLogForPreset(id) {
  openModal('food');
  selectFoodForLogging(id);
}

function setFoodLogMode(mode) {
  activeFoodLogMode = ['once', 'variation', 'update', 'new'].includes(mode) ? mode : 'once';
  document.querySelectorAll('.food-mode-option').forEach(button => {
    button.classList.toggle('selected', button.dataset.mode === activeFoodLogMode);
  });
  const variationGroup = document.getElementById('variationNameGroup');
  if (variationGroup) variationGroup.classList.toggle('hidden', activeFoodLogMode !== 'variation');
}

function adjustPortionCount(delta) {
  const field = document.getElementById('f_portion_count');
  const box = document.getElementById('portionCountBox');
  const next = Math.max(0.5, Math.round(((Number(field?.value || 1) || 1) + delta) * 2) / 2);
  if (field) field.value = String(next);
  if (box) box.textContent = String(next);
}

function foodLogChipHTML(food) {
  return `<button type="button" class="food-quick-chip" onclick="selectFoodForLogging('${escapeHTML(food.id)}')">${escapeHTML(food.name)}</button>`;
}

function foodLogMatchRowHTML(food) {
  const nutrition = foodNutritionLine(food);
  return `
    <div class="food-library-row">
      <button type="button" class="food-row-main" onclick="selectFoodForLogging('${escapeHTML(food.id)}')">
        <div class="food-row-title">${escapeHTML(food.name)}</div>
        <div class="food-row-meta">${escapeHTML(food.food_type)}${food.default_portion_label ? ` · ${escapeHTML(food.default_portion_label)}` : ''}</div>
        ${nutrition ? `<div class="food-row-meta">${escapeHTML(nutrition)}</div>` : ''}
      </button>
      <div class="row-actions"><button type="button" class="food-row-action primary" onclick="selectFoodForLogging('${escapeHTML(food.id)}')">Select</button></div>
    </div>
  `;
}

function renderFoodLogPicker() {
  const recentEl = document.getElementById('foodLogRecent');
  const pinnedEl = document.getElementById('foodLogPinned');
  const matchesEl = document.getElementById('foodLogMatches');
  const query = normalizeFoodName(document.getElementById('f_food_search')?.value || document.getElementById('f_item')?.value || '');
  const recent = recentlyLoggedFoodPresetIds(6).map(foodPresetById).filter(Boolean);
  const pinned = foodPresets.filter(food => food.pinned && !food.archived).slice(0, 8);
  if (recentEl) recentEl.innerHTML = recent.length ? recent.map(foodLogChipHTML).join('') : `<span class="food-row-meta">Recent foods will appear here after logging.</span>`;
  if (pinnedEl) pinnedEl.innerHTML = pinned.length ? pinned.map(foodLogChipHTML).join('') : `<span class="food-row-meta">Pin favorites in Food Library.</span>`;
  if (!matchesEl) return;
  const matches = query
    ? foodPresets.filter(food => !food.archived && normalizeFoodName(`${food.name} ${food.ingredients || ''} ${foodVariationsForPreset(food.id).map(v => v.name).join(' ')}`).includes(query)).slice(0, 5)
    : [];
  matchesEl.innerHTML = query
    ? (matches.length ? `<div class="food-library-list">${matches.map(foodLogMatchRowHTML).join('')}</div>` : `<div class="food-no-match">No saved food found.<div class="food-preset-actions" style="margin-top:8px"><button type="button" class="food-preset-action primary" onclick="setFoodLogMode('once')">Log once only</button><button type="button" class="food-preset-action violet" onclick="setFoodLogMode('new')">Save as new food</button></div></div>`)
    : '';
}

function selectFoodForLogging(id, variationId = '') {
  const food = foodPresetById(id);
  if (!food) return;
  activeFoodLogPresetId = id;
  activeFoodLogVariationId = variationId || '';
  const variation = variationId ? foodVariationById(variationId) : null;
  setFieldValue('f_food_preset_id', food.id);
  setFieldValue('f_food_variation_id', variation?.id || '');
  setFieldValue('f_food_family_name', food.name);
  setFieldValue('f_food_variation_name', variation?.name || '');
  setFieldValue('f_item', variation?.name || food.name);
  setFieldValue('f_item_raw', variation?.name || food.name);
  setFieldValue('f_canonical_food', food.name);
  setFieldValue('f_food_preset_key', food.id);
  setFieldValue('f_food_preset_mode', 'library');
  setFieldValue('f_amount', variation?.portion_label || food.default_portion_label || '');
  setFieldValue('f_ingredients', variation?.ingredients || food.ingredients || '');
  const type = normalizeFoodType(variation?.food_type || food.food_type);
  document.querySelectorAll('.chip[data-group="food_type"]').forEach(chip => chip.classList.toggle('selected', (chip.dataset.value || chip.textContent) === type));
  const selected = document.getElementById('foodLogSelected');
  if (selected) {
    selected.classList.remove('hidden');
    selected.innerHTML = `
      <div class="food-row-title">Selected: ${escapeHTML(food.name)}</div>
      <div class="food-row-meta">Type: ${escapeHTML(type)} · Default: ${escapeHTML(variation?.portion_label || food.default_portion_label || 'Not set')}</div>
      ${foodNutritionLine(variation || food) ? `<div class="food-row-meta">Nutrition: ${escapeHTML(foodNutritionLine(variation || food))}</div>` : ''}
      ${foodVariationsForPreset(food.id).length ? `<div class="food-chip-row" style="margin-top:8px">${foodVariationsForPreset(food.id).map(v => `<button type="button" class="food-quick-chip" onclick="selectFoodForLogging('${escapeHTML(food.id)}','${escapeHTML(v.id)}')">${escapeHTML(v.name)}</button>`).join('')}</div>` : ''}
    `;
  }
}
function submitEntry(type) {
  const id = editingEntryId || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const timeEl = document.getElementById('f_time');
  const time = timeEl ? timeEl.value : currentBahrainTime();
  const targetDate = type === 'food'
    ? ((document.getElementById('f_date') || {}).value || currentDay)
    : currentDay;
  let data = {};

  if (type === 'poop') {
    const linkedFoodEntryIds = getSelectedValues('recent_food_ids');
    const foodById = new Map(allEntriesWithDates().filter(entry => entry.type === 'food').map(entry => [entry.id, entry]));
    const linkedFoods = linkedFoodEntryIds
      .map(entryId => foodById.get(entryId))
      .filter(Boolean)
      .map(entry => linkedFoodSnapshot(entry, time, targetDate));
    data = {
      bristol: getSelected('bristol'),
      consistency: getSelected('consistency'),
      urgency: getUrgency(),
      gas: getSelected('gas'),
      blood: getSelected('blood'),
      recent_food_ids: linkedFoodEntryIds,
      linked_food_entry_ids: linkedFoodEntryIds,
      linked_foods: linkedFoods,
      notes: (document.getElementById('f_notes')||{}).value || ''
    };
  } else if (type === 'food') {
    const rawItem = (document.getElementById('f_item_raw')||{}).value || (document.getElementById('f_item')||{}).value || '';
    const canonicalField = document.getElementById('f_canonical_food');
    const presetId = (document.getElementById('f_food_preset_id')||{}).value || '';
    const variationId = (document.getElementById('f_food_variation_id')||{}).value || '';
    let preset = foodPresetById(presetId);
    let variation = foodVariationById(variationId);
    let canonical = (canonicalField||{}).value || preset?.name || '';
    let presetKey = (document.getElementById('f_food_preset_key')||{}).value || presetId || (canonical ? foodSlug(canonical) : '');
    let presetMode = (document.getElementById('f_food_preset_mode')||{}).value || (preset ? 'library' : (canonical ? 'preset' : 'separate'));
    const typedItem = ((document.getElementById('f_item')||{}).value || '').trim();
    const selectedFoodType = getSelected('food_type') || preset?.food_type || 'Unknown';
    const portionCount = (document.getElementById('f_portion_count')||{}).value || '1';
    const amount = (document.getElementById('f_amount')||{}).value || preset?.default_portion_label || '';
    const ingredients = (document.getElementById('f_ingredients')||{}).value || variation?.ingredients || preset?.ingredients || '';
    const notes = (document.getElementById('f_notes')||{}).value || '';
    if (activeFoodLogMode === 'new' && typedItem) {
      const now = new Date().toISOString();
      preset = {
        id: newLocalId('food'),
        user_id: currentUser?.id || '',
        source: 'user',
        name: titleCaseFood(typedItem),
        normalized_name: normalizeFoodName(typedItem),
        food_type: normalizeFoodType(selectedFoodType),
        ingredients,
        default_portion_label: amount,
        portion_amount: '',
        portion_unit: '',
        calories: '',
        protein_g: '',
        carbs_g: '',
        fat_g: '',
        notes: '',
        pinned: false,
        archived: false,
        created_at: now,
        updated_at: now
      };
      foodPresets.push(preset);
      selectedFoodPresetId = preset.id;
      canonical = preset.name;
      presetKey = preset.id;
      presetMode = 'library-new';
      persistFoodLibrary();
    }
    if (activeFoodLogMode === 'variation' && preset) {
      const variationName = ((document.getElementById('f_variation_name_input')||{}).value || '').trim();
      if (!variationName) {
        alert('Enter a variation name, such as Chicken broth with cream.');
        return;
      }
      const now = new Date().toISOString();
      variation = {
        id: newLocalId('variation'),
        user_id: currentUser?.id || '',
        preset_id: preset.id,
        name: variationName,
        normalized_name: normalizeFoodName(variationName),
        food_type: normalizeFoodType(selectedFoodType),
        ingredients,
        portion_label: amount,
        portion_amount: '',
        portion_unit: '',
        calories: '',
        protein_g: '',
        carbs_g: '',
        fat_g: '',
        notes,
        created_at: now,
        updated_at: now
      };
      foodPresetVariations.push(variation);
      persistFoodLibrary();
    }
    if (activeFoodLogMode === 'update' && preset) {
      preset.food_type = normalizeFoodType(selectedFoodType);
      preset.ingredients = ingredients;
      preset.default_portion_label = amount;
      preset.updated_at = new Date().toISOString();
      persistFoodLibrary();
    }
    const savedName = canonical || rawItem;
    data = {
      item: savedName,
      item_raw: rawItem,
      canonical_food: canonical,
      food_preset_key: presetKey,
      food_alias: canonical && normalizeFoodName(rawItem) !== normalizeFoodName(canonical) ? rawItem : '',
      food_preset_mode: presetMode,
      food_preset_id: preset?.id || '',
      food_variation_id: variation?.id || '',
      food_family_name: preset?.name || canonical || titleCaseFood(rawItem),
      food_variation_name: variation?.name || '',
      portion_count: portionCount,
      portion_label: amount,
      portion_amount: preset?.portion_amount || '',
      portion_unit: preset?.portion_unit || '',
      food_type: normalizeFoodType(selectedFoodType),
      ingredients,
      calories: variation?.calories || preset?.calories || '',
      protein_g: variation?.protein_g || preset?.protein_g || '',
      carbs_g: variation?.carbs_g || preset?.carbs_g || '',
      fat_g: variation?.fat_g || preset?.fat_g || '',
      modified_from_preset: preset ? (activeFoodLogMode !== 'once' || normalizeFoodName(rawItem) !== normalizeFoodName(preset.name)) : false,
      amount,
      fluid_ml: (document.getElementById('f_fluid_ml')||{}).value || '',
      ftype: foodTypeToLegacyFtype(selectedFoodType),
      trial_status: '',
      notes
    };
  } else if (type === 'med') {
    data = {
      name: (document.getElementById('f_name')||{}).value || '',
      dose: (document.getElementById('f_dose')||{}).value || '',
      notes: (document.getElementById('f_notes')||{}).value || ''
    };
  } else if (type === 'symptom') {
    const custom = (document.getElementById('f_custom')||{}).value || '';
    data = {
      symptom: getSelected('symptom') === 'Other' && custom ? custom : (getSelected('symptom') || custom),
      severity: getUrgency(),
      recent_food_ids: getSelectedValues('recent_food_ids'),
      notes: (document.getElementById('f_notes')||{}).value || ''
    };
  } else if (type === 'sleep') {
    data = {
      bedtime: (document.getElementById('f_bedtime')||{}).value || '',
      wakeup: (document.getElementById('f_wakeup')||{}).value || '',
      total: (document.getElementById('f_total')||{}).value || '',
      interruptions: (document.getElementById('f_interruptions')||{}).value || '',
      whoop_recovery: (document.getElementById('f_recovery')||{}).value || '',
      whoop_sleep_score: (document.getElementById('f_sleep_score')||{}).value || '',
      whoop_hrv: (document.getElementById('f_hrv')||{}).value || '',
      whoop_rhr: (document.getElementById('f_rhr')||{}).value || '',
      notes: (document.getElementById('f_notes')||{}).value || ''
    };
  } else if (type === 'note') {
    data = { text: (document.getElementById('f_text')||{}).value || '' };
  }

  if (!allDays[targetDate]) allDays[targetDate] = [];
  const entry = { id, type, time, data };
  if (editingEntryId) {
    Object.keys(allDays).forEach(dateKey => {
      if (dateKey !== targetDate && Array.isArray(allDays[dateKey])) {
        allDays[dateKey] = allDays[dateKey].filter(existing => existing.id !== id);
      }
    });
  }
  const existingIdx = allDays[targetDate].findIndex(existing => existing.id === id);
  if (existingIdx >= 0) allDays[targetDate][existingIdx] = entry;
  else allDays[targetDate].push(entry);
  currentDay = targetDate;
  save();
  pushEntryToCloud(targetDate, entry);
  closeModal();
  renderAll();
}

function editEntry(id) {
  const entry = (allDays[currentDay] || []).find(item => item.id === id);
  if (!entry) return;
  openModal(entry.type, id);
}

function editEntryFromButton(button) {
  editEntry(button.dataset.entryId || '');
}

function deleteEntry(id) {
  if (!confirm('Delete this entry?')) return;
  allDays[currentDay] = allDays[currentDay].filter(e => e.id !== id);
  if (id && !deletedEntryIds.includes(id)) deletedEntryIds.push(id);
  save();
  deleteEntryFromCloud(id);
  renderAll();
}

function deleteEntryFromButton(button) {
  deleteEntry(button.dataset.entryId || '');
}

// ─── Backup ──────────────────────────────────────────────────────────────────
function exportBackup() {
  const payload = {
    app: 'RecoveryLog',
    version: 21,
    exportedAt: new Date().toISOString(),
    days: allDays,
    food_presets: foodPresets,
    food_preset_variations: foodPresetVariations
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `recovery-log-backup-${todayKey()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importBackup(event) {
  const file = event.target.files && event.target.files[0];
  event.target.value = '';
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const days = parsed.days || parsed;
      if (!days || typeof days !== 'object' || Array.isArray(days)) {
        throw new Error('Invalid backup');
      }
      const count = Object.values(days).reduce((sum, entries) => sum + (Array.isArray(entries) ? entries.length : 0), 0);
      if (!confirm(`Import ${count} entries from this backup? This will merge with the current log.`)) return;
      Object.keys(days).forEach(key => {
        if (!Array.isArray(days[key])) return;
        const existing = allDays[key] || [];
        const seen = new Set(existing.map(entry => entry.id));
        const incoming = days[key].filter(entry => entry && entry.id && !seen.has(entry.id) && !deletedEntryIds.includes(entry.id));
        allDays[key] = existing.concat(incoming);
      });
      if (Array.isArray(parsed.food_presets)) {
        const seenFoods = new Set(foodPresets.map(food => food.id));
        parsed.food_presets.forEach(food => {
          if (food?.id && !seenFoods.has(food.id)) foodPresets.push(food);
        });
      }
      if (Array.isArray(parsed.food_preset_variations)) {
        const seenVariations = new Set(foodPresetVariations.map(variation => variation.id));
        parsed.food_preset_variations.forEach(variation => {
          if (variation?.id && !seenVariations.has(variation.id)) foodPresetVariations.push(variation);
        });
      }
      save();
      saveFoodLibraryLocal();
      renderAll();
      uploadLocalEntries().then(() => {
        if (currentUser) setSyncStatus('synced');
      }).catch(e => setAuthStatus(`Import synced locally, cloud sync failed: ${e.message}`));
      uploadFoodLibraryToCloud().catch(() => {});
      alert('Backup imported.');
    } catch(e) {
      alert('Could not import that backup file.');
    }
  };
  reader.readAsText(file);
}

// ─── Doctor report ───────────────────────────────────────────────────────────
function setReportToToday() {
  const start = document.getElementById('reportStart');
  const end = document.getElementById('reportEnd');
  if (start) start.value = currentDay;
  if (end) end.value = currentDay;
}

function csvCell(value) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

function entryReportTitle(entry) {
  const d = entry.data || {};
  if (entry.type === 'poop') return d.consistency || 'Bowel movement';
  if (entry.type === 'food') return d.food_variation_name || d.food_family_name || d.canonical_food || d.item || 'Food / drink';
  if (entry.type === 'med') return [d.name, d.dose].filter(Boolean).join(' ') || 'Medication';
  if (entry.type === 'symptom') return d.symptom || 'Symptom';
  if (entry.type === 'sleep') return `Sleep ${d.total || ''}`.trim();
  return d.text || 'Note';
}

function linkedFoodNamesForEntry(entry) {
  const d = entry.data || {};
  if (Array.isArray(d.linked_foods) && d.linked_foods.length) {
    return d.linked_foods
      .map(food => food.food_variation_name || food.food_family_name || food.canonical_food || food.item_raw)
      .filter(Boolean);
  }
  const ids = Array.isArray(d.linked_food_entry_ids)
    ? d.linked_food_entry_ids
    : Array.isArray(d.recent_food_ids)
      ? d.recent_food_ids
      : [];
  if (!ids.length) return [];
  const foodsById = new Map(allEntriesWithDates().filter(item => item.type === 'food').map(item => [item.id, item]));
  return ids
    .map(id => foodsById.get(id))
    .filter(Boolean)
    .map(foodEntryDisplayName);
}

function entryReportDetails(entry) {
  const d = entry.data || {};
  if (entry.type === 'poop') return [
    d.bristol ? `Bristol ${d.bristol}${bristolType(d.bristol) ? ` (${bristolType(d.bristol).short})` : ''}` : '',
    d.urgency ? `urgency ${d.urgency}/5` : '',
    d.gas ? `gas ${d.gas}` : '',
    d.blood ? `blood ${d.blood}` : '',
    linkedFoodNamesForEntry(entry).length ? `Linked recent foods/drinks: ${linkedFoodNamesForEntry(entry).join(', ')}` : '',
    d.notes || ''
  ].filter(Boolean).join('; ');
  if (entry.type === 'food') return [
    d.food_family_name ? `food family ${d.food_family_name}` : '',
    d.food_variation_name ? `variation ${d.food_variation_name}` : '',
    d.food_alias ? `entered as ${d.food_alias}` : '',
    d.food_type || d.ftype || '',
    d.portion_count ? `portion count ${d.portion_count}` : '',
    d.portion_label || d.amount || '',
    d.ingredients ? `ingredients ${d.ingredients}` : '',
    d.calories ? `${d.calories} cal` : '',
    d.protein_g ? `Protein ${d.protein_g}g` : '',
    d.carbs_g ? `Carbs ${d.carbs_g}g` : '',
    d.fat_g ? `Fat ${d.fat_g}g` : '',
    d.fluid_ml ? `${d.fluid_ml} ml` : '',
    d.trial_status ? `food trial ${d.trial_status}` : '',
    d.tolerated ? `tolerated ${d.tolerated}` : '',
    d.notes || ''
  ].filter(Boolean).join('; ');
  if (entry.type === 'med') return d.notes || '';
  if (entry.type === 'symptom') return [
    d.severity ? `severity ${d.severity}/5` : '',
    Array.isArray(d.recent_food_ids) && d.recent_food_ids.length ? `${d.recent_food_ids.length} linked food(s)` : '',
    d.notes || ''
  ].filter(Boolean).join('; ');
  if (entry.type === 'sleep') return [
    d.bedtime ? `bed ${d.bedtime}` : '',
    d.wakeup ? `wake ${d.wakeup}` : '',
    d.interruptions ? `${d.interruptions} interruptions` : '',
    d.whoop_recovery ? `recovery ${d.whoop_recovery}%` : '',
    d.whoop_sleep_score ? `sleep score ${d.whoop_sleep_score}%` : '',
    d.whoop_hrv ? `HRV ${d.whoop_hrv}ms` : '',
    d.whoop_rhr ? `RHR ${d.whoop_rhr}bpm` : '',
    d.notes || ''
  ].filter(Boolean).join('; ');
  return '';
}

function orderedReportRange() {
  const startEl = document.getElementById('reportStart');
  const endEl = document.getElementById('reportEnd');
  let start = (startEl && startEl.value) || currentDay;
  let end = (endEl && endEl.value) || start;
  if (start > end) [start, end] = [end, start];
  return { start, end };
}

function reportEntriesForRange(start, end) {
  const keys = Object.keys(allDays).filter(key => key >= start && key <= end).sort();
  const days = keys.map(key => ({
    key,
    entries: (allDays[key] || []).slice().sort((a,b) => (a.time || '').localeCompare(b.time || ''))
  })).filter(day => day.entries.length > 0);
  return {
    days,
    entries: days.flatMap(day => day.entries.map(entry => ({ ...entry, dateKey: day.key })))
  };
}

function parseNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function parseSleepMinutes(value) {
  const text = String(value || '').toLowerCase();
  const hours = Number((text.match(/(\d+(?:\.\d+)?)\s*h/) || [])[1] || 0);
  const minutes = Number((text.match(/(\d+)\s*m/) || [])[1] || 0);
  if (hours || minutes) return Math.round(hours * 60 + minutes);
  const numeric = Number(text);
  return Number.isFinite(numeric) ? Math.round(numeric * 60) : 0;
}

function minutesLabel(minutes) {
  if (!minutes) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

function reportTypeLabel(type) {
  return {
    poop: 'Bowel',
    food: 'Food / fluid',
    med: 'Medication',
    symptom: 'Symptom',
    sleep: 'Sleep',
    note: 'Note',
    activity: 'Activity'
  }[type] || type || 'Entry';
}

function reportStatus(metrics) {
  if (metrics.bloodCount || metrics.maxSymptom >= 4 || metrics.maxUrgency >= 5) {
    return { label: 'Needs attention', tone: 'rose', text: 'Review the highlighted symptoms, urgency, or blood notes with the doctor.' };
  }
  if (metrics.looseBms >= 3 || (metrics.dayCount === 1 && metrics.fluids > 0 && metrics.fluids < 1200)) {
    return { label: 'Watch closely', tone: 'amber', text: 'A few items may need monitoring, especially stools, fluids, or symptoms.' };
  }
  return { label: 'Stable log', tone: 'teal', text: 'No major warning pattern is visible from the logged entries.' };
}

function summarizeReport(days, entries) {
  const dayStats = days.map(day => {
    const entriesForDay = day.entries;
    const bms = entriesForDay.filter(e => e.type === 'poop');
    const symptoms = entriesForDay.filter(e => e.type === 'symptom');
    const fluids = entriesForDay
      .filter(e => e.type === 'food')
      .reduce((sum, e) => sum + parseNumber(e.data?.fluid_ml), 0);
    const maxSymptom = Math.max(0, ...symptoms.map(e => parseNumber(e.data?.severity)));
    return { key: day.key, bms: bms.length, fluids, maxSymptom };
  });

  const bms = entries.filter(e => e.type === 'poop');
  const symptoms = entries.filter(e => e.type === 'symptom');
  const sleepEntries = entries.filter(e => e.type === 'sleep');
  const sleepMinutes = sleepEntries.map(e => parseSleepMinutes(e.data?.total)).filter(Boolean);
  const metrics = {
    dayCount: days.length,
    entryCount: entries.length,
    bms: bms.length,
    looseBms: bms.filter(e => /loose|watery/i.test(e.data?.consistency || '')).length,
    bloodCount: bms.filter(e => e.data?.blood && e.data.blood !== 'No').length,
    maxUrgency: Math.max(0, ...bms.map(e => parseNumber(e.data?.urgency))),
    meals: entries.filter(e => e.type === 'food' && e.data?.ftype !== 'Fluid').length,
    fluids: entries.filter(e => e.type === 'food').reduce((sum, e) => sum + parseNumber(e.data?.fluid_ml), 0),
    meds: entries.filter(e => e.type === 'med').length,
    maxSymptom: Math.max(0, ...symptoms.map(e => parseNumber(e.data?.severity))),
    avgSleep: sleepMinutes.length ? Math.round(sleepMinutes.reduce((sum, m) => sum + m, 0) / sleepMinutes.length) : 0,
    dayStats
  };
  metrics.status = reportStatus(metrics);
  return metrics;
}

function reportBarChart(title, subtitle, rows, valueKey, unit) {
  const max = Math.max(1, ...rows.map(row => row[valueKey] || 0));
  const items = rows.map(row => {
    const value = row[valueKey] || 0;
    const width = Math.max(value ? 8 : 0, Math.round((value / max) * 100));
    const date = formatBahrainDate(row.key, { day: 'numeric', month: 'short' });
    const displayValue = value ? `${value}${unit && unit.startsWith('/') ? unit : unit ? ` ${unit}` : ''}` : '—';
    return `
      <div class="chart-row">
        <div class="chart-label">${escapeHTML(date)}</div>
        <div class="chart-track"><div class="chart-fill" style="width:${width}%"></div></div>
        <div class="chart-value">${escapeHTML(displayValue)}</div>
      </div>
    `;
  }).join('');
  return `
    <section class="chart-card">
      <h2>${escapeHTML(title)}</h2>
      <p>${escapeHTML(subtitle)}</p>
      <div class="chart-rows">${items}</div>
    </section>
  `;
}

function buildReportTimeline(days) {
  return days.map(day => {
    const events = day.entries.map(entry => `
      <div class="timeline-dot tone-${escapeHTML(entry.type)}" title="${escapeHTML(reportTypeLabel(entry.type))}">
        <span>${escapeHTML(entry.time || '')}</span>
      </div>
    `).join('');
    return `
      <div class="report-day-line">
        <div class="report-day-label">
          <strong>${escapeHTML(formatBahrainDate(day.key, { day: 'numeric', month: 'short' }))}</strong>
          <span>Day ${escapeHTML(dayNumber(day.key))}</span>
        </div>
        <div class="report-timeline">${events}</div>
      </div>
    `;
  }).join('');
}

function buildDoctorReportHTML(start, end, days, entries, backUrl = appRedirectUrl()) {
  const metrics = summarizeReport(days, entries);
  const rangeLabel = start === end
    ? formatFullDate(start)
    : `${formatBahrainDate(start, { day: 'numeric', month: 'short', year: 'numeric' })} to ${formatBahrainDate(end, { day: 'numeric', month: 'short', year: 'numeric' })}`;
  const printedAt = new Date().toLocaleString('en-GB', { timeZone: APP_TIME_ZONE, dateStyle: 'medium', timeStyle: 'short' });
  const safeBackUrl = JSON.stringify(backUrl);
  const keyNotes = [
    metrics.bloodCount ? `${metrics.bloodCount} bowel entry marked with blood.` : '',
    metrics.looseBms ? `${metrics.looseBms} loose/watery bowel movement${metrics.looseBms === 1 ? '' : 's'}.` : '',
    metrics.maxSymptom ? `Highest symptom severity: ${metrics.maxSymptom}/5.` : '',
    metrics.maxUrgency ? `Highest bowel urgency: ${metrics.maxUrgency}/5.` : '',
    metrics.fluids ? `Logged fluids: ${metrics.fluids} ml.` : ''
  ].filter(Boolean);
  const detailRows = entries.map(entry => `
    <tr>
      <td>${escapeHTML(formatBahrainDate(entry.dateKey, { day: 'numeric', month: 'short' }))}</td>
      <td>${escapeHTML(entry.time || '')}</td>
      <td><span class="type-pill tone-${escapeHTML(entry.type)}">${escapeHTML(reportTypeLabel(entry.type))}</span></td>
      <td>${escapeHTML(entryReportTitle(entry))}</td>
      <td>${escapeHTML(entryReportDetails(entry))}</td>
    </tr>
  `).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Recovery Report ${escapeHTML(start)} to ${escapeHTML(end)}</title>
<style>
  :root {
    --paper: #fffdf8;
    --ink: #1c1a17;
    --muted: #6f6960;
    --line: #e5ddd1;
    --soft: #f7f1e8;
    --teal: #2d7d6f;
    --teal-soft: #e8f4f1;
    --amber: #b8792c;
    --amber-soft: #fbf3e8;
    --rose: #b85c5c;
    --rose-soft: #f9eded;
    --violet: #6b5b8a;
    --violet-soft: #f0edf6;
    --slate: #4a6580;
    --slate-soft: #edf1f5;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #ece6dc;
    color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    line-height: 1.35;
  }
  .no-print {
    position: sticky;
    top: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    background: rgba(255, 253, 248, 0.92);
    border-bottom: 1px solid var(--line);
  }
  button {
    border: 1px solid var(--ink);
    border-radius: 8px;
    background: var(--ink);
    color: white;
    font: inherit;
    font-weight: 700;
    padding: 10px 14px;
  }
  button.secondary { background: transparent; color: var(--ink); }
  main {
    width: min(960px, calc(100% - 24px));
    margin: 18px auto 34px;
    background: var(--paper);
    border: 1px solid var(--line);
    box-shadow: 0 18px 42px rgba(28, 26, 23, 0.12);
    padding: 28px;
  }
  header {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 18px;
    align-items: start;
    padding-bottom: 18px;
    border-bottom: 2px solid var(--ink);
  }
  h1 {
    margin: 0 0 6px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 32px;
    letter-spacing: 0;
  }
  .meta, p { color: var(--muted); margin: 0; }
  .status-card {
    min-width: 190px;
    border-radius: 8px;
    border: 1px solid var(--line);
    padding: 12px;
    background: var(--soft);
  }
  .status-card strong {
    display: block;
    font-size: 18px;
    margin-bottom: 4px;
  }
  .status-card.teal { background: var(--teal-soft); color: var(--teal); }
  .status-card.amber { background: var(--amber-soft); color: var(--amber); }
  .status-card.rose { background: var(--rose-soft); color: var(--rose); }
  .status-card span { color: var(--ink); font-size: 13px; }
  .metric-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 8px;
    margin: 18px 0;
  }
  .metric {
    border: 1px solid var(--line);
    border-radius: 8px;
    background: white;
    padding: 10px;
  }
  .metric small {
    display: block;
    color: var(--muted);
    font-size: 11px;
    margin-bottom: 4px;
  }
  .metric strong {
    display: block;
    font-size: 20px;
    letter-spacing: 0;
  }
  .section-title {
    margin: 20px 0 8px;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0;
    color: var(--muted);
  }
  .note-box {
    border-left: 4px solid var(--teal);
    background: white;
    padding: 12px 14px;
    margin-bottom: 16px;
  }
  .note-box ul {
    margin: 0;
    padding-left: 18px;
  }
  .chart-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 18px;
  }
  .chart-card {
    border: 1px solid var(--line);
    border-radius: 8px;
    background: white;
    padding: 12px;
  }
  .chart-card h2 {
    margin: 0 0 3px;
    font-size: 15px;
  }
  .chart-card p {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .chart-row {
    display: grid;
    grid-template-columns: 54px 1fr 58px;
    gap: 8px;
    align-items: center;
    font-size: 11px;
    margin-top: 7px;
  }
  .chart-track {
    height: 8px;
    border-radius: 999px;
    background: var(--soft);
    overflow: hidden;
  }
  .chart-fill {
    height: 100%;
    min-width: 0;
    background: var(--teal);
    border-radius: inherit;
  }
  .chart-value { text-align: right; color: var(--muted); }
  .report-day-line {
    display: grid;
    grid-template-columns: 86px 1fr;
    gap: 12px;
    align-items: center;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: white;
    padding: 10px;
    margin-bottom: 8px;
  }
  .report-day-label strong, .report-day-label span {
    display: block;
  }
  .report-day-label span {
    color: var(--muted);
    font-size: 12px;
  }
  .report-timeline {
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 34px;
    border-left: 1px solid var(--line);
    padding-left: 10px;
    flex-wrap: wrap;
  }
  .timeline-dot {
    border-radius: 999px;
    border: 1px solid var(--line);
    padding: 4px 7px;
    font-size: 11px;
    font-weight: 700;
  }
  .type-pill {
    display: inline-block;
    border-radius: 999px;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
  }
  .tone-poop, .tone-amber { background: var(--amber-soft); color: var(--amber); }
  .tone-food, .tone-teal { background: var(--teal-soft); color: var(--teal); }
  .tone-med, .tone-violet { background: var(--violet-soft); color: var(--violet); }
  .tone-symptom, .tone-rose { background: var(--rose-soft); color: var(--rose); }
  .tone-note, .tone-slate, .tone-activity { background: var(--slate-soft); color: var(--slate); }
  .tone-sleep { background: #eef2ff; color: #5263a3; }
  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border: 1px solid var(--line);
    border-radius: 8px;
    overflow: hidden;
    font-size: 12px;
  }
  th, td {
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid var(--line);
    padding: 8px;
  }
  th {
    background: var(--soft);
    color: var(--muted);
    font-size: 11px;
  }
  tr:last-child td { border-bottom: 0; }
  footer {
    margin-top: 18px;
    padding-top: 10px;
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-size: 11px;
  }
  @page { margin: 12mm; size: A4; }
  @media print {
    body { background: white; }
    .no-print { display: none; }
    main {
      width: auto;
      margin: 0;
      padding: 0;
      border: 0;
      box-shadow: none;
    }
    .chart-card, .report-day-line, .metric, table { break-inside: avoid; }
  }
  @media (max-width: 760px) {
    main { padding: 18px; }
    header, .chart-grid, .metric-grid { grid-template-columns: 1fr; }
    .status-card { min-width: 0; }
    .report-day-line { grid-template-columns: 1fr; }
    .report-timeline { border-left: 0; padding-left: 0; }
  }
</style>
</head>
<body>
  <div class="no-print">
    <button onclick="window.print()">Print / Save PDF</button>
    <button class="secondary" onclick="location.href = ${safeBackUrl}">Back to app</button>
  </div>
  <main>
    <header>
      <div>
        <h1>Recovery Report</h1>
        <p class="meta">Mohamed · ${escapeHTML(rangeLabel)} · ${escapeHTML(metrics.dayCount)} day${metrics.dayCount === 1 ? '' : 's'} logged</p>
      </div>
      <div class="status-card ${escapeHTML(metrics.status.tone)}">
        <strong>${escapeHTML(metrics.status.label)}</strong>
        <span>${escapeHTML(metrics.status.text)}</span>
      </div>
    </header>

    <section class="metric-grid">
      <div class="metric"><small>Bowel movements</small><strong>${escapeHTML(metrics.bms)}</strong></div>
      <div class="metric"><small>Loose / watery</small><strong>${escapeHTML(metrics.looseBms)}</strong></div>
      <div class="metric"><small>Max symptom</small><strong>${metrics.maxSymptom ? `${escapeHTML(metrics.maxSymptom)}/5` : '—'}</strong></div>
      <div class="metric"><small>Fluids logged</small><strong>${metrics.fluids ? `${escapeHTML(metrics.fluids)} ml` : '—'}</strong></div>
      <div class="metric"><small>Medication logs</small><strong>${escapeHTML(metrics.meds)}</strong></div>
      <div class="metric"><small>Average sleep</small><strong>${escapeHTML(minutesLabel(metrics.avgSleep))}</strong></div>
    </section>

    <h2 class="section-title">Key points</h2>
    <div class="note-box">
      ${keyNotes.length ? `<ul>${keyNotes.map(note => `<li>${escapeHTML(note)}</li>`).join('')}</ul>` : '<p>No notable warning pattern in the selected logged entries.</p>'}
    </div>

    <h2 class="section-title">Small charts</h2>
    <div class="chart-grid">
      ${reportBarChart('Bowel movements', 'Count per logged day', metrics.dayStats, 'bms', '')}
      ${reportBarChart('Fluids', 'Logged intake per day', metrics.dayStats, 'fluids', 'ml')}
      ${reportBarChart('Symptoms', 'Highest severity per day', metrics.dayStats, 'maxSymptom', '/5')}
    </div>

    <h2 class="section-title">Visual timeline</h2>
    ${buildReportTimeline(days)}

    <h2 class="section-title">Detailed log</h2>
    <table>
      <thead>
        <tr><th>Date</th><th>Time</th><th>Type</th><th>Entry</th><th>Details</th></tr>
      </thead>
      <tbody>${detailRows}</tbody>
    </table>

    <footer>
      Generated ${escapeHTML(printedAt)} Bahrain time (GMT+3). This report summarizes logged observations and is not medical advice.
    </footer>
  </main>
<scr${'ipt'}>
  window.addEventListener('load', () => setTimeout(() => window.print(), 500));
<\/script>
</body>
</html>`;
}

function exportDoctorPDF() {
  const { start, end } = orderedReportRange();
  const { days, entries } = reportEntriesForRange(start, end);
  if (!entries.length) {
    alert('No entries in that date range.');
    return;
  }
  const html = buildDoctorReportHTML(start, end, days, entries);
  document.open();
  document.write(html);
  document.close();
}

function exportDoctorCSV() {
  const { start, end } = orderedReportRange();
  const keys = Object.keys(allDays).filter(key => key >= start && key <= end).sort();
  const rows = [['Date', 'Recovery day', 'Time', 'Type', 'Title', 'Details']];
  keys.forEach(key => {
    (allDays[key] || []).slice().sort((a,b) => a.time.localeCompare(b.time)).forEach(entry => {
      rows.push([
        formatBahrainDate(key, { day: 'numeric', month: 'short', year: 'numeric' }),
        `Day ${dayNumber(key)}`,
        entry.time,
        entry.type,
        entryReportTitle(entry),
        entryReportDetails(entry)
      ]);
    });
  });
  if (rows.length === 1) {
    alert('No entries in that date range.');
    return;
  }
  const csv = rows.map(row => row.map(csvCell).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `recovery-report-${start}-to-${end}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ─── New day button ───────────────────────────────────────────────────────────
function addNewDay() {
  const today = todayKey();
  if (!allDays[today]) allDays[today] = [];
  currentDay = today;
  save();
  renderAll();
}

// Check if we need to add today automatically
function checkNewDay() {
  const today = todayKey();
  if (!allDays[today]) {
    allDays[today] = [];
    save();
  }
  if (currentDay !== today) {
    // Keep viewing current unless it's first load
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────
Object.assign(window, {
  addNewDay,
  adjustPortionCount,
  archiveFoodPreset,
  askAIQuestion,
  clearRecentFoodLinks,
  closeModal,
  closeOnOverlay,
  deleteEntryFromButton,
  editEntryFromButton,
  exportBackup,
  exportDoctorCSV,
  exportDoctorPDF,
  focusRecentFoodLinks,
  generateAISummary,
  generateEntryInsight,
  goDay,
  importBackup,
  openFoodLibrarySheet,
  openFoodLogForPreset,
  openModal,
  renderFoodLibrary,
  saveFoodPresetFromForm,
  saveFoodVariationFromForm,
  selectAllRecentFoodLinks,
  selectFoodForLogging,
  selectFoodLibraryPreset,
  sendSignInCode,
  setFoodLibraryFilter,
  setFoodLogMode,
  setReportToToday,
  signOut,
  submitEntry,
  switchDay,
  switchMainTab,
  toggleAdvancedTools,
  toggleFab,
  toggleFoodMapSort,
  toggleSyncPanel,
  toggleTheme,
  unarchiveFoodPreset,
  verifyCode
});

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
applyTheme(currentTheme(), false);
load();
initSupabaseSync();
