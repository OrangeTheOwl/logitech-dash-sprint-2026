"use client";

import { Keyboard, Mouse, Plug, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { TopBar } from "@/components/layout/TopBar";
import { DeviceCard } from "@/components/layout/DeviceCard";
import { devices, profileOptions } from "@/data/mockData";

function LargeDeviceIcon({ kind }: { kind: "mouse" | "keyboard" | "receiver" }) {
  if (kind === "mouse") return <Mouse className="h-10 w-10" />;
  if (kind === "keyboard") return <Keyboard className="h-10 w-10" />;
  return <Plug className="h-10 w-10" />;
}

export default function DevicesPage() {
  const [profile, setProfile] = useState(profileOptions[0]);

  const featuredDevice = useMemo(() => devices[0], []);

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      <TopBar
        title="Devices"
        battery={featuredDevice.battery}
        connection={featuredDevice.connection}
        profile={profile}
        onProfileChange={setProfile}
      />

      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.5fr_0.9fr]">
        <section className="min-h-0 overflow-auto rounded-3xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100">Connected Devices</h2>
              <p className="text-sm text-zinc-500">Manage all devices in your Logi workspace.</p>
            </div>
            <Sparkles className="h-5 w-5 text-blue-300" />
          </div>

          <div className="space-y-3">
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} selected={device.id === featuredDevice.id} />
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Featured Device</p>
            <div className="mt-3 flex items-center gap-4">
              <div className="rounded-2xl border border-blue-500/50 bg-blue-500/15 p-4 text-blue-100">
                <LargeDeviceIcon kind={featuredDevice.kind} />
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-100">{featuredDevice.name}</p>
                <p className="text-sm text-zinc-500">Battery {featuredDevice.battery}% • {featuredDevice.connection}</p>
                <Link
                  href={featuredDevice.path}
                  className="mt-3 inline-flex rounded-xl border border-blue-500/50 bg-blue-500/20 px-3 py-2 text-sm font-medium text-blue-100 transition hover:bg-blue-500/30"
                >
                  Open Configuration
                </Link>
              </div>
            </div>
          </div>
        </section>

        <aside className="min-h-0 overflow-auto rounded-3xl border border-zinc-800 bg-zinc-950/85 p-5">
          <h3 className="text-sm uppercase tracking-[0.18em] text-zinc-500">Workspace Summary</h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3">
              <p className="text-xs text-zinc-500">Profiles Active</p>
              <p className="text-2xl font-semibold text-blue-200">3</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3">
              <p className="text-xs text-zinc-500">Smart Actions</p>
              <p className="text-2xl font-semibold text-blue-200">12</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3">
              <p className="text-xs text-zinc-500">Devices Online</p>
              <p className="text-2xl font-semibold text-blue-200">{devices.length}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
