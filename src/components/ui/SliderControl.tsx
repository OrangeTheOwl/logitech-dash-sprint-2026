"use client";

interface SliderControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function SliderControl({ label, value, onChange, min = 0, max = 100 }: SliderControlProps) {
  return (
    <div className="space-y-2 rounded-[10px] border border-white/12 bg-black/30 px-4 py-4">
      <div className="flex items-center justify-between font-mono text-[16px] text-zinc-100">
        <span>{label}</span>
        <span className="font-semibold text-accent">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-700 accent-accent"
      />
      <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
