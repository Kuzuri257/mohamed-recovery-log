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
