"use client";

import { useMemo, useState } from "react";

import { ControlPanel } from "@/components/device/ControlPanel";
import { KeyboardVisualization } from "@/components/device/KeyboardVisualization";
import { TopBar } from "@/components/layout/TopBar";
import { devices, keyboardZones, profileOptions } from "@/data/mockData";

const keyboardDevice = devices.find((device) => device.kind === "keyboard");

export default function KeyboardPage() {
  const [profile, setProfile] = useState(profileOptions[1] ?? "Default");
  const [selectedZoneId, setSelectedZoneId] = useState("f-row");
  const [state, setState] = useState({
    action: "Keystroke",
    gestureEnabled: false,
    smartActionsEnabled: true,
    sensitivity: 52,
  });

  const selectedLabel = useMemo(() => {
    return keyboardZones.find((zone) => zone.id === selectedZoneId)?.name ?? "Section";
  }, [selectedZoneId]);

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      <TopBar
        title={keyboardDevice?.name ?? "Keyboard"}
        battery={keyboardDevice?.battery}
        connection={keyboardDevice?.connection ?? "Logi Bolt"}
        profile={profile}
        onProfileChange={setProfile}
      />

      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[1.65fr_0.8fr]">
        <section className="min-h-0 overflow-auto rounded-3xl border border-zinc-800 bg-zinc-900/55 p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-zinc-100">MX Mechanical Mapping</h2>
            <p className="text-sm text-zinc-500">Select keyboard regions to configure actions and behavior profiles.</p>
          </div>
          <KeyboardVisualization
            zones={keyboardZones}
            selectedZoneId={selectedZoneId}
            onSelectZone={setSelectedZoneId}
          />
          <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-400">
            Selected area: <span className="font-medium text-blue-200">{selectedLabel}</span>
          </div>
        </section>

        <ControlPanel
          zones={keyboardZones}
          selectedZoneId={selectedZoneId}
          state={state}
          onStateChange={setState}
        />
      </div>
    </div>
  );
}
