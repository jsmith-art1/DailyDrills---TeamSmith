"use client";

import { useEffect, useState } from "react";
import { type Member, type MemberId } from "@/lib/data";
import { getMemberStreak, getMemberEntryCount } from "@/lib/supabase";

interface Props {
  member: Member;
  refreshKey?: number;
}

export default function StatsRow({ member, refreshKey }: Props) {
  const [streak, setStreak] = useState(member.streak);
  const [total, setTotal] = useState(member.totalEntries);

  useEffect(() => {
    getMemberStreak(member.id as MemberId).then(setStreak).catch(() => {});
    getMemberEntryCount(member.id as MemberId).then(setTotal).catch(() => {});
  }, [member.id, refreshKey]);

  const stats = [
    { num: total, label: "Total entries" },
    { num: streak, label: "Day streak" },
    { num: member.familyShares, label: "Family shares" },
  ];

  return (
    <div className="px-6 py-5">
      <p className="text-[11px] font-medium text-black/40 uppercase tracking-widest mb-3">
        Your numbers
      </p>
      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-lg p-3">
            <div className="text-[22px] font-medium text-black">{s.num}</div>
            <div className="text-[11px] text-black/50 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
