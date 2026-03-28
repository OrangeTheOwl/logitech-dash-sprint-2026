import { Bot } from "lucide-react";

export default function FloPage() {
  return (
    <div className="screen-enter flex h-full items-center justify-center px-6 py-10">
      <section className="w-full max-w-3xl rounded-3xl bg-[#111317] p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-accent">
          <Bot className="h-7 w-7" />
        </div>
        <h1 className="font-mono text-3xl font-semibold tracking-tight text-zinc-100">FLO</h1>
        <p className="mt-3 font-mono text-sm text-zinc-400">
          Smart flow controls and AI-assisted actions will appear here.
        </p>
      </section>
    </div>
  );
}
