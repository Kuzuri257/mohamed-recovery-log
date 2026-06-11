create table if not exists recovery_entries (
  user_id uuid references auth.users not null,
  id text not null,
  date_key text not null check (date_key ~ '^\d{4}-\d{2}-\d{2}$'),
  type text not null check (type in ('poop', 'food', 'med', 'symptom', 'note', 'sleep')),
  entry_time text not null check (entry_time ~ '^\d{2}:\d{2}$'),
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

alter table recovery_entries enable row level security;

create policy "Users can read their own recovery entries"
  on recovery_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert their own recovery entries"
  on recovery_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own recovery entries"
  on recovery_entries for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own recovery entries"
  on recovery_entries for delete
  using (auth.uid() = user_id);

create index if not exists recovery_entries_user_date_idx
  on recovery_entries (user_id, date_key, entry_time);

create table if not exists food_presets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  source text not null default 'user',
  name text not null,
  normalized_name text not null,
  food_type text not null default 'Unknown' check (food_type in ('Unknown', 'Liquid', 'Soft', 'Solid', 'Mixed')),
  ingredients text,
  default_portion_label text,
  portion_amount numeric,
  portion_unit text,
  calories numeric,
  protein_g numeric,
  carbs_g numeric,
  fat_g numeric,
  notes text,
  pinned boolean not null default false,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table food_presets enable row level security;

create policy "Users can read their own food presets"
  on food_presets for select
  using (auth.uid() = user_id);

create policy "Users can insert their own food presets"
  on food_presets for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own food presets"
  on food_presets for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own food presets"
  on food_presets for delete
  using (auth.uid() = user_id);

create index if not exists food_presets_user_normalized_name_idx
  on food_presets (user_id, normalized_name);

create index if not exists food_presets_user_archived_idx
  on food_presets (user_id, archived);

create table if not exists food_preset_variations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  preset_id uuid references food_presets(id) on delete cascade,
  name text not null,
  normalized_name text not null,
  food_type text,
  ingredients text,
  portion_label text,
  portion_amount numeric,
  portion_unit text,
  calories numeric,
  protein_g numeric,
  carbs_g numeric,
  fat_g numeric,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table food_preset_variations enable row level security;

create policy "Users can read their own food preset variations"
  on food_preset_variations for select
  using (auth.uid() = user_id);

create policy "Users can insert their own food preset variations"
  on food_preset_variations for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own food preset variations"
  on food_preset_variations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own food preset variations"
  on food_preset_variations for delete
  using (auth.uid() = user_id);

create index if not exists food_preset_variations_user_preset_idx
  on food_preset_variations (user_id, preset_id);

create index if not exists food_preset_variations_user_normalized_name_idx
  on food_preset_variations (user_id, normalized_name);
