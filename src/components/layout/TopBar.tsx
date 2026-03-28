"use client";

import { BatteryFull, Signal } from "lucide-react";

import { profileOptions } from "@/data/mockData";
import { DropdownSelect } from "@/components/ui/DropdownSelect";

interface TopBarProps {
  title: string;
  battery?: number;
  connection: string;
  profile: string;
  onProfileChange: (profile: string) => void;
}

export function TopBar({ title, battery, connection, profile, onProfileChange }: TopBarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-zinc-50">{title}</h1>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-400">
          {typeof battery === "number" ? (
            <span className="flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5">
              <BatteryFull className="h-3 w-3 text-emerald-400" />
              {battery}%
            </span>
          ) : null}
          <span className="flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5">
            <Signal className="h-3 w-3 text-emerald-400" />
            {connection}
          </span>
        </div>
      </div>
      <div className="w-full max-w-[250px]">
        <DropdownSelect
          label="Profile"
          options={profileOptions}
          value={profile}
          onChange={onProfileChange}
        />
      </div>
    </header>
  );
}
