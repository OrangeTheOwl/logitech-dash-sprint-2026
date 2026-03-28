"use client";

import { SlidersHorizontal } from "lucide-react";

import { actionOptions } from "@/data/mockData";
import { DeviceZone } from "@/types/ui";
import { DropdownSelect } from "@/components/ui/DropdownSelect";
import { SliderControl } from "@/components/ui/SliderControl";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";

interface ControlPanelState {
  action: string;
  gestureEnabled: boolean;
  smartActionsEnabled: boolean;
  sensitivity: number;
}

interface ControlPanelProps {
  zones: DeviceZone[];
  selectedZoneId: string;
  state: ControlPanelState;
  onStateChange: (state: ControlPanelState) => void;
}

export function ControlPanel({ zones, selectedZoneId, state, onStateChange }: ControlPanelProps) {
  const selectedZone = zones.find((zone) => zone.id === selectedZoneId) ?? zones[0];

  return (
    <aside className="h-full rounded-3xl border border-zinc-800 bg-zinc-950/85 p-4 shadow-2xl shadow-black/30">
      <div className="mb-4 flex items-center gap-2 text-zinc-200">
        <SlidersHorizontal className="h-4 w-4 text-blue-300" />
        <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">Configuration</p>
      </div>
      <h2 className="text-lg font-semibold text-zinc-100">{selectedZone?.name ?? "No Selection"}</h2>
      <p className="mt-1 text-sm text-zinc-500">{selectedZone?.description ?? "Select a device button."}</p>

      <div className="mt-6 space-y-4">
        <DropdownSelect
          label="Assigned Action"
          options={actionOptions}
          value={state.action}
          onChange={(value) => onStateChange({ ...state, action: value })}
        />
        <ToggleSwitch
          label="Gesture"
          enabled={state.gestureEnabled}
          onChange={(enabled) => onStateChange({ ...state, gestureEnabled: enabled })}
        />
        <ToggleSwitch
          label="Smart Actions"
          enabled={state.smartActionsEnabled}
          onChange={(enabled) => onStateChange({ ...state, smartActionsEnabled: enabled })}
        />
        <SliderControl
          label="Sensitivity"
          value={state.sensitivity}
          onChange={(value) => onStateChange({ ...state, sensitivity: value })}
        />
      </div>
    </aside>
  );
}
