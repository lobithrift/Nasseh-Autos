-- SWII Support Requests Database Schema

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  subject text not null,
  complaint text not null,
  category text,
  urgency text check (urgency in ('Low', 'Medium', 'High', 'Critical')),
  summary text,
  ai_response text,
  status text not null default 'Pending' check (status in ('Pending', 'AI Responded', 'Resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for searching and filtering
create index if not exists idx_support_requests_status on public.support_requests (status);
create index if not exists idx_support_requests_created_at on public.support_requests (created_at desc);

-- Enable Row Level Security
alter table public.support_requests enable row level security;

-- Allow public access for insertion, selection, and update
create policy "Allow public insert to support_requests" 
  on public.support_requests 
  for insert 
  with check (true);

create policy "Allow public select from support_requests" 
  on public.support_requests 
  for select 
  using (true);

create policy "Allow public update to support_requests" 
  on public.support_requests 
  for update 
  using (true);
