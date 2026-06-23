import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DbEntry = {
  id: string;
  member_id: string;
  prompt_id: string;
  body: string;
  mood: number;
  shared: boolean;
  created_at: string;
};

export type DbFeedEntry = {
  id: string;
  member_id: string;
  name: string;
  initials: string;
  bg_color: string;
  text_color: string;
  mood: number;
  body: string;
  created_at: string;
};

export async function saveEntry(entry: Omit<DbEntry, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("entries")
    .insert(entry)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getTodayFeed(): Promise<DbFeedEntry[]> {
  const { data, error } = await supabase
    .from("family_feed")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getMemberStreak(memberId: string): Promise<number> {
  const { data, error } = await supabase
    .from("entries")
    .select("created_at")
    .eq("member_id", memberId)
    .order("created_at", { ascending: false });
  if (error || !data) return 0;

  const days = new Set(
    data.map((e) => new Date(e.created_at).toLocaleDateString())
  );
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (days.has(d.toLocaleDateString())) streak++;
    else break;
  }
  return streak;
}

export async function getMemberEntryCount(memberId: string): Promise<number> {
  const { count, error } = await supabase
    .from("entries")
    .select("*", { count: "exact", head: true })
    .eq("member_id", memberId);
  if (error) return 0;
  return count ?? 0;
}
