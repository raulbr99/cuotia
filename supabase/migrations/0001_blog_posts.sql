-- Cuotia · Sistema de posts auto-generados
-- Ejecutar en el SQL editor del proyecto Supabase de Cuotia (pzcqlufyyixssgrstcgz).
-- Es additivo: crea una tabla nueva + un bucket. No toca nada existente.

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  content text not null,                       -- markdown (mismo formato que los posts curados en src/lib/blog.ts)
  category text not null default 'Noticias',
  tag text not null default 'Actualidad',
  image_url text,
  date_published date not null default current_date,
  date_modified date,
  status text not null default 'published' check (status in ('published', 'draft')),
  source_urls jsonb not null default '[]'::jsonb,
  model text,
  qa_score int,
  created_at timestamptz not null default now()
);

create index if not exists blog_posts_status_date_idx
  on public.blog_posts (status, date_published desc);

alter table public.blog_posts enable row level security;

-- Lectura pública solo de publicados (para la publishable/anon key).
-- El service_role key (servidor) ignora RLS: puede leer todo e insertar.
drop policy if exists "blog_posts public read published" on public.blog_posts;
create policy "blog_posts public read published"
  on public.blog_posts for select
  using (status = 'published');

-- Bucket público para las portadas generadas con OpenRouter.
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Lectura pública de las imágenes del bucket.
drop policy if exists "blog-images public read" on storage.objects;
create policy "blog-images public read"
  on storage.objects for select
  using (bucket_id = 'blog-images');
