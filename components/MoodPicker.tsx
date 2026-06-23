"use client";

import { MOODS } from "@/lib/data";

interface Props {
  selected: number;
  onChange: (i: number) => void;
}

export default function MoodPicker({ selected, onChange }: Props) {
  return (
    <div className="px-6 py-5 border-b border-black/10">
      <p className="text-[11px] font-medium text-black/40 uppercase tracking-widest mb-3">
        How are you right now?
      </p>
      <div className="flex gap-2">
        {MOODS.map((m, i) => (
          <button
            key={m.label}
            onClick={() => onChange(i)}
            className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-lg border text-[19px] transition-all"
            style={
              selected === i
                ? {
                    borderColor: "#7F77DD",
                    background: "#EEEDFE",
                  }
                : {
                    borderColor: "rgba(0,0,0,0.1)",
                    background: "white",
                  }
            }
          >
            {m.emoji}
            <span
              className="text-[10px]"
              style={{ color: selected === i ? "#534AB7" : "#888" }}
            >
              {m.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
