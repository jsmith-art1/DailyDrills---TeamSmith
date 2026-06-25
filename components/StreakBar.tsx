interface Props {
  streak: number;
}

export default function StreakBar({ streak }: Props) {
  return (
    <div className="mt-3 inline-flex rounded-full bg-[#EEEDFE] px-3 py-1 text-[13px] font-medium text-[#534AB7]">
      Current streak: {streak} days
    </div>
  );
}
