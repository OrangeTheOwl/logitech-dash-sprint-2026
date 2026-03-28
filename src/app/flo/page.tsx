"use client";

import {
  ArrowLeft,
  Brain,
  Clock3,
  Gauge,
  History,
  List,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SignalKey =
  | "mouseActivity"
  | "typingCadence"
  | "tabSwitching"
  | "idleTime"
  | "attentionLevel";

type SignalState = Record<SignalKey, number>;

interface FeedItem {
  id: string;
  time: string;
  message: string;
}

interface ProductiveWindow {
  startHour: number;
  endHour: number;
}

interface TimelinePoint {
  id: string;
  day: string;
  score: number;
  productiveWindows: ProductiveWindow[];
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function buildRandomDailyWindows(): ProductiveWindow[] {
  const minDuration = 20 / 60;
  const maxDuration = 59 / 60;
  const slotCount = 2 + Math.floor(Math.random() * 4);

  const durations = Array.from(
    { length: slotCount },
    () => minDuration + Math.random() * (maxDuration - minDuration),
  );

  const usedHours = durations.reduce((sum, d) => sum + d, 0);
  const freeHours = Math.max(0, 8 - usedHours);
  const gapWeights = Array.from({ length: slotCount + 1 }, () => 0.2 + Math.random() * 1.8);
  const gapWeightTotal = gapWeights.reduce((sum, w) => sum + w, 0);
  const gaps = gapWeights.map((w) => (w / gapWeightTotal) * freeHours);

  const windows: ProductiveWindow[] = [];
  let cursor = 9 + gaps[0];

  for (let i = 0; i < slotCount; i += 1) {
    const startHour = clamp(cursor, 9, 17 - minDuration);
    const endHour = clamp(startHour + durations[i], startHour + minDuration, 17);
    windows.push({ startHour, endHour });
    cursor = endHour + gaps[i + 1];
  }

  return windows;
}

function generateFreshTimelineData(): TimelinePoint[] {
  return [
    { id: "mon", day: "Monday", score: 82, productiveWindows: buildRandomDailyWindows() },
    { id: "tue", day: "Tuesday", score: 74, productiveWindows: buildRandomDailyWindows() },
    { id: "wed", day: "Wednesday", score: 69, productiveWindows: buildRandomDailyWindows() },
    { id: "thu", day: "Thursday", score: 88, productiveWindows: buildRandomDailyWindows() },
    { id: "fri", day: "Friday", score: 77, productiveWindows: buildRandomDailyWindows() },
    { id: "sat", day: "Saturday", score: 72, productiveWindows: buildRandomDailyWindows() },
    { id: "today", day: "Today", score: 84, productiveWindows: buildRandomDailyWindows() },
  ];
}

const initialSignals: SignalState = {
  mouseActivity: 68,
  typingCadence: 56,
  tabSwitching: 48,
  idleTime: 22,
  attentionLevel: 72,
};

const initialTimeline: TimelinePoint[] = generateFreshTimelineData();

const initialFeed: FeedItem[] = [
  { id: "f1", time: "08:58", message: "Session opened. Baseline signal calibration complete." },
  { id: "f2", time: "09:03", message: "Primary task context detected in IDE + browser docs." },
  { id: "f3", time: "09:09", message: "Sustained typing cadence for 6 minutes." },
  { id: "f4", time: "09:14", message: "Attention drift detected. Brief context switch to chat." },
  { id: "f5", time: "09:16", message: "Applying light resistance." },
  { id: "f6", time: "09:22", message: "Focus restored after intervention." },
  { id: "f7", time: "09:31", message: "Deep work streak reached 14 minutes." },
  { id: "f8", time: "09:38", message: "Rapid tab switching simulated. Light resistance applied." },
  { id: "f9", time: "09:41", message: "Distraction pattern detected. Nudges increased." },
  { id: "f10", time: "09:47", message: "Stability recovered. Pointer friction reduced." },
  { id: "f11", time: "09:55", message: "25 minutes of continuous focus." },
  { id: "f12", time: "10:02", message: "Fatigue signal spike detected. Break suggestion boosted." },
  { id: "f13", time: "10:08", message: "Micro-break completed. Attention trend improving." },
  { id: "f14", time: "10:14", message: "Deep focus state simulated. Interventions reduced." },
  { id: "f15", time: "10:20", message: "Flow state stabilized with low tab-switch rate." },
];

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function SmileyStartupAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 grid place-items-center bg-[#0d1013]">
      <div className="flo-loader-stage grid place-items-center">
        <svg width="520" height="270" viewBox="0 0 560 320" fill="none" aria-hidden>
          <defs>
            <filter id="flo-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g className="flo-brow-raise" style={{ transformOrigin: "180px 138px" }}>
            <g className="flo-brow-follow-left" style={{ transformOrigin: "180px 138px" }}>
              <path
                d="M50 164C110 114 196 96 236 128"
                stroke="rgba(232,232,232,0.92)"
                strokeWidth="26"
                strokeLinecap="round"
                className="flo-brush-stroke flo-brow-stroke"
                filter="url(#flo-glow)"
              />
            </g>
          </g>

          <g className="flo-brow-raise" style={{ transformOrigin: "382px 138px" }}>
            <g className="flo-brow-follow-right" style={{ transformOrigin: "382px 138px" }}>
              <path
                d="M324 128C364 96 450 114 510 164"
                stroke="rgba(232,232,232,0.92)"
                strokeWidth="26"
                strokeLinecap="round"
                className="flo-brush-stroke flo-brow-stroke"
                filter="url(#flo-glow)"
              />
            </g>
          </g>

          <g className="flo-eye-stack" style={{ transformOrigin: "180px 210px" }}>
            <circle cx="181" cy="233" r="53" fill="rgba(255,255,255,0.045)" className="flo-eye-shadow" />
            <circle cx="181" cy="236" r="54" fill="url(#leftDust)" className="flo-eye-dust" />
            <g className="flo-pupil-track">
              <circle cx="181" cy="236" r="43" fill="rgba(255,255,255,0.76)" className="flo-pupil-core" />
            </g>
          </g>

          <g className="flo-eye-stack" style={{ transformOrigin: "382px 210px" }}>
            <circle cx="383" cy="233" r="53" fill="rgba(255,255,255,0.045)" className="flo-eye-shadow" />
            <circle cx="383" cy="236" r="54" fill="url(#rightDust)" className="flo-eye-dust" />
            <g className="flo-pupil-track">
              <circle cx="383" cy="236" r="43" fill="rgba(255,255,255,0.76)" className="flo-pupil-core" />
            </g>
          </g>

          <defs>
            <radialGradient id="leftDust" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(181 236) rotate(90) scale(64)">
              <stop offset="0" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="0.6" stopColor="rgba(255,255,255,0.02)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <radialGradient id="rightDust" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(383 236) rotate(90) scale(64)">
              <stop offset="0" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="0.6" stopColor="rgba(255,255,255,0.02)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function AgentStatusCard({ focusScore, sessionMinutes }: { focusScore: number; sessionMinutes: number }) {
  const state =
    focusScore >= 86
      ? "Deep Focus"
      : focusScore >= 68
        ? "Focused"
        : focusScore >= 50
          ? "Distracted"
          : focusScore >= 32
            ? "Lost Focus"
            : "Fatigued";
  const flowMode = focusScore >= 78 ? "ON" : "OFF";
  const [showStateOptions, setShowStateOptions] = useState(false);
  const stateOptions = ["🟢 Deep Focus", "🟡 Focused", "🟠 Distracted", "🔴 Lost Focus", "🔵 Fatigued"];

  return (
    <section className="rounded-2xl bg-[#111317] p-5">
      <p className="flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-zinc-500">
        <Star className="h-3.5 w-3.5" />
        Today's Status
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-[1.7fr_1fr_1fr_1fr]">
        <div className="rounded-xl bg-black/25 p-4">
          <p className="flex items-center gap-1.5 font-mono text-[12px] text-zinc-400">
            <Gauge className="h-3.5 w-3.5" />
            Focus Score
          </p>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#14d9cc_0%,#1ce6d7_100%)] transition-all duration-500"
                style={{ width: `${focusScore}%` }}
              />
            </div>
            <span className="font-mono text-[13px] text-zinc-200">{focusScore}%</span>
          </div>
        </div>
        <div className="relative rounded-xl bg-black/25 p-4">
          <button
            type="button"
            onClick={() => setShowStateOptions((current) => !current)}
            className="w-full text-left"
          >
            <p className="flex items-center gap-1.5 font-mono text-[12px] text-zinc-400">
              <Waves className="h-3.5 w-3.5" />
              Current State
            </p>
            <p className="mt-2 font-mono text-[16px] font-medium text-zinc-100">{state}</p>
          </button>
          <div
            className={`pointer-events-none absolute left-1/2 top-[calc(100%+10px)] z-20 w-55 -translate-x-1/2 rounded-xl border border-accent/35 bg-[#0d1115]/95 p-3 shadow-[0_14px_40px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-all duration-300 ${
              showStateOptions ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-500">
              <List className="h-3.5 w-3.5" />
              All options
            </p>
            <ul className="mt-2 space-y-1.5 font-mono text-[12px] text-zinc-300">
              {stateOptions.map((option) => (
                <li key={option} className="rounded-md px-2 py-1 text-zinc-300">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-xl bg-black/25 p-4">
          <p className="flex items-center gap-1.5 font-mono text-[12px] text-zinc-400">
            <Clock3 className="h-3.5 w-3.5" />
            Session Time
          </p>
          <p className="mt-2 font-mono text-[16px] font-medium text-zinc-100">{sessionMinutes} min</p>
        </div>
        <div className="rounded-xl bg-black/25 p-4">
          <p className="flex items-center gap-1.5 font-mono text-[12px] text-zinc-400">
            <Sparkles className="h-3.5 w-3.5" />
            Flow Mode
          </p>
          <p className={`mt-2 font-mono text-[16px] font-medium ${flowMode === "ON" ? "text-accent" : "text-zinc-100"}`}>
            {flowMode}
          </p>
        </div>
      </div>
    </section>
  );
}

function AgentReasoning({ signals }: { signals: SignalState }) {
  const confidence = clamp(
    Math.round(signals.attentionLevel * 0.8 + (100 - signals.idleTime) * 0.1 + signals.typingCadence * 0.1),
    42,
    97,
  );

  const hints = [
    signals.tabSwitching > 60 ? "Increased tab switching" : "Stable task context",
    signals.typingCadence < 50 ? "Lower typing cadence" : "Steady interaction rhythm",
    signals.mouseActivity < 45 ? "Mouse hesitation" : "Intentional pointer movement",
  ];

  return (
    <section className="rounded-2xl bg-[#111317] p-5">
      <h2 className="flex items-center gap-2 font-mono text-[14px] uppercase tracking-[0.08em] text-zinc-400">
        <Brain className="h-4 w-4" />
        Agent Analysis
      </h2>
      <div className="mt-4 rounded-[10px] border border-white/12 bg-black/30 px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-500">Current Assessment</p>
        <p className="mt-1 font-mono text-[14px] text-zinc-100">
          {signals.attentionLevel < 60 ? "Focus decreasing." : "Focus stable."}
        </p>
      </div>

      <div className="mt-3 rounded-[10px] border border-white/12 bg-black/30 px-4 py-3">
        <div className="flex items-center justify-between font-mono text-[13px] text-zinc-200">
          <span>Confidence</span>
          <span className="font-semibold text-accent">{confidence}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${confidence}%` }} />
        </div>
      </div>

      <div className="mt-3 rounded-[10px] border border-white/12 bg-black/30 px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-500">Signals Detected</p>
        <ul className="mt-2 space-y-2">
          {hints.map((hint) => (
            <li key={hint} className="rounded-md bg-black/20 px-3 py-2 font-mono text-[13px] text-zinc-200">
              {hint}
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}

function FocusTimeline({ points }: { points: TimelinePoint[] }) {
  const safePoints = points ?? [];
  const orderedPoints = [...safePoints].reverse();
  const bestDay = safePoints.length > 0
    ? safePoints.reduce((best, current) => (current.score > best.score ? current : best), safePoints[0])
    : null;
  const hourTicks = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
  const formatHour = (hour: number) => {
    const whole = Math.floor(hour);
    const minutes = Math.round((hour - whole) * 60);
    const safeMinutes = minutes === 60 ? 59 : minutes;
    return `${String(whole).padStart(2, "0")}:${String(safeMinutes).padStart(2, "0")}`;
  };

  return (
    <section className="rounded-2xl bg-[#111317] p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="flex items-center gap-2 font-mono text-[14px] uppercase tracking-[0.08em] text-zinc-400">
          <TrendingUp className="h-4 w-4" />
          Focus Timeline
        </h2>
        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent">
          {bestDay ? `Best: ${bestDay.day} (${bestDay.score}%)` : "Best: --"}
        </span>
      </div>

      <p className="mt-2 font-mono text-[12px] text-zinc-500">Daily focus history on a 24h rail with productive windows in working hours (09:00-17:00).</p>

      <div className="mt-4 space-y-2.5">
        {orderedPoints.map((point, pointIndex) => {
          const normalizedWindows = (point.productiveWindows ?? [])
            .map((window) => ({
              startHour: clamp(window.startHour, 9, 17),
              endHour: clamp(window.endHour, 9, 17),
            }))
            .filter((window) => window.endHour > window.startHour)
            .map((window) => {
              const duration = clamp(window.endHour - window.startHour, 20 / 60, 59 / 60);
              return {
                startHour: window.startHour,
                endHour: clamp(window.startHour + duration, window.startHour + 20 / 60, 17),
              };
            })
            .slice(0, 5);

          const windows = normalizedWindows.sort((a, b) => a.startHour - b.startHour);

          const productiveHours = windows.reduce((sum, w) => sum + (w.endHour - w.startHour), 0);
          const rowId = point.id ?? `${point.day}-${pointIndex}`;

          return (
            <article
              key={rowId}
              tabIndex={0}
              className="group rounded-[10px] border border-white/12 bg-black/30 px-3 py-2.5 outline-none transition hover:border-white/20 focus-visible:border-accent/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-zinc-400">{point.day}</span>
              </div>

              <div className="mt-2 rounded-md border border-white/8 bg-zinc-900/70 p-2">
                <div className="flex items-center gap-3">
                  <div className="relative h-1.5 flex-1 rounded-full bg-zinc-800">
                  {windows.map((window, index) => (
                    <span
                      key={`${rowId}-window-${index}`}
                      className="absolute top-0 h-1.5 rounded-full bg-accent/85"
                      style={{
                        left: `${(window.startHour / 24) * 100}%`,
                        width: `${((window.endHour - window.startHour) / 24) * 100}%`,
                      }}
                    />
                  ))}
                  </div>

                  <div className="min-w-18 rounded-[10px] border border-accent/35 bg-accent/10 px-2 py-1 text-center shadow-[0_0_14px_rgba(20,217,204,0.14)]">
                    <span className="font-mono text-lg font-semibold leading-none text-accent">{point.score}%</span>
                  </div>
                </div>

                <div className="mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-36 group-hover:opacity-100 group-focus-within:mt-2 group-focus-within:max-h-36 group-focus-within:opacity-100">
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-full border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                      {productiveHours.toFixed(2)}h productive
                    </span>

                    {windows.map((window, index) => (
                      <span
                        key={`${rowId}-label-${index}`}
                        className="rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent"
                      >
                        {formatHour(window.startHour)}-{formatHour(window.endHour)}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function InterventionControls({
  toggles,
  onToggle,
  strength,
  onStrength,
}: {
  toggles: Record<string, boolean>;
  onToggle: (key: string) => void;
  strength: number;
  onStrength: (value: number) => void;
}) {
  const toggleOrder = [
    "Mouse vibration",
    "Pointer resistance",
    "Screen dimming",
    "Break suggestions",
  ];

  return (
    <section className="rounded-2xl bg-[#111317] p-5">
      <h2 className="flex items-center gap-2 font-mono text-[14px] uppercase tracking-[0.08em] text-zinc-400">
        <SlidersHorizontal className="h-4 w-4" />
        Intervention Settings
      </h2>
      <div className="mt-4 space-y-3">
        {toggleOrder.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onToggle(item)}
            className="flex h-12 w-full items-center justify-between rounded-[10px] border border-white/12 bg-black/30 px-4 py-2 font-mono text-[15px] text-zinc-100 transition hover:border-white/25"
          >
            <span>{item}</span>
            <span
              className={`relative h-5 w-9 rounded-full border transition ${
                toggles[item] ? "border-accent/60 bg-accent" : "border-zinc-600 bg-zinc-700"
              }`}
              aria-hidden
            >
              <span
                className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white transition ${
                  toggles[item] ? "left-4.5" : "left-0.5"
                }`}
              />
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5">
        <div className="space-y-2 rounded-[10px] border border-white/12 bg-black/30 px-4 py-4">
          <div className="flex items-center justify-between font-mono text-[15px] text-zinc-100">
            <span>Intervention Strength</span>
            <span className="font-semibold text-accent">{strength}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={strength}
            onChange={(event) => onStrength(Number(event.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-700 accent-accent"
          />
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivityFeed({ items }: { items: FeedItem[] }) {
  const classifyEvent = (message: string) => {
    const lower = message.toLowerCase();

    if (lower.includes("simulated")) {
      return {
        label: "Simulation",
        dotClass: "bg-accent",
        chipClass: "border-accent/35 bg-accent/12 text-accent",
      };
    }

    if (lower.includes("detected") || lower.includes("dropped")) {
      return {
        label: "Detection",
        dotClass: "bg-amber-300",
        chipClass: "border-amber-300/35 bg-amber-400/10 text-amber-200",
      };
    }

    if (lower.includes("applying") || lower.includes("applied") || lower.includes("increased") || lower.includes("boosted")) {
      return {
        label: "Intervention",
        dotClass: "bg-accent",
        chipClass: "border-accent/35 bg-accent/12 text-accent",
      };
    }

    if (lower.includes("restored") || lower.includes("continuous") || lower.includes("stable")) {
      return {
        label: "Recovery",
        dotClass: "bg-emerald-300",
        chipClass: "border-emerald-300/35 bg-emerald-400/10 text-emerald-200",
      };
    }

    return {
      label: "Signal",
      dotClass: "bg-zinc-300",
      chipClass: "border-zinc-400/35 bg-zinc-400/10 text-zinc-200",
    };
  };

  return (
    <section className="rounded-2xl bg-[#111317] p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-mono text-[14px] uppercase tracking-[0.08em] text-zinc-400">
          <History className="h-4 w-4" />
          Agent Activity
        </h2>
        <span className="rounded-full border border-white/12 bg-black/30 px-2.5 py-1 font-mono text-[11px] text-zinc-400">
          {items.length} events
        </span>
      </div>

      <p className="mt-2 font-mono text-[12px] text-zinc-500">Latest decisions, detections, and interventions.</p>

      <div className="mt-4 max-h-screen space-y-2 overflow-y-auto pr-1.5">
        {items.map((item, index) => {
          const event = classifyEvent(item.message);

          return (
            <div key={item.id} className="grid grid-cols-[14px_1fr] gap-3">
              <div className="relative pt-2">
                <span className={`block h-2 w-2 rounded-full ${event.dotClass}`} />
                {index < items.length - 1 ? <span className="absolute left-0.75 top-4 h-[calc(100%-10px)] w-px bg-white/12" /> : null}
              </div>

              <article className="rounded-[10px] border border-white/12 bg-black/30 px-3 py-2.5 transition hover:border-white/20">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${event.chipClass}`}>
                      {event.label}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500">{item.time}</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-600">FLO</span>
                </div>

                <p className="mt-2 font-mono text-[13px] leading-relaxed text-zinc-200">{item.message}</p>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SimulationControls({
  onScenario,
}: {
  onScenario: (scenario: "distraction" | "deep-focus" | "fatigue" | "tab-switch") => void;
}) {
  return (
    <section className="rounded-2xl bg-[#111317] p-5">
      <h2 className="flex items-center gap-2 font-mono text-[14px] uppercase tracking-[0.08em] text-zinc-400">
        <Gauge className="h-4 w-4" />
        Simulation Controls
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onScenario("distraction")}
          className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 font-mono text-[12px] text-zinc-200 transition hover:border-accent/50"
        >
          Simulate distraction
        </button>
        <button
          type="button"
          onClick={() => onScenario("deep-focus")}
          className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 font-mono text-[12px] text-zinc-200 transition hover:border-accent/50"
        >
          Simulate deep focus
        </button>
        <button
          type="button"
          onClick={() => onScenario("fatigue")}
          className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 font-mono text-[12px] text-zinc-200 transition hover:border-accent/50"
        >
          Simulate fatigue
        </button>
        <button
          type="button"
          onClick={() => onScenario("tab-switch")}
          className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 font-mono text-[12px] text-zinc-200 transition hover:border-accent/50"
        >
          Simulate tab switching
        </button>
      </div>
    </section>
  );
}

export default function FloPage() {
  const [booting, setBooting] = useState(true);
  const [signals, setSignals] = useState<SignalState>(initialSignals);
  const [timeline, setTimeline] = useState<TimelinePoint[]>(() => initialTimeline);
  const [feed, setFeed] = useState<FeedItem[]>(initialFeed);
  const [strength, setStrength] = useState(36);
  const [sessionMinutes, setSessionMinutes] = useState(22);
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Mouse vibration": true,
    "Pointer resistance": true,
    "Screen dimming": false,
    "Break suggestions": true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 4300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignals((current) => ({
        mouseActivity: clamp(current.mouseActivity + (Math.random() * 8 - 4), 18, 96),
        typingCadence: clamp(current.typingCadence + (Math.random() * 8 - 4), 10, 92),
        tabSwitching: clamp(current.tabSwitching + (Math.random() * 10 - 5), 5, 94),
        idleTime: clamp(current.idleTime + (Math.random() * 6 - 3), 2, 82),
        attentionLevel: clamp(current.attentionLevel + (Math.random() * 8 - 4), 16, 98),
      }));
      setSessionMinutes((m) => m + 1);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const todayScore = clamp(
      Math.round(
        signals.attentionLevel * 0.45 +
          signals.typingCadence * 0.2 +
          signals.mouseActivity * 0.15 +
          (100 - signals.idleTime) * 0.1 +
          (100 - signals.tabSwitching) * 0.1,
      ),
      24,
      98,
    );

    setTimeline((current) => {
      if (current.length === 0) {
        return current;
      }

      return current.map((point) => (point.id === "today" ? { ...point, score: todayScore } : point));
    });
  }, [signals]);

  const focusScore = useMemo(() => {
    const score =
      signals.attentionLevel * 0.45 +
      signals.typingCadence * 0.2 +
      signals.mouseActivity * 0.15 +
      (100 - signals.idleTime) * 0.1 +
      (100 - signals.tabSwitching) * 0.1;
    return clamp(Math.round(score), 0, 100);
  }, [signals]);

  const pushFeed = (message: string) => {
    setFeed((current) => [{ id: crypto.randomUUID(), time: nowTime(), message }, ...current]);
  };

  const handleScenario = (scenario: "distraction" | "deep-focus" | "fatigue" | "tab-switch") => {
    if (scenario === "distraction") {
      setSignals((current) => ({
        ...current,
        attentionLevel: clamp(current.attentionLevel - 20, 8, 98),
        tabSwitching: clamp(current.tabSwitching + 22, 5, 98),
        typingCadence: clamp(current.typingCadence - 14, 5, 98),
      }));
      pushFeed("Distraction pattern detected. Nudges increased.");
      return;
    }

    if (scenario === "deep-focus") {
      setSignals((current) => ({
        ...current,
        attentionLevel: clamp(current.attentionLevel + 20, 8, 98),
        tabSwitching: clamp(current.tabSwitching - 18, 5, 98),
        typingCadence: clamp(current.typingCadence + 16, 5, 98),
      }));
      pushFeed("Deep focus state simulated. Interventions reduced.");
      return;
    }

    if (scenario === "fatigue") {
      setSignals((current) => ({
        ...current,
        attentionLevel: clamp(current.attentionLevel - 14, 8, 98),
        idleTime: clamp(current.idleTime + 18, 2, 98),
        mouseActivity: clamp(current.mouseActivity - 10, 5, 98),
      }));
      pushFeed("Fatigue pattern detected. Break suggestion boosted.");
      return;
    }

    setSignals((current) => ({
      ...current,
      tabSwitching: clamp(current.tabSwitching + 26, 5, 98),
      attentionLevel: clamp(current.attentionLevel - 9, 5, 98),
    }));
    pushFeed("Rapid tab switching simulated. Light resistance applied.");
  };

  const toggleIntervention = (key: string) => {
    setToggles((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <>
      <div className="screen-enter relative flex h-full flex-col overflow-hidden px-5 pb-6 pt-4 sm:px-7">
        {booting ? <SmileyStartupAnimation /> : null}

        <div
          className={`flex h-full flex-col gap-5 transition-all duration-500 ${
            booting ? "opacity-0 blur-[2px]" : "opacity-100 blur-0"
          }`}
        >
          <header className="flex items-center gap-3">
            <Link href="/devices" transitionTypes={["screen-shift"]} className="rounded-full p-1 text-zinc-300 transition hover:text-white">
              <ArrowLeft className="h-7 w-7" />
            </Link>
            <h1 className="font-mono text-[34px] font-semibold tracking-tight text-zinc-50">FLO</h1>
          </header>

          <div className="flex-1 space-y-5 overflow-auto pr-1">
            <AgentStatusCard focusScore={focusScore} sessionMinutes={sessionMinutes} />

            <div className="grid gap-5 lg:grid-cols-2">
              <InterventionControls
                toggles={toggles}
                onToggle={toggleIntervention}
                strength={strength}
                onStrength={setStrength}
              />
              <AgentReasoning signals={signals} />
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-5">
                <FocusTimeline points={timeline} />
                <SimulationControls onScenario={handleScenario} />
              </div>
              <div className="space-y-5">
                <ActivityFeed items={feed} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .flo-loader-stage {
          animation: flo-loader-settle 0.35s ease-out;
        }

        .flo-brush-stroke {
          stroke-dasharray: 460;
          stroke-dashoffset: 460;
          animation: flo-brush-paint 1.1s cubic-bezier(0.2, 0.78, 0.14, 0.99) forwards;
        }

        .flo-brow-stroke {
          animation-delay: 0.1s;
        }

        .flo-eye-shadow,
        .flo-eye-dust,
        .flo-pupil-core {
          opacity: 0;
        }

        .flo-eye-shadow,
        .flo-eye-dust,
        .flo-pupil-core {
          animation: flo-fade-in 0.5s ease forwards;
          animation-delay: 0.88s;
        }

        .flo-pupil-core {
          transform-box: fill-box;
          transform-origin: center;
          animation:
            flo-pop-in 0.42s ease forwards,
            flo-look-around 1.6s ease-in-out 1.42s forwards;
        }

        .flo-brow-raise {
          transform-box: fill-box;
          animation: flo-double-brow-raise 0.95s ease-in-out 3.12s both;
        }

        .flo-brow-follow-left {
          transform-box: fill-box;
          animation: flo-brow-follow 1.6s ease-in-out 1.42s forwards;
        }

        .flo-brow-follow-right {
          transform-box: fill-box;
          animation: flo-brow-follow 1.6s ease-in-out 1.42s forwards;
        }

        @keyframes flo-brush-paint {
          0% {
            stroke-dashoffset: 460;
            opacity: 0.35;
          }

          55% {
            opacity: 1;
          }

          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes flo-fade-in {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes flo-pop-in {
          0% {
            opacity: 0;
            transform: scale(0.65);
          }

          65% {
            opacity: 1;
            transform: scale(1.06);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes flo-look-around {
          0% {
            transform: translateX(0);
          }

          18% {
            transform: translateX(-7px);
          }

          38% {
            transform: translateX(6px);
          }

          58% {
            transform: translateX(-4px);
          }

          78% {
            transform: translateX(4px);
          }

          100% {
            transform: translateX(0);
          }
        }

        @keyframes flo-brow-follow {
          0% {
            transform: translateX(0);
          }

          18% {
            transform: translateX(-11px);
          }

          38% {
            transform: translateX(10px);
          }

          58% {
            transform: translateX(-6px);
          }

          78% {
            transform: translateX(6px);
          }

          100% {
            transform: translateX(0);
          }
        }

        @keyframes flo-double-brow-raise {
          0% {
            transform: translateY(0) scale(1);
          }

          25% {
            transform: translateY(-7px) scale(1.01);
          }

          38% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(-5px) scale(1.01);
          }

          68% {
            transform: translateY(0) scale(1);
          }

          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes flo-loader-settle {
          0% {
            opacity: 0;
            transform: scale(0.96);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
