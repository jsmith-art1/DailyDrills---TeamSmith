import { DAYS } from "@/lib/data";

interface Props {
  streak: number;
}

export default function StreakBar({ streak }: Props) {
  return (
    <div className="flex gap-1.5 mt-3">
      {DAYS.map((day, i) => {
        const done = i < streak - 1;
        const today = i === streak - 1;
        return (
          <div
            key={day}
            className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-medium"
            style={
              done
                ? { background: "#7F77DD", color: "#fff" }
                : today
                ? {
                    background: "#EEEDFE",
                    color: "#534AB7",
                    border: "1.5px solid #7F77DD",
                  }
                : { background: "#f2f2f2", color: "#aaa" }
            }
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
