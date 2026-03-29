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
import { useEffect, useMemo, useState } from "react";

import { devices } from "@/data/mockData";

type EmotionName = "happy" | "angry" | "confused" | "sad" | "excited";

type BrowSide = { sy: number; cy: number; ey: number };
type BrowFrame = { left: BrowSide; right: BrowSide };

type EyeSide = {
  cx: number;
  cy: number;
  arcRx: number;
  arcRy: number;
  arcStart: number;
  arcEnd: number;
  arcOpacity: number;
  arcStrokeWidth: number;
  circleRx: number;
  circleRy: number;
  circleFillOpacity: number;
  circleStrokeOpacity: number;
  circleStrokeWidth: number;
};

type EyeFrame = { left: EyeSide; right: EyeSide };

type EmotionFrame = {
  name: EmotionName;
  brow: BrowFrame;
  eyes: EyeFrame;
};

type RenderFrame = {
  brow: BrowFrame;
  eyes: EyeFrame;
};

const emotionConfig = {
  durationMs: 650,
  holdMs: 900,
  order: ["happy", "angry", "confused", "sad", "excited"] as EmotionName[],
  colors: {
    fg: "#d9d9d9",
    bg: "#000000",
  },
  stroke: {
    browWidth: 12,
    arcWidth: 8,
  },
};

