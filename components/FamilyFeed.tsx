"use client";

import { useEffect, useState, useCallback } from "react";
import { getTodayFeed, type DbFeedEntry } from "@/lib/supabase";
import { MOODS } from "@/lib/data";

interface Props {
  refreshKey?: number;
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function FamilyFeed({ refreshKey }: Props) {
  const [entries, setEntries] = useState<DbFeedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTodayFeed();
      setEntries(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load, refreshKey]);

  return (
    <div className="px-6 py-5 border-b border-black/10">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-medium text-black/40 uppercase tracking-widest">
          Family feed — today
        </p>
        <button
          onClick={load}
          className="text-[11px] text-black/30 hover:text-black/60 transition-colors"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-[13px] text-black/30 py-4">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-[13px] text-black/30 py-4">
          No family shares yet today. Be the first.
        </p>
      ) : (
        <div>
          {entries.map((entry, i) => (
            <div
              key={entry.id}
              className="flex gap-2.5 py-3"
              style={{
                borderBottom: i < entries.length - 1 ? "0.5px solid rgba(0,0,0,0.08)" : "none",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium flex-shrink-0 mt-0.5"
                style={{ background: entry.bg_color, color: entry.text_color }}
              >
                {entry.initials}
              </div>
              <div>
                <p className="text-[12px] text-black/50 mb-0.5">
                  <strong className="text-black font-medium">{entry.name}</strong>{" "}
                  · {timeAgo(entry.created_at)} · {MOODS[entry.mood]?.emoji} {MOODS[entry.mood]?.label}
                </p>
                <p className="text-[14px] text-black leading-snug">
                  &ldquo;{entry.body}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
