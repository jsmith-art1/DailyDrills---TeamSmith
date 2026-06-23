interface Props {
  text: string;
}

export default function InsightCard({ text }: Props) {
  return (
    <div
      className="rounded-xl p-4 mb-3 border"
      style={{ background: "#EEEDFE", borderColor: "#AFA9EC" }}
    >
      <p
        className="text-[10px] font-medium uppercase tracking-widest mb-1.5"
        style={{ color: "#534AB7" }}
      >
        Noticed
      </p>
      <p className="text-[14px] leading-relaxed" style={{ color: "#26215C" }}>
        {text}
      </p>
    </div>
  );
}
