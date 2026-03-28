"use client";

interface ToggleSwitchProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function ToggleSwitch({ label, enabled, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className="flex h-12 w-full items-center justify-between rounded-[10px] border border-white/12 bg-black/30 px-4 py-2 font-mono text-[16px] text-zinc-100 transition hover:border-white/25"
    >
      <span>{label}</span>
      <span
        className={`relative h-5 w-9 rounded-full border transition ${
          enabled ? "border-accent/60 bg-accent" : "border-zinc-600 bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white transition ${
            enabled ? "left-4.5" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}
