-- Members table
create table if not exists members (
  id text primary key,         -- 'justin' | 'shelby' | 'parker'
  name text not null,
  initials text not null,
  color text not null,
  bg_color text not null,
  text_color text not null
);

insert into members (id, name, initials, color, bg_color, text_color) values
  ('justin', 'Justin', 'J', '#7F77DD', '#EEEDFE', '#3C3489'),
  ('shelby', 'Shelby', 'S', '#1D9E75', '#E1F5EE', '#085041'),
  ('parker', 'Parker', 'P', '#BA7517', '#FAEEDA', '#633806')
on conflict (id) do update set
  name = excluded.name,
  initials = excluded.initials,
  color = excluded.color,
  bg_color = excluded.bg_color,
  text_color = excluded.text_color;

-- Daily entries (private per member)
create table if not exists entries (
  id uuid primary key default gen_random_uuid(),
  member_id text references members(id),
  prompt_id text not null,
  body text not null,
  mood int not null default 3,  -- 0-4 index
  shared boolean not null default false,
  created_at timestamptz not null default now()
);

-- Index for fast daily queries
create index if not exists entries_member_date on entries (member_id, created_at);

update entries set member_id = 'shelby' where member_id = 'mom';
delete from members where id = 'mom';

-- App access policies for the public anon key used by this family app
alter table members enable row level security;
alter table entries enable row level security;

drop policy if exists "Members are readable" on members;
create policy "Members are readable"
  on members for select
  using (true);

drop policy if exists "Entries are readable" on entries;
create policy "Entries are readable"
  on entries for select
  using (true);

drop policy if exists "Entries can be created" on entries;
create policy "Entries can be created"
  on entries for insert
  with check (member_id in ('justin', 'shelby', 'parker'));

grant usage on schema public to anon, authenticated;
grant select on members to anon, authenticated;
grant select, insert on entries to anon, authenticated;

-- View: today's shared entries for the family feed
create or replace view family_feed as
select
  e.id,
  e.member_id,
  m.name,
  m.initials,
  m.bg_color,
  m.text_color,
  e.mood,
  e.body,
  e.created_at
from entries e
join members m on m.id = e.member_id
where e.shared = true
  and e.created_at >= current_date
order by e.created_at desc;

grant select on family_feed to anon, authenticated;
