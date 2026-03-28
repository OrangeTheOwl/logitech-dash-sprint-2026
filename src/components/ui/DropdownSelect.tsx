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
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-sm text-zinc-100 transition hover:border-blue-500/60 hover:bg-zinc-800"
        >
          <span>{activeLabel}</span>
          <ChevronDown className={`h-4 w-4 text-zinc-500 transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open ? (
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/40">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm transition hover:bg-blue-500/15 ${
                  option === value ? "bg-blue-500/20 text-blue-200" : "text-zinc-200"
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
