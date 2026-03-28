"use client";

import Image from "next/image";

import { DeviceZone } from "@/types/ui";

interface MouseVisualizationProps {
  zones: DeviceZone[];
  selectedZoneId: string;
  onSelectZone: (zoneId: string) => void;
}

const pointMap: Record<string, { x: number; y: number; label: string; card: string; line: string }> = {
  "left-click": {
    x: 49,
    y: 35,
    label: "Left button",
    card: "left-[15%] top-[30%]",
    line: "left-[29%] top-[35%] h-[2px] w-[20%]",
  },
  "right-click": {
    x: 54,
    y: 30,
    label: "Right button",
    card: "left-[65%] top-[24%]",
    line: "left-[55%] top-[29%] h-[2px] w-[10%]",
  },
  "scroll-wheel": {
    x: 53,
    y: 35,
    label: "Scroll wheel",
    card: "left-[64%] top-[34%]",
    line: "left-[54%] top-[35%] h-[2px] w-[10%]",
  },
  "thumb-button": {
    x: 45,
    y: 43,
    label: "Thumb button",
    card: "left-[13%] top-[40%]",
    line: "left-[29%] top-[43%] h-[2px] w-[15%]",
  },
  "gesture-button": {
    x: 55,
    y: 46,
    label: "Gesture button",
    card: "left-[72%] top-[45%]",
    line: "left-[56%] top-[46%] h-[2px] w-[16%]",
  },
  "side-scroll": {
    x: 48,
    y: 50,
    label: "Side scroll",
    card: "left-[19%] top-[49%]",
    line: "left-[32%] top-[50%] h-[2px] w-[15%]",
  },
};

export function MouseVisualization({ zones, selectedZoneId, onSelectZone }: MouseVisualizationProps) {
  return (
    <section className="relative rounded-xl bg-[radial-gradient(circle_at_57%_52%,rgba(255,255,255,0.028),transparent_40%)] p-3">
      <div
        className="relative mx-auto w-full max-w-190"
        style={{ height: "clamp(460px, 70vh, 700px)" }}
      >
        <div
          className="stage-rise absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "clamp(320px, 46vw, 560px)",
            height: "clamp(430px, 66vh, 680px)",
          }}
        >
          <Image
            src="/Logitech-MX-4.png"
            alt="MX Master 4 mouse"
            fill
            priority
            className="object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.6)]"
            sizes="(max-width: 1200px) 28vw, 24vw"
          />
        </div>

        {zones.map((zone) => {
          const point = pointMap[zone.id];
          if (!point) {
            return null;
          }

          const selected = selectedZoneId === zone.id;
          return (
            <div key={zone.id}>
              <span className={`absolute z-20 ${point.line} bg-white/18`} />
              <button
                type="button"
                onClick={() => onSelectZone(zone.id)}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                className={`absolute z-30 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition ${
                  selected ? "border-accent bg-(--accent-soft)" : "border-white/70 bg-black/35"
                }`}
                aria-label={zone.name}
              />
              <button
                type="button"
                onClick={() => onSelectZone(zone.id)}
                className={`absolute z-30 rounded-lg border px-3 py-2 text-left font-mono text-[14px] leading-[1.1] transition ${point.card} ${
                  selected
                    ? "border-accent bg-black/55 text-zinc-100"
                    : "border-white/15 bg-black/35 text-zinc-100/95 hover:border-white/35"
                }`}
              >
                {point.label}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
