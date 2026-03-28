"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

interface DropdownSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function DropdownSelect({ label, options, value, onChange }: DropdownSelectProps) {
  const [open, setOpen] = useState(false);

  const activeLabel = useMemo(() => {
    return options.find((option) => option === value) ?? options[0] ?? "Select";
  }, [options, value]);

  return (
    <div className="space-y-2">
      <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-zinc-500">{label}</p>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex h-12 w-full items-center justify-between rounded-[10px] border border-white/12 bg-black/30 px-4 py-2 font-mono text-[16px] text-zinc-100 transition hover:border-white/25"
        >
          <span>{activeLabel}</span>
          <ChevronDown className={`h-4 w-4 text-zinc-400 transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open ? (
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-[10px] border border-white/15 bg-[#0d1016] shadow-xl shadow-black/50">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2 text-left font-mono text-[15px] transition hover:bg-white/6 ${
                  option === value ? "bg-white/7 text-accent" : "text-zinc-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
