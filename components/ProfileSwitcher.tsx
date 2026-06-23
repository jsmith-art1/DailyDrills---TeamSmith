"use client";

import { MEMBERS, type Member, type MemberId } from "@/lib/data";

interface Props {
  active: MemberId;
  onChange: (id: MemberId) => void;
}

export default function ProfileSwitcher({ active, onChange }: Props) {
  return (
    <div className="px-6 py-5 border-b border-black/10">
      <p className="text-[11px] font-medium text-black/40 uppercase tracking-widest mb-3">
        Who&apos;s reflecting?
      </p>
      <div className="flex gap-4 items-end">
        {MEMBERS.map((m: Member) => (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-[15px] font-medium transition-all"
              style={{
                background: m.bgColor,
                color: m.textColor,
                border: `2px solid ${active === m.id ? m.color : "transparent"}`,
                transform: active === m.id ? "scale(1.05)" : "scale(1)",
              }}
            >
              {m.initials}
            </div>
            <span
              className="text-[11px] transition-colors"
              style={{
                color: active === m.id ? "#0a0a0a" : "#888",
                fontWeight: active === m.id ? 500 : 400,
              }}
            >
              {m.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
