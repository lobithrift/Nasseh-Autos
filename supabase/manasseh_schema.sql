-- HOUSE OF MANASSEH AUTOS
-- Supabase Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. VEHICLES TABLE
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  stock_number text unique not null,
  make text not null,
  model text not null,
  year integer not null,
  price numeric not null,
  mileage integer not null default 0,
  condition text not null check (condition in ('New', 'Foreign Used', 'Locally Used')),
  transmission text not null check (transmission in ('Automatic', 'Manual', 'CVT')),
  fuel_type text not null check (fuel_type in ('Petrol', 'Diesel', 'Hybrid', 'Electric')),
  body_type text not null check (body_type in ('SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Van', 'Convertible')),
  engine text not null,
  horsepower integer default 0,
  color text not null,
  location text not null default 'DSC Township, Udu, Delta State',
  status text not null default 'Available' check (status in ('Available', 'Reserved', 'Sold', 'Pending Inspection', 'Unavailable')),
  featured boolean default false,
  images text[] default '{}',
  features text[] default '{}',
  description text not null,
  vin text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. RENTALS TABLE
create table if not exists public.rentals (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  make text not null,
  model text not null,
  year integer not null,
  daily_rate numeric not null,
  weekly_rate numeric not null,
  deposit numeric not null,
  seats integer not null default 5,
  transmission text not null default 'Automatic',
  fuel_type text not null default 'Petrol',
  body_type text not null default 'SUV',
  images text[] default '{}',
  mileage_policy text default 'Unlimited within Delta State',
  availability_status text not null default 'Available' check (availability_status in ('Available', 'Reserved', 'Rented', 'Maintenance')),
  description text,
  created_at timestamptz not null default now()
);

-- 3. RENTAL BOOKINGS TABLE
create table if not exists public.rental_bookings (
  id uuid primary key default gen_random_uuid(),
  rental_vehicle_id uuid references public.rentals(id) on delete set null,
  vehicle_name text not null,
  customer_name text not null,
  email text not null,
  phone text not null,
  pickup_date date not null,
  pickup_time text not null,
  return_date date not null,
  return_time text not null,
  pickup_location text not null default 'DSC Township, Udu, Delta State',
  status text not null default 'Pending' check (status in ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

-- 4. SERVICES TABLE
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null,
  starting_price numeric not null,
  duration text not null,
  icon_name text not null default 'Wrench',
  features text[] default '{}',
  active boolean default true,
  created_at timestamptz not null default now()
);

-- 5. SERVICE BOOKINGS TABLE
create table if not exists public.service_bookings (
  id text primary key, -- e.g., HMA-SB-1001
  customer_name text not null,
  email text not null,
  phone text not null,
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_year integer not null,
  registration_number text not null,
  service_id uuid references public.services(id) on delete set null,
  service_name text not null,
  problem_description text not null,
  appointment_date date not null,
  appointment_time text not null,
  service_location text not null default 'DSC Township Service Center, Udu',
  status text not null default 'Booking Received' check (
    status in (
      'Booking Received',
      'Vehicle Checked In',
      'Inspection',
      'Estimate Prepared',
      'Awaiting Approval',
      'Repair in Progress',
      'Quality Check',
      'Ready for Collection',
      'Completed'
    )
  ),
  estimated_cost numeric,
  approved_amount numeric,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6. TEST DRIVE REQUESTS TABLE
create table if not exists public.test_drive_requests (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references public.vehicles(id) on delete cascade,
  vehicle_title text not null,
  customer_name text not null,
  email text not null,
  phone text not null,
  preferred_date date not null,
  preferred_time text not null,
  status text not null default 'Pending' check (status in ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

-- 7. FINANCING REQUESTS TABLE
create table if not exists public.financing_requests (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references public.vehicles(id) on delete set null,
  vehicle_title text,
  customer_name text not null,
  email text not null,
  phone text not null,
  vehicle_price numeric not null,
  deposit_amount numeric not null,
  loan_term_months integer not null,
  estimated_monthly_payment numeric not null,
  employment_status text not null,
  monthly_income text,
  status text not null default 'New' check (status in ('New', 'Under Review', 'Approved', 'Declined')),
  created_at timestamptz not null default now()
);

-- 8. SELL / TRADE-IN REQUESTS TABLE
create table if not exists public.sell_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text not null,
  make text not null,
  model text not null,
  year integer not null,
  mileage integer not null,
  condition text not null,
  expected_price numeric not null,
  location text not null,
  description text,
  status text not null default 'Pending Valuation' check (status in ('Pending Valuation', 'Offer Sent', 'Accepted', 'Declined')),
  created_at timestamptz not null default now()
);

-- 9. TESTIMONIALS TABLE
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  review text not null,
  rating integer not null default 5 check (rating >= 1 and rating <= 5),
  vehicle_or_service text not null,
  image_url text,
  location text default 'Delta State, Nigeria',
  published boolean default true,
  created_at timestamptz not null default now()
);

-- 10. BLOG POSTS TABLE
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  featured_image text not null,
  author text not null default 'House of Manasseh Team',
  read_time text not null default '5 min read',
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- 11. NEWSLETTER SUBSCRIBERS TABLE
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz not null default now(),
  active boolean default true
);

-- 12. CONTACT MESSAGES TABLE
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  subject text not null,
  message text not null,
  status text not null default 'Unread' check (status in ('Unread', 'Replied', 'Archived')),
  created_at timestamptz not null default now()
);

-- Indexes for performance
create index if not exists idx_vehicles_status on public.vehicles(status);
create index if not exists idx_vehicles_featured on public.vehicles(featured);
create index if not exists idx_vehicles_make_model on public.vehicles(make, model);
create index if not exists idx_service_bookings_status on public.service_bookings(status);

-- Enable RLS on all tables
alter table public.vehicles enable row level security;
alter table public.rentals enable row level security;
alter table public.rental_bookings enable row level security;
alter table public.services enable row level security;
alter table public.service_bookings enable row level security;
alter table public.test_drive_requests enable row level security;
alter table public.financing_requests enable row level security;
alter table public.sell_requests enable row level security;
alter table public.testimonials enable row level security;
alter table public.blog_posts enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;

-- Public read access policies
create policy "Public can read vehicles" on public.vehicles for select using (true);
create policy "Public can read rentals" on public.rentals for select using (true);
create policy "Public can read services" on public.services for select using (true);
create policy "Public can read testimonials" on public.testimonials for select using (published = true);
create policy "Public can read blog posts" on public.blog_posts for select using (true);

-- Public insert policies for submissions
create policy "Public can insert rental bookings" on public.rental_bookings for insert with check (true);
create policy "Public can insert service bookings" on public.service_bookings for insert with check (true);
create policy "Public can select service bookings by reference" on public.service_bookings for select using (true);
create policy "Public can insert test drive requests" on public.test_drive_requests for insert with check (true);
create policy "Public can insert financing requests" on public.financing_requests for insert with check (true);
create policy "Public can insert sell requests" on public.sell_requests for insert with check (true);
create policy "Public can insert newsletter subscribers" on public.newsletter_subscribers for insert with check (true);
create policy "Public can insert contact messages" on public.contact_messages for insert with check (true);