const emotions: Record<EmotionName, EmotionFrame> = {
  happy: {
    name: "happy",
    brow: {
      left: { sy: 31, cy: 6, ey: 31 },
      right: { sy: 31, cy: 6, ey: 31 },
    },
    eyes: {
      left: {
        cx: 55,
        cy: 84,
        arcRx: 22,
        arcRy: 14,
        arcStart: 180,
        arcEnd: 359.5,
        arcOpacity: 1,
        arcStrokeWidth: 9,
        circleRx: 11,
        circleRy: 11,
        circleFillOpacity: 0,
        circleStrokeOpacity: 0,
        circleStrokeWidth: 0,
      },
      right: {
        cx: 165,
        cy: 84,
        arcRx: 22,
        arcRy: 14,
        arcStart: 180,
        arcEnd: 359.5,
        arcOpacity: 1,
        arcStrokeWidth: 9,
        circleRx: 11,
        circleRy: 11,
        circleFillOpacity: 0,
        circleStrokeOpacity: 0,
        circleStrokeWidth: 0,
      },
    },
  },
  angry: {
    name: "angry",
    brow: {
      left: { sy: 26, cy: 35, ey: 44 },
      right: { sy: 44, cy: 35, ey: 26 },
    },
    eyes: {
      left: {
        cx: 55,
        cy: 82,
        arcRx: 18,
        arcRy: 10,
        arcStart: 180,
        arcEnd: 359.5,
        arcOpacity: 0,
        arcStrokeWidth: 8,
        circleRx: 13,
        circleRy: 13,
        circleFillOpacity: 0,
        circleStrokeOpacity: 1,
        circleStrokeWidth: 8,
      },
      right: {
        cx: 165,
        cy: 82,
        arcRx: 18,
        arcRy: 10,
        arcStart: 180,
        arcEnd: 359.5,
        arcOpacity: 0,
        arcStrokeWidth: 8,
        circleRx: 13,
        circleRy: 13,
        circleFillOpacity: 0,
        circleStrokeOpacity: 1,
        circleStrokeWidth: 8,
      },
    },
  },
  confused: {
    name: "confused",
    brow: {
      left: { sy: 30, cy: 18, ey: 34 },
      right: { sy: 44, cy: 48, ey: 30 },
    },
    eyes: {
      left: {
        cx: 55,
        cy: 82,
        arcRx: 18,
        arcRy: 10,
        arcStart: 180,
        arcEnd: 359.5,
        arcOpacity: 0,
        arcStrokeWidth: 8,
        circleRx: 11,
        circleRy: 11,
        circleFillOpacity: 1,
        circleStrokeOpacity: 0,
        circleStrokeWidth: 0,
      },
      right: {
        cx: 165,
        cy: 82,
        arcRx: 18,
        arcRy: 10,
        arcStart: 180,
        arcEnd: 359.5,
        arcOpacity: 0,
        arcStrokeWidth: 8,
        circleRx: 11,
        circleRy: 11,
        circleFillOpacity: 1,
        circleStrokeOpacity: 0,
        circleStrokeWidth: 0,
      },
    },
  },
  sad: {
    name: "sad",
    brow: {
      left: { sy: 38, cy: 50, ey: 22 },
      right: { sy: 22, cy: 50, ey: 38 },
    },
    eyes: {
      left: {
        cx: 55,
        cy: 84,
        arcRx: 18,
        arcRy: 10,
        arcStart: 180,
        arcEnd: 359.5,
        arcOpacity: 0,
        arcStrokeWidth: 8,
        circleRx: 10,
        circleRy: 10,
        circleFillOpacity: 1,
        circleStrokeOpacity: 0,
        circleStrokeWidth: 0,
      },
      right: {
        cx: 165,
        cy: 84,
        arcRx: 18,
        arcRy: 10,
        arcStart: 180,
        arcEnd: 359.5,
        arcOpacity: 0,
        arcStrokeWidth: 8,
        circleRx: 10,
        circleRy: 10,
        circleFillOpacity: 1,
        circleStrokeOpacity: 0,
        circleStrokeWidth: 0,
      },
    },
  },
  excited: {
    name: "excited",
    brow: {
      left: { sy: 36, cy: 16, ey: 36 },
      right: { sy: 36, cy: 16, ey: 36 },
    },
    eyes: {
      left: {
        cx: 55,
        cy: 82,
        arcRx: 18,
        arcRy: 10,
        arcStart: 180,
        arcEnd: 359.5,
        arcOpacity: 0,
        arcStrokeWidth: 8,
        circleRx: 13,
        circleRy: 13,
        circleFillOpacity: 1,
        circleStrokeOpacity: 0,
        circleStrokeWidth: 0,
      },
      right: {
        cx: 165,
        cy: 82,
        arcRx: 18,
        arcRy: 10,
        arcStart: 180,
        arcEnd: 359.5,
        arcOpacity: 0,
        arcStrokeWidth: 8,
        circleRx: 13,
        circleRy: 13,
        circleFillOpacity: 1,
        circleStrokeOpacity: 0,
        circleStrokeWidth: 0,
      },
    },
  },
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function easeInOutSmoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function cloneEmotionFrame(frame: EmotionFrame | RenderFrame): RenderFrame {
  return {
    brow: {
      left: { ...frame.brow.left },
      right: { ...frame.brow.right },
    },
    eyes: {
      left: { ...frame.eyes.left },
      right: { ...frame.eyes.right },
    },
  };
}

function getEmotion(name: EmotionName) {
  return emotions[name] ?? emotions.happy;
}

function mixBrow(from: BrowFrame, to: BrowFrame, e: number): BrowFrame {
  return {
    left: {
      sy: lerp(from.left.sy, to.left.sy, e),
      cy: lerp(from.left.cy, to.left.cy, e),
      ey: lerp(from.left.ey, to.left.ey, e),
    },
    right: {
      sy: lerp(from.right.sy, to.right.sy, e),
      cy: lerp(from.right.cy, to.right.cy, e),
      ey: lerp(from.right.ey, to.right.ey, e),
    },
  };
}

function mixEyeSide(from: EyeSide, to: EyeSide, e: number): EyeSide {
  return {
    cx: lerp(from.cx, to.cx, e),
    cy: lerp(from.cy, to.cy, e),
    arcRx: lerp(from.arcRx, to.arcRx, e),
    arcRy: lerp(from.arcRy, to.arcRy, e),
    arcStart: lerp(from.arcStart, to.arcStart, e),
    arcEnd: lerp(from.arcEnd, to.arcEnd, e),
    arcOpacity: lerp(from.arcOpacity, to.arcOpacity, e),
    arcStrokeWidth: lerp(from.arcStrokeWidth, to.arcStrokeWidth, e),
    circleRx: lerp(from.circleRx, to.circleRx, e),
    circleRy: lerp(from.circleRy, to.circleRy, e),
    circleFillOpacity: lerp(from.circleFillOpacity, to.circleFillOpacity, e),
    circleStrokeOpacity: lerp(from.circleStrokeOpacity, to.circleStrokeOpacity, e),
    circleStrokeWidth: lerp(from.circleStrokeWidth, to.circleStrokeWidth, e),
  };
}

function mixEyes(from: EyeFrame, to: EyeFrame, e: number): EyeFrame {
  return {
    left: mixEyeSide(from.left, to.left, e),
    right: mixEyeSide(from.right, to.right, e),
  };
}

function interpolateEmotion(fromEmotion: EmotionName, toEmotion: EmotionName, t: number): RenderFrame {
  const from = getEmotion(fromEmotion);
  const to = getEmotion(toEmotion);
  const e = easeInOutSmoothstep(clamp(t, 0, 1));

  return {
    brow: mixBrow(from.brow, to.brow, e),
    eyes: mixEyes(from.eyes, to.eyes, e),
  };
}

function applyLiveliness(frame: RenderFrame, timeMs: number, intensity = 1): RenderFrame {
  const out = cloneEmotionFrame(frame);
  const t = timeMs / 1000;
  const k = Math.max(0, intensity) * 2.5;

  const jiggleA = Math.sin(t * 7.1) * 0.55;
  const jiggleB = Math.sin(t * 12.8 + 0.7) * 0.25;
  const jiggle = (jiggleA + jiggleB) * k * 1.2;

  out.brow.left.sy += jiggle * 0.5;
  out.brow.left.cy += jiggle * 0.9;
  out.brow.left.ey += jiggle * 0.55;

  out.brow.right.sy += -jiggle * 0.4;
  out.brow.right.cy += -jiggle * 0.75;
  out.brow.right.ey += -jiggle * 0.45;

  const eyeDriftX = (Math.sin(t * 2.2) * 2.2 + Math.sin(t * 5.6 + 0.3) * 0.55) * k * 0.75;
  const eyeDriftY = (Math.cos(t * 2.5 + 0.8) * 0.95 + Math.sin(t * 4.2) * 0.35) * k * 0.55;

  out.eyes.left.cx += eyeDriftX - 0.3 * k;
  out.eyes.right.cx += eyeDriftX + 0.3 * k;
  out.eyes.left.cy += eyeDriftY;
  out.eyes.right.cy += eyeDriftY;

  const blinkPulse = Math.max(0, Math.sin(t * 2.9 + 0.6)) ** 16;
  out.eyes.left.arcRy = Math.max(3.2, out.eyes.left.arcRy - blinkPulse * 4.1 * k);
  out.eyes.right.arcRy = Math.max(3.2, out.eyes.right.arcRy - blinkPulse * 4.1 * k);
  out.eyes.left.circleRy = Math.max(3, out.eyes.left.circleRy - blinkPulse * 1.05 * k);
  out.eyes.right.circleRy = Math.max(3, out.eyes.right.circleRy - blinkPulse * 1.05 * k);

  return out;
}

function polarToCartesian(cx: number, cy: number, rx: number, ry: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
}

function describeArc(cx: number, cy: number, rx: number, ry: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, rx, ry, startAngle);
  const end = polarToCartesian(cx, cy, rx, ry, endAngle);
  const delta = ((endAngle - startAngle) % 360 + 360) % 360;
  const largeArc = delta > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${rx} ${ry} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function EmotionPreview() {
  const order = emotionConfig.order;
  const initial = useMemo(() => cloneEmotionFrame(getEmotion(order[0])), [order]);
  const [frame, setFrame] = useState<RenderFrame>(initial);

  useEffect(() => {
    let raf = 0;
    let fromIdx = 0;
    let toIdx = 1;
    let phaseStart = performance.now();

    const tick = (now: number) => {
      const phaseElapsed = now - phaseStart;
      const isTransition = phaseElapsed <= emotionConfig.durationMs;

      const nextFrame = isTransition
        ? interpolateEmotion(order[fromIdx], order[toIdx], phaseElapsed / emotionConfig.durationMs)
        : cloneEmotionFrame(getEmotion(order[toIdx]));

      setFrame(applyLiveliness(nextFrame, now, 0.45));

      if (phaseElapsed >= emotionConfig.durationMs + emotionConfig.holdMs) {
        fromIdx = toIdx;
        toIdx = (toIdx + 1) % order.length;
        phaseStart = now;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [order]);

  const browLeft = `M 20 ${frame.brow.left.sy} Q 55 ${frame.brow.left.cy} 90 ${frame.brow.left.ey}`;
  const browRight = `M 130 ${frame.brow.right.sy} Q 165 ${frame.brow.right.cy} 200 ${frame.brow.right.ey}`;

  return (
    <div className="relative mx-auto mt-4 w-full max-w-50">
      <svg viewBox="0 0 220 120" className="h-auto w-full" role="img" aria-label="Animated TUSK emotional expression">
        <path d={browLeft} stroke={emotionConfig.colors.fg} strokeWidth={emotionConfig.stroke.browWidth} strokeLinecap="round" fill="none" />
        <path d={browRight} stroke={emotionConfig.colors.fg} strokeWidth={emotionConfig.stroke.browWidth} strokeLinecap="round" fill="none" />

        {["left", "right"].map((side) => {
          const eye = frame.eyes[side as keyof EyeFrame];
          const arcPath = describeArc(eye.cx, eye.cy, eye.arcRx, eye.arcRy, eye.arcStart, eye.arcEnd);
          return (
            <g key={side}>
              <path
                d={arcPath}
                stroke={emotionConfig.colors.fg}
                strokeWidth={Math.max(eye.arcStrokeWidth, emotionConfig.stroke.arcWidth)}
                strokeLinecap="round"
                fill="none"
                opacity={eye.arcOpacity}
              />
              <ellipse
                cx={eye.cx}
                cy={eye.cy}
                rx={Math.max(eye.circleRx, 0)}
                ry={Math.max(eye.circleRy, 0)}
                fill={emotionConfig.colors.fg}
                fillOpacity={eye.circleFillOpacity}
                stroke={emotionConfig.colors.fg}
                strokeOpacity={eye.circleStrokeOpacity}
                strokeWidth={eye.circleStrokeWidth}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

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
            href="/tusk"
            transitionTypes={["screen-shift"]}
            className="flex items-center gap-2 text-[18px] font-medium tracking-wide transition hover:text-accent"
          >
            <Bot className="h-4 w-4" strokeWidth={2.25} />
            <span className="font-mono text-[18px]">TUSK</span>
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
                WITH TUSK
              </p>

              <EmotionPreview />
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <Link
                href="/discoverTusk"
                transitionTypes={["screen-shift"]}
                className="relative inline-flex items-center gap-2 rounded-full border border-accent/70 bg-[#060709] px-6 py-2 font-mono text-[14px] font-medium tracking-wide text-zinc-100 transition hover:border-accent hover:text-accent"
              >
                <span className="dot-pulse absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent" />
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
