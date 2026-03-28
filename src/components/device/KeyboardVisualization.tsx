"use client";

import { DeviceZone } from "@/types/ui";

interface KeyboardVisualizationProps {
  zones: DeviceZone[];
  selectedZoneId: string;
  onSelectZone: (zoneId: string) => void;
}

const keyboardHotspots: Record<string, { shape: string; label: string }> = {
  "f-row": { shape: "left-[8%] top-[14%] h-[12%] w-[84%]", label: "Function row" },
  "num-pad": { shape: "left-[78%] top-[34%] h-[48%] w-[14%]", label: "Numpad" },
  "media-keys": { shape: "left-[8%] top-[30%] h-[12%] w-[30%]", label: "Media" },
  "arrow-cluster": { shape: "left-[60%] top-[62%] h-[22%] w-[14%]", label: "Arrows" },
  "smart-illumination": { shape: "left-[8%] top-[84%] h-[9%] w-[84%]", label: "Backlight" },
};

export function KeyboardVisualization({
  zones,
  selectedZoneId,
  onSelectZone,
}: KeyboardVisualizationProps) {
  return (
    <section className="relative h-full rounded-xl border border-white/8 bg-[radial-gradient(circle_at_55%_38%,rgba(255,255,255,0.05),transparent_50%)] p-3">
      <div className="relative mx-auto h-full max-w-205">
        <div className="stage-rise absolute left-1/2 top-1/2 h-[50%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/12 bg-[linear-gradient(180deg,#2b3039_0%,#1f242c_35%,#151921_100%)] p-3 shadow-[inset_18px_20px_30px_rgba(255,255,255,0.04),inset_-18px_-20px_30px_rgba(0,0,0,0.55),0_26px_60px_rgba(0,0,0,0.5)]">
          <div className="grid h-full grid-cols-12 gap-1 rounded-2xl border border-white/6 bg-black/25 p-2">
            {Array.from({ length: 84 }).map((_, index) => (
              <div key={index} className="rounded-md border border-white/8 bg-[#141922]" />
            ))}
          </div>
        </div>

        {zones.map((zone) => {
          const selected = selectedZoneId === zone.id;
          const hotspot = keyboardHotspots[zone.id];
          if (!hotspot) {
            return null;
          }
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onSelectZone(zone.id)}
              className={`absolute rounded-[10px] border transition ${hotspot.shape} ${
                selected
                  ? "border-accent bg-(--accent-soft) shadow-[0_0_0_1px_rgba(28,230,215,0.2)]"
                  : "border-white/25 bg-black/20 hover:border-white/45"
              }`}
            >
              <span className="absolute left-2 top-1 font-mono text-[10px] text-white/85">{hotspot.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
