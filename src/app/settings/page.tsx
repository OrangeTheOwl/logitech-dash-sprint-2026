"use client";

import { ArrowLeft, Bell, Languages, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
    <div className="screen-enter flex h-full flex-col overflow-hidden px-6 pb-7 pt-5 sm:px-8">
      <header className="flex items-center gap-3">
        <Link href="/devices" transitionTypes={["screen-shift"]} className="rounded-full p-1 text-zinc-300 transition hover:text-white">
          <ArrowLeft className="h-7 w-7" />
        </Link>
        <h1 className="font-mono text-[44px] font-semibold tracking-tight text-zinc-50">Settings</h1>
      </header>

      <div className="grid min-h-0 flex-1 gap-7 pt-7 lg:grid-cols-[1.1fr_0.8fr]">
        <section className="min-h-0 overflow-auto rounded-2xl border border-white/10 bg-[#111419] p-6">
          <h2 className="font-mono text-[30px] font-semibold tracking-tight text-zinc-100">Preferences</h2>
          <p className="mt-1 font-mono text-[15px] text-zinc-500">Customize your Options+ desktop experience.</p>

          <div className="mt-7 space-y-5">
            <DropdownSelect label="Profile" options={profileOptions} value={profile} onChange={setProfile} />
            <DropdownSelect label="Language" options={languages} value={language} onChange={setLanguage} />
            <ToggleSwitch label="Automatic Updates" enabled={autoUpdate} onChange={setAutoUpdate} />
            <ToggleSwitch label="Desktop Notifications" enabled={notify} onChange={setNotify} />
            <ToggleSwitch label="Micro Animations" enabled={animations} onChange={setAnimations} />
            <SliderControl label="Input Polling Priority" value={pollRate} onChange={setPollRate} />
          </div>
        </section>

        <aside className="min-h-0 overflow-auto rounded-2xl border border-white/10 bg-[#111419] p-6">
          <h3 className="font-mono text-[16px] tracking-[0.12em] text-zinc-500">SYSTEM STATUS</h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-[12px] uppercase tracking-[0.12em] text-zinc-500">App Version</p>
              <p className="mt-1 font-mono text-[26px] font-semibold text-zinc-100">v0.1 Clone</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-[12px] uppercase tracking-[0.12em] text-zinc-500">Cloud Sync</p>
              <p className="mt-1 font-mono text-[26px] font-semibold text-accent">Connected</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-[12px] uppercase tracking-[0.12em] text-zinc-500">Device Rules</p>
              <p className="mt-1 font-mono text-[26px] font-semibold text-zinc-100">24 active</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-zinc-400">
            <div className="grid place-items-center rounded-[10px] border border-white/10 bg-black/25 p-4">
              <Languages className="h-5 w-5" />
            </div>
            <div className="grid place-items-center rounded-[10px] border border-white/10 bg-black/25 p-4">
              <Bell className="h-5 w-5" />
            </div>
            <div className="grid place-items-center rounded-[10px] border border-white/10 bg-black/25 p-4">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
