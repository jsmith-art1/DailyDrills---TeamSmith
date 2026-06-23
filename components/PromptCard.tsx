"use client";

import { useState } from "react";
import { type Prompt, type MemberId } from "@/lib/data";
import { saveEntry } from "@/lib/supabase";

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  purple: { bg: "#EEEDFE", color: "#3C3489" },
  teal:   { bg: "#E1F5EE", color: "#085041" },
  amber:  { bg: "#FAEEDA", color: "#633806" },
};

interface Props {
  prompt: Prompt;
  memberId: MemberId;
  mood: number;
  onSaved?: () => void;
}

export default function PromptCard({ prompt, memberId, mood, onSaved }: Props) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const tag = TAG_STYLES[prompt.tagColor] ?? TAG_STYLES.purple;

  const handleSave = async () => {
    if (!value.trim() || status === "saving") return;
    setStatus("saving");
    try {
      await saveEntry({
        member_id: memberId,
        prompt_id: prompt.id,
        body: value.trim(),
        mood,
        shared: prompt.shared,
      });
      setStatus("saved");
      onSaved?.();
      setTimeout(() => setStatus("idle"), 2500);
    } catch (e) {
      console.error(e);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const btnStyle =
    status === "saved"
      ? { borderColor: "#0F6E56", color: "#085041", background: "#E1F5EE" }
      : status === "error"
      ? { borderColor: "#E24B4A", color: "#A32D2D", background: "#FCEBEB" }
      : { borderColor: "rgba(0,0,0,0.12)", color: "#0a0a0a", background: "white" };

  const btnLabel =
    status === "saving" ? "Saving..." :
    status === "saved"  ? "✓ Saved" :
    status === "error"  ? "Error — try again" :
    "Save";

  return (
    <div className="bg-white border border-black/10 rounded-xl p-5 mb-3">
      <div
        className="inline-block text-[10px] font-medium px-2.5 py-1 rounded-full mb-2.5"
        style={{ background: tag.bg, color: tag.color }}
      >
        {prompt.label}
        {prompt.shared && <span className="opacity-60"> · shared with family</span>}
      </div>
      <p className="text-[15px] font-medium text-black leading-snug mb-2.5">
        {prompt.question}
      </p>
      <textarea
        rows={prompt.rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={status === "saved"}
        placeholder={prompt.shared ? "This goes to the family feed..." : "Write anything..."}
        className="w-full border border-black/10 rounded-lg px-3 py-2.5 text-[14px] text-black bg-gray-50 resize-none leading-relaxed placeholder:text-black/30 focus:outline-none focus:border-[#AFA9EC] disabled:opacity-50"
      />
      <button
        onClick={handleSave}
        disabled={!value.trim() || status === "saving" || status === "saved"}
        className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-[13px] font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={btnStyle}
      >
        {btnLabel}
      </button>
    </div>
  );
}
