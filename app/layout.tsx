import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Team Smith - Daily Drills",
  description: "Structured reflection for your family.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <div className="max-w-lg mx-auto min-h-screen border-x border-black/5">
          {children}
        </div>
      </body>
    </html>
  );
}
