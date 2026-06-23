import BottomNav from "@/components/BottomNav";

export default function Page() {
  return (
    <main>
      <header className="px-6 py-5 border-b border-black/10">
        <div className="text-[17px] font-medium tracking-tight">
          daily<span style={{ color: "#7F77DD" }}>human</span>
        </div>
      </header>
      <div className="px-6 py-16 text-center">
        <p className="text-[15px] text-black/40">Coming soon.</p>
      </div>
      <BottomNav />
    </main>
  );
}
