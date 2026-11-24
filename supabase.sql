-- وردة (0) - شغّل الملف ده كله مرة واحدة في Supabase > SQL Editor.
-- بيعمل جدولين بس: حد الاستخدام (ask_log) ومزامنة بيانات الطالب (user_data). كله محمي بـRLS.

create table if not exists public.ask_log (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists ask_log_user_time on public.ask_log(user_id, created_at desc);
alter table public.ask_log enable row level security;
drop policy if exists "ask_log own select" on public.ask_log;
create policy "ask_log own select" on public.ask_log for select to authenticated using (user_id = auth.uid());
drop policy if exists "ask_log own insert" on public.ask_log;
create policy "ask_log own insert" on public.ask_log for insert to authenticated with check (user_id = auth.uid());

create table if not exists public.user_data (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.user_data enable row level security;
drop policy if exists "user_data own" on public.user_data;
create policy "user_data own" on public.user_data for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- تنضيف سجل الاستخدام الأقدم من يومين (اختياري، شغّله من وقت للتاني)
-- delete from public.ask_log where created_at < now() - interval '2 days';

-- (اختياري) تقييد التسجيل بإيميل الجامعة فقط — فُك التعليق وغيّر الدومين:
-- create or replace function public.restrict_signup_domain()
-- returns trigger language plpgsql security definer set search_path = public
-- as $$ begin
--   if new.email is null or lower(new.email) not like '%@your-university-domain.edu.eg' then
--     raise exception 'التسجيل متاح بإيميل الجامعة فقط';
--   end if;
--   return new;
-- end; $$;
-- drop trigger if exists restrict_signup on auth.users;
-- create trigger restrict_signup before insert on auth.users
--   for each row execute procedure public.restrict_signup_domain();
