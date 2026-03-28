"use client";

import { ArrowLeft, BatteryFull, Bluetooth, Cog, Grid2x2, Mouse, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { MouseVisualization } from "@/components/device/MouseVisualization";
import { devices, mouseZones } from "@/data/mockData";

const mouseDevice = devices.find((device) => device.kind === "mouse");

export default function MousePage() {
  const [selectedZoneId, setSelectedZoneId] = useState("thumb-button");

  return (
    <div className="screen-enter flex h-full flex-col overflow-hidden px-5 pb-6 pt-4 sm:px-7">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/devices" transitionTypes={["screen-shift"]} className="rounded-full p-1 text-zinc-300 transition hover:text-white">
            <ArrowLeft className="h-7 w-7" />
          </Link>
          <h1 className="font-mono text-[34px] font-semibold tracking-tight text-zinc-50">{mouseDevice?.name ?? "MX Master 3S"}</h1>
        </div>

        <div className="flex items-center gap-5">
          <button type="button" className="relative text-accent">
            <Grid2x2 className="h-6 w-6" />
            <span className="absolute -bottom-3 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded bg-accent" />
          </button>

          <span className="h-9 w-px bg-white/20" />

          <button
            type="button"
            className="flex items-center gap-2 font-mono text-[18px] font-medium tracking-wide text-zinc-100 transition hover:text-accent"
          >
            <Plus className="h-4 w-4" />
            ADD APPLICATION
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[220px_1fr] gap-6 pt-5">
        <aside className="flex h-full flex-col px-3 py-4">
          <div className="flex flex-1 items-center">
            <div className="w-full space-y-3">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-left font-mono text-[16px] font-semibold tracking-wide text-[#081112]"
              >
                <Grid2x2 className="h-4 w-4" />
                BUTTONS
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-2 py-2 text-left font-mono text-[16px] font-medium tracking-wide text-zinc-100"
              >
                <Mouse className="h-4 w-4 text-zinc-200" />
                POINT AND SCROLL
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-2 py-2 text-left font-mono text-[16px] font-medium tracking-wide text-zinc-100"
              >
                <Sparkles className="h-4 w-4 text-zinc-200" />
                FLOW
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-2 py-2 text-left font-mono text-[16px] font-medium tracking-wide text-zinc-100"
              >
                <Cog className="h-4 w-4 text-zinc-200" />
                SETTINGS
              </button>
            </div>
          </div>

          <div className="pt-8">
            <div className="inline-flex items-center gap-3 rounded-md border border-white/15 bg-[#050608] px-4 py-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
              <BatteryFull className="h-4 w-4 text-lime-400" strokeWidth={2.2} />
              <Bluetooth className="h-4 w-4 text-zinc-100" strokeWidth={2.2} />
            </div>
          </div>
        </aside>

        <section className="min-h-0 overflow-auto p-3">
          <div className="min-h-120">
            <MouseVisualization
              zones={mouseZones}
              selectedZoneId={selectedZoneId}
              onSelectZone={setSelectedZoneId}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
