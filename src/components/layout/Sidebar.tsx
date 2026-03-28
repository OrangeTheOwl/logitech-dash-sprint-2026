"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cog, Plus, Sparkles } from "lucide-react";

import { devices } from "@/data/mockData";
import { DeviceCard } from "@/components/layout/DeviceCard";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[280px] flex-col rounded-3xl border border-zinc-800 bg-zinc-950/90 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-2">
        <div className="grid h-9 w-9 place-content-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-zinc-950">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-zinc-100">LogiFlow</p>
          <p className="text-xs text-zinc-500">Options+ Clone</p>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto pr-1">
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            selected={pathname === device.path || (pathname === "/devices" && device.kind === "mouse")}
          />
        ))}
      </div>

      <button
        type="button"
        className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-blue-500/50 bg-blue-500/20 px-4 py-3 text-sm font-medium text-blue-100 transition hover:bg-blue-500/30"
      >
        <Plus className="h-4 w-4" />
        Add Device
      </button>

      <div className="mt-auto pt-4">
        <Link
          href="/settings"
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
            pathname === "/settings"
              ? "border-blue-500/60 bg-blue-500/20 text-blue-100"
              : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700"
          }`}
        >
          <Cog className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
