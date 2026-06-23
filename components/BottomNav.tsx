"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Today", href: "/", icon: "⌂" },
  { label: "Family", href: "/family", icon: "◎" },
  { label: "Patterns", href: "/patterns", icon: "↗" },
  { label: "History", href: "/history", icon: "≡" },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav className="flex border-t border-black/10 mt-6">
      {NAV.map((item) => {
        const active = path === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center py-2.5 gap-1 text-[10px] transition-colors"
            style={{ color: active ? "#7F77DD" : "#aaa" }}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
