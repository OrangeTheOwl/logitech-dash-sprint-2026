"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cog, Plus, Sparkles } from "lucide-react";

import { devices } from "@/data/mockData";
import { DeviceCard } from "@/components/layout/DeviceCard";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[286px] flex-col rounded-[20px] border border-zinc-800 bg-zinc-950/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2">
        <div className="grid h-8 w-8 place-content-center rounded-md bg-gradient-to-b from-blue-500 to-blue-600 text-zinc-100">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[13px] font-semibold tracking-wide text-zinc-100">logi options+</p>
          <p className="text-[11px] text-zinc-500">Configuration</p>
        </div>
      </div>

      <div className="space-y-2 overflow-y-auto pr-1">
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
        className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-[13px] font-medium text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-700"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Device
      </button>

      <div className="mt-auto pt-3">
        <Link
          href="/settings"
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] transition ${
            pathname === "/settings"
              ? "border-zinc-600 bg-zinc-800 text-zinc-100"
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
