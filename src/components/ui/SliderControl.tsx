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
    <div className="space-y-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 py-3">
      <div className="flex items-center justify-between text-sm text-zinc-200">
        <span>{label}</span>
        <span className="font-medium text-blue-300">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700 accent-blue-500"
      />
    </div>
  );
}
