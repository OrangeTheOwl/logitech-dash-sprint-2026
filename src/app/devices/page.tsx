"use client";

import {
  BatteryFull,
  Bluetooth,
  Bot,
  ChevronRight,
  CircleDot,
  Cog,
  Plus,
  RotateCcw,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { devices } from "@/data/mockData";

export default function DevicesPage() {
  const featuredDevice = devices[0];

  return (
    <div className="screen-enter flex h-full flex-col overflow-hidden px-5 pb-6 pt-4 sm:px-7">
      <header className="flex items-center justify-between">
        <h1 className="font-mono text-[34px] font-semibold tracking-tight text-zinc-50">Good Afternoon</h1>

        <div className="flex items-center gap-5 text-zinc-100">
          <button
            type="button"
            className="flex items-center gap-2 text-[18px] font-medium tracking-wide transition hover:text-accent"
          >
            <Plus className="h-4 w-4" strokeWidth={2.25} />
            <span className="font-mono text-[18px]">ADD DEVICE</span>
          </button>

          <span className="h-9 w-px bg-white/20" />

          <Link
            href="/flo"
            transitionTypes={["screen-shift"]}
            className="flex items-center gap-2 text-[18px] font-medium tracking-wide transition hover:text-accent"
          >
            <Bot className="h-4 w-4" strokeWidth={2.25} />
            <span className="font-mono text-[18px]">FLO</span>
          </Link>

          <span className="h-9 w-px bg-white/20" />

          <div className="flex items-center gap-5">
            <Link href="/devices" transitionTypes={["screen-shift"]} className="transition hover:text-accent">
              <RotateCcw className="h-5 w-5" />
            </Link>
            <Link href="/device/mouse" transitionTypes={["screen-shift"]} className="relative transition hover:text-accent">
              <Sparkles className="h-5 w-5" />
              <span className="dot-pulse absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent" />
            </Link>
            <Link href="/device/keyboard" transitionTypes={["screen-shift"]} className="transition hover:text-accent">
              <CircleDot className="h-5 w-5" />
            </Link>
          </div>

          <span className="h-9 w-px bg-white/20" />

          <div className="flex items-center gap-5">
            <button type="button" className="transition hover:text-accent" aria-label="Account">
              <UserRound className="h-5 w-5" />
            </button>
            <Link href="/settings" transitionTypes={["screen-shift"]} className="transition hover:text-accent" aria-label="Settings">
              <Cog className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 pt-5 lg:grid-cols-[minmax(0,500px)_minmax(0,500px)] lg:justify-center">
        <section className="relative min-h-90 w-full overflow-hidden rounded-3xl bg-[#111317]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_36%_34%,rgba(31,35,42,0.9),transparent_42%)]" />

          <div className="stage-rise relative flex h-full items-center justify-center">
            <Link
              href={featuredDevice.path}
              transitionTypes={["open-device"]}
              className="group relative flex flex-col items-center"
            >
              <div
                className="float-pulse relative transition duration-500 group-hover:scale-[1.02]"
                style={{
                  width: "clamp(250px, 30vw, 380px)",
                  height: "clamp(330px, 48vh, 500px)",
                }}
              >
                <Image
                  src="/MX-4.png"
                  alt="MX Master 4 mouse"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_26px_52px_rgba(0,0,0,0.55)]"
                  sizes="(max-width: 1200px) 36vw, 30vw"
                />
              </div>

              <div className="mt-4 inline-flex items-center gap-3 rounded-md border border-white/15 bg-[#050608] px-4 py-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
                <BatteryFull className="h-4 w-4 text-lime-400" strokeWidth={2.2} />
                <Bluetooth className="h-4 w-4 text-zinc-100" strokeWidth={2.2} />
              </div>
            </Link>
          </div>
        </section>

        <aside className="flex min-h-90 w-full items-center justify-center rounded-3xl bg-[#111317] p-5">
          <div className="w-full max-w-82 text-center">
            <p className="font-mono text-[12px] font-semibold tracking-[0.06em] text-zinc-600">UPGRADE YOUR DEVICE EXPERIENCE</p>

            <div className="mt-4 overflow-hidden rounded-xs bg-black p-4">
              <p className="font-mono text-left text-[14px] leading-[1.16] font-semibold text-zinc-100">
                DISCOVER A NEW SENSE OF  FOCUS
                <br />
                WITH FLO
              </p>

              <div className="relative mx-auto mt-4 h-45 w-36">
                <Image
                  src="/MX-4.png"
                  alt="MX Master 4 promo"
                  fill
                  className="object-contain"
                  sizes="144px"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <Link
                href="/discoverFlo"
                transitionTypes={["screen-shift"]}
                className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-[#060709] px-6 py-2 font-mono text-[14px] font-medium tracking-wide text-zinc-100 transition hover:border-accent hover:text-accent"
              >
                DISCOVER
                <ChevronRight className="h-4 w-4 text-accent" />
              </Link>
              <button
                type="button"
                className="grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-black/30 text-zinc-600 transition hover:text-zinc-400"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}
