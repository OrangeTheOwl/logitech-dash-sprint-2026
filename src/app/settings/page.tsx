"use client";

import { useState } from "react";

import { TopBar } from "@/components/layout/TopBar";
import { DropdownSelect } from "@/components/ui/DropdownSelect";
import { SliderControl } from "@/components/ui/SliderControl";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { profileOptions } from "@/data/mockData";

const languages = ["English", "Deutsch", "Francais", "Espanol"];

export default function SettingsPage() {
  const [profile, setProfile] = useState(profileOptions[0]);
  const [language, setLanguage] = useState(languages[0]);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [notify, setNotify] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [pollRate, setPollRate] = useState(70);

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      <TopBar
        title="App Settings"
        connection="Workspace Online"
        profile={profile}
        onProfileChange={setProfile}
      />

      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.35fr_1fr]">
        <section className="min-h-0 overflow-auto rounded-3xl border border-zinc-800 bg-zinc-900/55 p-5">
          <h2 className="text-lg font-semibold text-zinc-100">Preferences</h2>
          <p className="mt-1 text-sm text-zinc-500">Customize visual behavior and app-level settings.</p>

          <div className="mt-6 space-y-4">
            <DropdownSelect label="Language" options={languages} value={language} onChange={setLanguage} />
            <ToggleSwitch label="Automatic Updates" enabled={autoUpdate} onChange={setAutoUpdate} />
            <ToggleSwitch label="Desktop Notifications" enabled={notify} onChange={setNotify} />
            <ToggleSwitch label="Micro Animations" enabled={animations} onChange={setAnimations} />
            <SliderControl label="Input Polling Priority" value={pollRate} onChange={setPollRate} />
          </div>
        </section>

        <aside className="min-h-0 overflow-auto rounded-3xl border border-zinc-800 bg-zinc-950/85 p-5">
          <h3 className="text-sm uppercase tracking-[0.18em] text-zinc-500">System Status</h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3">
              <p className="text-xs text-zinc-500">App Version</p>
              <p className="text-lg font-semibold text-zinc-100">v0.1 Pixel Clone</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3">
              <p className="text-xs text-zinc-500">Cloud Sync</p>
              <p className="text-lg font-semibold text-emerald-300">Connected</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3">
              <p className="text-xs text-zinc-500">Device Rules</p>
              <p className="text-lg font-semibold text-blue-200">24 active</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
