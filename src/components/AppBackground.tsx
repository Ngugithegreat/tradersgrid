// High-end, theme-blended backdrop for the whole app: a soft colour mesh, a
// faint grid that fades out, glowing orbs, and a subtle upward "market line"
// motif along the bottom. Static so it never distracts while trading.
import { BRAND_RGB } from "@/lib/brand";

export function AppBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* restrained azure wash — top corners only, no pink */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            `radial-gradient(58% 42% at 12% -4%, rgba(${BRAND_RGB},0.14), transparent 60%),` +
            `radial-gradient(52% 42% at 100% 12%, rgba(${BRAND_RGB},0.09), transparent 62%)`,
        }}
      />
      {/* faint precision grid, masked to fade toward the middle */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-strong) 1px, transparent 1px), linear-gradient(90deg, var(--grid-strong) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 110% 65% at 50% -12%, #000 28%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 110% 65% at 50% -12%, #000 28%, transparent 80%)",
        }}
      />
      {/* a single soft azure glow, top-left */}
      <div className="absolute -top-40 left-[10%] h-[34rem] w-[34rem] rounded-full bg-brand/10 blur-[130px]" />

      {/* subtle upward market line along the bottom */}
      <svg
        className="absolute inset-x-0 bottom-0 h-1/2 w-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="bgfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${BRAND_RGB},0.16)`} />
            <stop offset="100%" stopColor={`rgba(${BRAND_RGB},0)`} />
          </linearGradient>
        </defs>
        <path
          d="M0 340 L120 320 L240 350 L360 300 L480 320 L600 250 L720 280 L840 200 L960 230 L1080 150 L1200 180 L1200 400 L0 400 Z"
          fill="url(#bgfill)"
        />
        <path
          d="M0 340 L120 320 L240 350 L360 300 L480 320 L600 250 L720 280 L840 200 L960 230 L1080 150 L1200 180"
          stroke={`rgba(${BRAND_RGB},0.35)`}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
