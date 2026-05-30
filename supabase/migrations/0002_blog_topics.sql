-- Cuotia · Backlog de temas para el generador de posts (4-5/semana).
-- Ejecutar en el SQL editor del proyecto Supabase de Cuotia. Additivo.
-- El sistema se auto-siembra desde src/lib/generation/topics.ts si la tabla está vacía.

create table if not exists public.blog_topics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  target_keyword text,
  angle text,
  internal_link text,
  category text,
  season_month int not null default 0,          -- 0 = atemporal; 1-12 = mes de mayor relevancia
  priority int not null default 3,              -- 1 (baja) a 5 (alta)
  status text not null default 'pending' check (status in ('pending', 'used', 'skip')),
  slug text,                                    -- slug del post generado al usarse
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists blog_topics_status_idx on public.blog_topics (status, priority desc);

-- Solo el service_role (servidor) accede; sin lectura pública.
alter table public.blog_topics enable row level security;
