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
      className={`group relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 transition ${
        selected
          ? "border-zinc-600 bg-zinc-800/90 text-zinc-100"
          : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/90"
      }`}
    >
      {selected ? <span className="absolute left-0 top-2.5 h-7 w-0.5 rounded bg-blue-500" /> : null}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-zinc-300 group-hover:text-zinc-100">
        <DeviceIcon kind={device.kind} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-zinc-100">{device.name}</p>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-zinc-400">
          <Signal className="h-3 w-3 text-emerald-400" />
          <span>{device.status}</span>
          <Bluetooth className="h-3 w-3" />
          <span>{device.connection}</span>
        </div>
      </div>
    </Link>
  );
}
