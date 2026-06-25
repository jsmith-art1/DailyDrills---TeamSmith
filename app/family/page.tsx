import BottomNav from "@/components/BottomNav";

export default function Page() {
  return (
    <main>
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur px-6 py-5 border-b border-black/10">
        <div className="text-[16px] font-medium tracking-tight leading-tight text-black">
          Team Smith - Daily Drills
        </div>
      </header>
      <div className="px-6 py-16 text-center">
        <p className="text-[15px] text-black/40">Coming soon.</p>
      </div>
      <BottomNav />
    </main>
  );
}
