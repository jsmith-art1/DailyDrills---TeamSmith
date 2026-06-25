"use client";

import { useState, useCallback } from "react";
import { MEMBERS, PROMPTS, type MemberId } from "@/lib/data";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import StreakBar from "@/components/StreakBar";
import MoodPicker from "@/components/MoodPicker";
import PromptCard from "@/components/PromptCard";
import InsightCard from "@/components/InsightCard";
import FamilyFeed from "@/components/FamilyFeed";
import StatsRow from "@/components/StatsRow";
import BottomNav from "@/components/BottomNav";

export default function TodayPage() {
  const [activeId, setActiveId] = useState<MemberId>("justin");
  const [mood, setMood] = useState(3);
  const [refreshKey, setRefreshKey] = useState(0);

  const member = MEMBERS.find((m) => m.id === activeId)!;
  const prompts = PROMPTS[activeId];

  const handleSaved = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <main>
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur px-6 py-5 border-b border-black/10 flex items-center justify-between gap-3">
        <div className="min-w-0 text-[16px] font-medium tracking-tight leading-tight text-black">
          Team Smith - Daily Drills
        </div>
        <div className="shrink-0 text-[12px] text-black/40 bg-black/5 px-3 py-1 rounded-full">
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
      </header>

      <ProfileSwitcher active={activeId} onChange={setActiveId} />

      <div className="px-6 py-5 border-b border-black/10">
        <h1 className="text-[21px] font-medium leading-snug mb-1">
          {member.greeting}
        </h1>
        <p className="text-[14px] text-black/50">{member.streakLine}</p>
        <StreakBar streak={member.streak} />
      </div>

      <MoodPicker selected={mood} onChange={setMood} />

      <div className="px-6 py-5 border-b border-black/10">
        <p className="text-[11px] font-medium text-black/40 uppercase tracking-widest mb-3">
          Today&apos;s prompts
        </p>
        {prompts.map((p) => (
          <PromptCard
            key={`${activeId}-${p.id}`}
            prompt={p}
            memberId={activeId}
            mood={mood}
            onSaved={handleSaved}
          />
        ))}
      </div>

      <div className="px-6 py-5 border-b border-black/10">
        <p className="text-[11px] font-medium text-black/40 uppercase tracking-widest mb-3">
          Pattern this week
        </p>
        <InsightCard text={member.insight} />
      </div>

      <FamilyFeed refreshKey={refreshKey} />

      <StatsRow member={member} refreshKey={refreshKey} />

      <BottomNav />
    </main>
  );
}
