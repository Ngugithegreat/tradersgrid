// Minimal, premium backdrop for the whole app. Completely static — no orbs,
// no motion, no market-line motif — just a restrained azure vignette from the
// top and a whisper-faint precision grid that fades out. Institutional calm.
import { BRAND_RGB } from "@/lib/brand";

export function AppBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* soft azure vignette from the top */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(72% 48% at 50% -10%, rgba(${BRAND_RGB},0.09), transparent 62%)`,
        }}
      />
      {/* whisper-faint precision grid, masked to fade toward the middle */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-strong) 1px, transparent 1px), linear-gradient(90deg, var(--grid-strong) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          opacity: 0.45,
          maskImage: "radial-gradient(ellipse 120% 58% at 50% -12%, #000 18%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 120% 58% at 50% -12%, #000 18%, transparent 80%)",
        }}
      />
    </div>
  );
}
