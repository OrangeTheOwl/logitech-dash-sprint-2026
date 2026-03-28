import Link from "next/link";
import { Bluetooth, Keyboard, Mouse, Plug, Signal } from "lucide-react";

import { DeviceItem } from "@/types/ui";

interface DeviceCardProps {
  device: DeviceItem;
  selected?: boolean;
}

function DeviceIcon({ kind }: { kind: DeviceItem["kind"] }) {
  if (kind === "mouse") return <Mouse className="h-4 w-4" />;
  if (kind === "keyboard") return <Keyboard className="h-4 w-4" />;
  return <Plug className="h-4 w-4" />;
}

export function DeviceCard({ device, selected = false }: DeviceCardProps) {
  return (
    <Link
      href={device.path}
      className={`group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 transition ${
        selected
          ? "border-blue-500/60 bg-blue-500/15 text-zinc-100"
          : "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800"
      }`}
    >
      <div className="rounded-lg bg-zinc-950 p-2 text-zinc-300 group-hover:text-blue-300">
        <DeviceIcon kind={device.kind} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-100">{device.name}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
          <Signal className="h-3.5 w-3.5 text-emerald-400" />
          <span>{device.status}</span>
          <Bluetooth className="h-3.5 w-3.5" />
          <span>{device.connection}</span>
        </div>
      </div>
    </Link>
  );
}
