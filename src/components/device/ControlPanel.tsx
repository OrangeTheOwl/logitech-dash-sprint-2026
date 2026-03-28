"use client";

import { RotateCcw, SlidersHorizontal, Sparkles, WandSparkles } from "lucide-react";

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
    <aside className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/85 p-4 shadow-2xl shadow-black/30">
      <div className="mb-3 flex items-center justify-between text-zinc-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-zinc-300" />
          <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Configuration</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="grid h-7 w-7 place-items-center rounded-md border border-zinc-700 bg-zinc-800 text-zinc-300 transition hover:text-zinc-100"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="grid h-7 w-7 place-items-center rounded-md border border-zinc-700 bg-zinc-800 text-zinc-300 transition hover:text-zinc-100"
          >
            <WandSparkles className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="grid h-7 w-7 place-items-center rounded-md border border-zinc-700 bg-zinc-800 text-zinc-300 transition hover:text-zinc-100"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <h2 className="text-base font-semibold text-zinc-100">{selectedZone?.name ?? "No Selection"}</h2>
      <p className="mt-1 text-xs text-zinc-500">{selectedZone?.description ?? "Select a device button."}</p>

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
