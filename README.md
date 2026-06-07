# RecoveryLog

Mobile-first recovery tracker for iPhone and iPad.

## Supabase Setup

Project: `mohamed-recovery-log`
Reference: `kgikyyxreydsukagcsmc`
Region: `eu-central-1`

The database migration has been applied through Supabase CLI:

- `supabase/migrations/20260607170500_recovery_entries.sql`

The app is configured through `supabase-config.js` with the project's public publishable key. If you deploy through the existing `/api/config` endpoint instead, set:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

The app still works in local-only mode when Supabase is not configured.
