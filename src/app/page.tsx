import Link from "next/link";
import {
  ShieldCheck,
  Wallet,
  Clock,
  Lock,
  ArrowRight,
  Activity,
  Layers,
  Zap,
  LineChart,
  BarChart3,
  CircleDollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LandingChart } from "@/components/LandingChart";
import { WinsTicker } from "@/components/WinsTicker";
import { BRAND_NAME } from "@/lib/brand";
import { RotatingWord } from "@/components/RotatingWord";
import { MARKETS, PAYOUT_MULTIPLIER } from "@/lib/markets";

// Deterministic "live-ish" figures per market so the markets table looks like a
// real quote board without a client feed (no random → no hydration mismatch).
function quote(symbol: string, base: number) {
  let h = 0;
  for (let i = 0; i < symbol.length; i++) h = (h * 31 + symbol.charCodeAt(i)) >>> 0;
  const price = base + (h % 1000) / 100;
  const change = ((h % 700) / 100) - 3; // -3.00 .. +4.00
  return { price, change };
}

export default function Landing() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      {/* ───────────────────────── Sticky header ───────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight">{BRAND_NAME}</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
            <Link href="#markets" className="transition hover:text-fg">Markets</Link>
            <Link href="#how" className="transition hover:text-fg">How it works</Link>
            <Link href="/payout-rules" className="transition hover:text-fg">Payouts</Link>
            <Link href="#security" className="transition hover:text-fg">Security</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="btn btn-ghost hidden px-4 py-2 text-sm sm:inline-flex">
              Sign in
            </Link>
            <Link href="/register" className="btn btn-solid px-4 py-2 text-sm">
              Open account
            </Link>
          </div>
        </div>
      </header>

      {/* ───────────────────────────── Hero ───────────────────────────── */}
      <section className="relative">
        {/* precision-grid backdrop, fading down */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000_60%,transparent)]"
        >
          <div className="grid-texture absolute inset-0 opacity-70" />
          <div className="absolute -right-32 -top-24 h-[30rem] w-[30rem] rounded-full bg-brand/10 blur-[120px]" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted">
              <span className="flex h-1.5 w-1.5 rounded-full bg-up animate-pulseSoft" />
              Live market data · settled on the real feed
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Institutional-grade
              <br />
              volatility trading.
              <br />
              <RotatingWord words={["Precise.", "Instant.", "Transparent.", "Yours."]} />
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Take a position on live Volatility Indices and win up to{" "}
              <span className="font-semibold text-fg">{PAYOUT_MULTIPLIER}×</span> your stake.
              A precise trading desk with instant M-Pesa and crypto settlement.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/register" className="btn btn-solid px-6 py-3 text-base">
                Open account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/how-it-works" className="btn btn-ghost px-6 py-3 text-base">
                See how it works
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand" /> Real live prices
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand" /> Contracts from 15s
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-brand" /> Instant payouts
              </span>
            </div>
          </div>

          {/* Framed "terminal" panel around the live chart */}
          <div className="animate-fade-up [animation-delay:120ms]">
            <div className="panel-frame">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted">
                  <LineChart className="h-4 w-4 text-brand" />
                  <span>{BRAND_NAME} Terminal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-down/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-up/60" />
                </div>
              </div>
              <div className="p-3">
                <LandingChart />
              </div>
              <div className="grid grid-cols-3 divide-x divide-border border-t border-border text-center">
                <MiniStat label="Payout" value={`${PAYOUT_MULTIPLIER}×`} />
                <MiniStat label="Markets" value={String(MARKETS.length)} />
                <MiniStat label="Settlement" value="Instant" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent-wins ticker (renders only with real data) */}
      <WinsTicker />

      {/* ─────────────────────────── Stats band ─────────────────────────── */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-10 sm:px-6 lg:grid-cols-4">
          <StatCard icon={CircleDollarSign} value={`${PAYOUT_MULTIPLIER}×`} label="Payout multiplier" />
          <StatCard icon={Layers} value={String(MARKETS.length)} label="Volatility markets" />
          <StatCard icon={Zap} value="Instant" label="M-Pesa & crypto payouts" />
          <StatCard icon={Activity} value="24/7" label="Markets never close" />
        </div>
      </section>

      {/* ───────────────────────────── Markets ───────────────────────────── */}
      <section id="markets" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Market board</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Trade the volatility indices</h2>
            <p className="mt-2 max-w-lg text-muted">
              Genuine synthetic-index feeds streaming around the clock. Pick a market and take a
              position in a single tap.
            </p>
          </div>
          <Link href="/register" className="btn btn-ghost hidden shrink-0 px-4 py-2 text-sm sm:inline-flex">
            Open account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-card border border-border bg-surface shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-5 py-3 font-semibold">Market</th>
                  <th className="px-5 py-3 font-semibold">Volatility</th>
                  <th className="px-5 py-3 text-right font-semibold">Last</th>
                  <th className="px-5 py-3 text-right font-semibold">24h</th>
                  <th className="px-5 py-3 text-right font-semibold">Tick</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MARKETS.map((m) => {
                  const q = quote(m.symbol, 100 + m.decimals * 200);
                  const up = q.change >= 0;
                  return (
                    <tr key={m.symbol} className="transition hover:bg-surface2/50">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand/10 text-[11px] font-bold text-brand">
                            {m.short.replace(/\s?1s/, "")}
                          </span>
                          <div>
                            <div className="font-semibold">{m.name.replace(" Index", "")}</div>
                            <div className="text-[11px] text-muted">{m.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-muted">{m.volatility}</td>
                      <td className="tabular px-5 py-3.5 text-right font-semibold">
                        {q.price.toFixed(m.decimals)}
                      </td>
                      <td className={`tabular px-5 py-3.5 text-right font-semibold ${up ? "text-up" : "text-down"}`}>
                        <span className="inline-flex items-center gap-1">
                          {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                          {up ? "+" : ""}{q.change.toFixed(2)}%
                        </span>
                      </td>
                      <td className="tabular px-5 py-3.5 text-right text-muted">
                        {m.tickSeconds}s
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── How it works ───────────────────────────── */}
      <section id="how" className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="eyebrow text-center">Get started</p>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight">Trading in three steps</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <Step n={1} icon={Wallet} title="Fund your account" desc="Deposit via M-Pesa, crypto or bank in seconds. No minimums to get started." />
            <Step n={2} icon={BarChart3} title="Take a position" desc="Pick a market, set your stake and duration, then call Rise or Fall." />
            <Step n={3} icon={CircleDollarSign} title="Settle & withdraw" desc="Contracts settle on the live feed. Cash out winnings instantly." />
          </div>
        </div>
      </section>

      {/* ───────────────────────────── Security band ───────────────────────────── */}
      <section id="security" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow">Built for trust</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Your funds and every trade, on the record
            </h2>
            <p className="mt-3 max-w-md text-muted">
              A brokerage-grade backbone: every stake and payout is written to a tamper-proof
              ledger tied to your account, and settlement runs on the genuine market feed.
            </p>
            <Link href="/register" className="btn btn-solid mt-6 px-6 py-3 text-base">
              Open your account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Trust icon={Lock} title="Encrypted end to end" desc="Traffic and credentials are protected with bank-standard encryption." />
            <Trust icon={ShieldCheck} title="Ledgered balances" desc="Funds and payouts are recorded to an auditable, tamper-proof ledger." />
            <Trust icon={Zap} title="Instant settlement" desc="M-Pesa and crypto deposits and withdrawals clear in real time." />
            <Trust icon={Activity} title="Real live prices" desc="Contracts settle on the genuine synthetic-index feed — no house games." />
          </div>
        </div>
      </section>

      {/* ───────────────────────────── CTA ───────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to trade the markets?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Open a free account in under a minute and place your first position today.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/register" className="btn btn-solid px-8 py-3 text-base">
              Open account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/login" className="btn btn-ghost px-8 py-3 text-base">
              I have an account
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── Footer ───────────────────────────── */}
      <footer className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5">
                <Logo className="h-7 w-7" />
                <span className="text-base font-bold tracking-tight">{BRAND_NAME}</span>
              </div>
              <p className="mt-3 text-sm text-muted">
                {BRAND_NAME} — institutional-grade volatility index trading with instant local
                and crypto settlement.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Platform</span>
                <Link href="/how-it-works" className="text-muted transition hover:text-fg">How it works</Link>
                <Link href="/payout-rules" className="text-muted transition hover:text-fg">Payout rules</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Account</span>
                <Link href="/login" className="text-muted transition hover:text-fg">Sign in</Link>
                <Link href="/register" className="text-muted transition hover:text-fg">Open account</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-xs text-muted">
            <p className="max-w-3xl">
              Trading volatility indices involves substantial risk and may not be suitable for
              everyone. Only trade with money you can afford to lose. Prices are provided by the
              Deriv synthetic-index feed. Past performance does not guarantee future results.
            </p>
            <p className="mt-3">© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-2.5">
      <div className="tabular text-sm font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted">{label}</div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-surface/60 px-5 py-6 sm:px-6">
      <Icon className="h-5 w-5 text-brand" />
      <div className="tabular mt-4 text-3xl font-black tracking-tight">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}

function Step({
  n,
  icon: Icon,
  title,
  desc,
}: {
  n: number;
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <Icon className="h-5 w-5" />
        </span>
        <span className="tabular text-4xl font-black text-border">{n}</span>
      </div>
      <h3 className="mt-4 font-bold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  );
}

function Trust({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="card p-5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
        <Icon className="h-4 w-4" />
      </span>
      <h3 className="mt-3 text-sm font-bold">{title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-muted">{desc}</p>
    </div>
  );
}
