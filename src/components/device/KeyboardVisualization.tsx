"use client";

import { DeviceZone } from "@/types/ui";

interface KeyboardVisualizationProps {
  zones: DeviceZone[];
  selectedZoneId: string;
  onSelectZone: (zoneId: string) => void;
}

const keyboardHotspots: Record<string, string> = {
  "f-row": "left-[8%] top-[13%] h-[14%] w-[84%]",
  "num-pad": "left-[78%] top-[34%] h-[48%] w-[14%]",
  "media-keys": "left-[8%] top-[30%] h-[12%] w-[30%]",
  "arrow-cluster": "left-[60%] top-[62%] h-[22%] w-[14%]",
  "smart-illumination": "left-[8%] top-[84%] h-[9%] w-[84%]",
};

export function KeyboardVisualization({
  zones,
  selectedZoneId,
  onSelectZone,
}: KeyboardVisualizationProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-black/25">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-500">Interactive Device Map</p>
      <div className="relative mx-auto aspect-[16/7] w-full rounded-3xl border border-zinc-700 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 p-4 shadow-inner shadow-black/40">
        <div className="grid h-full grid-cols-12 gap-1 rounded-2xl bg-zinc-800/35 p-3">
          {Array.from({ length: 72 }).map((_, index) => (
            <div key={index} className="rounded-md border border-zinc-700/70 bg-zinc-900/60" />
          ))}
        </div>

        {zones.map((zone) => {
          const selected = selectedZoneId === zone.id;
          const hotspotClass = keyboardHotspots[zone.id] ?? "left-[45%] top-[45%] h-[10%] w-[10%]";
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onSelectZone(zone.id)}
              className={`absolute rounded-xl border transition ${hotspotClass} ${
                selected
                  ? "border-blue-400 bg-blue-500/30 shadow-lg shadow-blue-500/20"
                  : "border-zinc-600/70 bg-zinc-700/20 hover:border-blue-500/70 hover:bg-blue-500/20"
              }`}
            >
              <span className="sr-only">{zone.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
