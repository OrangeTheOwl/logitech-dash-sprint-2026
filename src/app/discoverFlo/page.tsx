import { ArrowLeft, Bot, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DiscoverFloPage() {
  return (
    <div className="screen-enter flex h-full flex-col overflow-hidden px-5 pb-6 pt-4 sm:px-7">
      <header className="flex items-center gap-3">
        <Link href="/devices" transitionTypes={["screen-shift"]} className="rounded-full p-1 text-zinc-300 transition hover:text-white">
          <ArrowLeft className="h-7 w-7" />
        </Link>
        <h1 className="font-mono text-[34px] font-semibold tracking-tight text-zinc-50">Discover FLO</h1>
      </header>

      <section className="mt-5 grid min-h-0 flex-1 place-items-center rounded-3xl bg-[#111317] p-6">
        <div className="w-full max-w-2xl rounded-2xl border border-white/12 bg-black/25 p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
            <Bot className="h-6 w-6" />
          </div>

          <h2 className="mt-4 font-mono text-2xl font-semibold text-zinc-100">A New Sense of Focus</h2>
          <p className="mx-auto mt-3 max-w-xl font-mono text-[14px] leading-relaxed text-zinc-300">
            FLO helps you stay in flow by detecting distraction patterns and applying subtle interventions at the right time.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-3 py-1 font-mono text-[12px] text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Real-time behavior sensing
            </span>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-black/20 px-3 py-1 font-mono text-[12px] text-zinc-300">
              Adaptive interventions
            </span>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-black/20 px-3 py-1 font-mono text-[12px] text-zinc-300">
              Focus timeline insights
            </span>
          </div>

          <div className="mt-7 flex items-center justify-center gap-3">
            <Link
              href="/flo"
              transitionTypes={["screen-shift"]}
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-[#060709] px-6 py-2 font-mono text-[14px] font-medium tracking-wide text-zinc-100 transition hover:border-accent hover:text-accent"
            >
              Open FLO Dashboard
              <ChevronRight className="h-4 w-4 text-accent" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
