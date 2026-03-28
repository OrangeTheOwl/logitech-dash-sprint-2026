import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden p-2 text-zinc-100 sm:p-3">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(38,210,202,0.09),transparent_38%)]" />
      <div className="relative mx-auto h-[calc(100vh-1rem)] w-full max-w-430 overflow-hidden rounded-[20px] border border-white/10 bg-[#101215] shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:h-[calc(100vh-1.5rem)]">
        <main className="h-full overflow-hidden bg-[linear-gradient(180deg,#121418_0%,#0f1114_100%)]">
          {children}
        </main>
      </div>
    </div>
  );
}
