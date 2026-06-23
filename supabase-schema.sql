-- Members table
create table members (
  id text primary key,         -- 'justin' | 'mom' | 'parker'
  name text not null,
  initials text not null,
  color text not null,
  bg_color text not null,
  text_color text not null
);

insert into members (id, name, initials, color, bg_color, text_color) values
  ('justin', 'Justin', 'J', '#7F77DD', '#EEEDFE', '#3C3489'),
  ('mom',    'Mom',    'M', '#1D9E75', '#E1F5EE', '#085041'),
  ('parker', 'Parker', 'P', '#BA7517', '#FAEEDA', '#633806');

-- Daily entries (private per member)
create table entries (
  id uuid primary key default gen_random_uuid(),
  member_id text references members(id),
  prompt_id text not null,
  body text not null,
  mood int not null default 3,  -- 0-4 index
  shared boolean not null default false,
  created_at timestamptz not null default now()
);

-- Index for fast daily queries
create index entries_member_date on entries (member_id, created_at);

-- View: today's shared entries for the family feed
create view family_feed as
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
