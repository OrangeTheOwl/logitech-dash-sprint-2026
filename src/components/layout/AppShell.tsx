import { ReactNode } from "react";

import { Sidebar } from "@/components/layout/Sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-5 text-zinc-100 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.06),transparent_35%)]" />
      <div className="relative mx-auto flex h-[calc(100vh-2.5rem)] w-full max-w-[1680px] gap-4">
        <Sidebar />
        <main className="flex-1 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60 p-4 shadow-2xl shadow-black/40 backdrop-blur-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
