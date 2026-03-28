"use client";

import { useMemo, useState } from "react";

import { ControlPanel } from "@/components/device/ControlPanel";
import { MouseVisualization } from "@/components/device/MouseVisualization";
import { TopBar } from "@/components/layout/TopBar";
import { devices, mouseZones, profileOptions } from "@/data/mockData";

const mouseDevice = devices.find((device) => device.kind === "mouse");

export default function MousePage() {
  const [profile, setProfile] = useState(profileOptions[0]);
  const [selectedZoneId, setSelectedZoneId] = useState("thumb-button");
  const [state, setState] = useState({
    action: "Gesture",
    gestureEnabled: true,
    smartActionsEnabled: true,
    sensitivity: 65,
  });

  const selectedLabel = useMemo(() => {
    return mouseZones.find((zone) => zone.id === selectedZoneId)?.name ?? "Button";
  }, [selectedZoneId]);

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      <TopBar
        title={mouseDevice?.name ?? "Mouse"}
        battery={mouseDevice?.battery}
        connection={mouseDevice?.connection ?? "Bluetooth"}
        profile={profile}
        onProfileChange={setProfile}
      />

      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[1.65fr_0.8fr]">
        <section className="min-h-0 overflow-auto rounded-3xl border border-zinc-800 bg-zinc-900/55 p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-zinc-100">MX Master 3S Mapping</h2>
            <p className="text-sm text-zinc-500">Click any hotspot on the mouse to remap and tune behavior.</p>
          </div>
          <MouseVisualization
            zones={mouseZones}
            selectedZoneId={selectedZoneId}
            onSelectZone={setSelectedZoneId}
          />
          <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-400">
            Selected control: <span className="font-medium text-blue-200">{selectedLabel}</span>
          </div>
        </section>

        <ControlPanel
          zones={mouseZones}
          selectedZoneId={selectedZoneId}
          state={state}
          onStateChange={setState}
        />
      </div>
    </div>
  );
}
