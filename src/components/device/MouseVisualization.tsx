"use client";

import { DeviceZone } from "@/types/ui";

interface MouseVisualizationProps {
  zones: DeviceZone[];
  selectedZoneId: string;
  onSelectZone: (zoneId: string) => void;
}

const hotspotClasses: Record<string, string> = {
  "left-click": "left-[26%] top-[14%] h-[26%] w-[20%]",
  "right-click": "left-[54%] top-[14%] h-[26%] w-[20%]",
  "scroll-wheel": "left-[46%] top-[37%] h-[13%] w-[8%]",
  "thumb-button": "left-[16%] top-[48%] h-[14%] w-[16%]",
  "gesture-button": "left-[21%] top-[68%] h-[14%] w-[18%]",
  "side-scroll": "left-[70%] top-[58%] h-[14%] w-[10%]",
};

export function MouseVisualization({ zones, selectedZoneId, onSelectZone }: MouseVisualizationProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-black/25">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-500">Interactive Device Map</p>
      <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] rounded-[48%] border border-zinc-700 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 shadow-inner shadow-black/50">
        <div className="absolute left-1/2 top-[10%] h-[8%] w-[6%] -translate-x-1/2 rounded-full bg-zinc-700/70" />

        {zones.map((zone) => {
          const baseClass = hotspotClasses[zone.id] ?? "left-[45%] top-[45%] h-[10%] w-[10%]";
          const selected = selectedZoneId === zone.id;
          return (
            <button
              key={zone.id}
              type="button"
              title={zone.name}
              onClick={() => onSelectZone(zone.id)}
              className={`absolute rounded-xl border text-[10px] font-medium uppercase tracking-wide transition ${baseClass} ${
                selected
                  ? "border-blue-400 bg-blue-500/35 text-blue-100 shadow-lg shadow-blue-500/20"
                  : "border-zinc-600/70 bg-zinc-700/20 text-zinc-300 hover:border-blue-500/70 hover:bg-blue-500/20"
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
