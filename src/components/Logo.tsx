import { LOGO_FROM, LOGO_TO } from "@/lib/brand";

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  // TradersGrid mark: a precision grid (the "Grid") with a rising trade line
  // and a live node at the crest — an azure brokerage tile. Deliberately
  // geometric and institutional, distinct from a sine-wave / blob look.
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="32" height="32" rx="8" fill="url(#tg)" />
      <rect width="32" height="32" rx="8" fill="url(#tgloss)" fillOpacity="0.3" />
      {/* precision grid */}
      <g stroke="#fff" strokeOpacity="0.22" strokeWidth="1">
        <path d="M11 5v22M21 5v22M5 11h22M5 21h22" />
      </g>
      {/* rising trade line across the grid */}
      <path
        d="M6 22 L13 16 L18 19 L26 9"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* live node at the crest */}
      <circle cx="26" cy="9" r="2.7" fill="#fff" />
      <circle cx="26" cy="9" r="2.7" fill="url(#tg)" fillOpacity="0.2" />
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor={LOGO_FROM} />
          <stop offset="1" stopColor={LOGO_TO} />
        </linearGradient>
        <linearGradient id="tgloss" x1="16" y1="0" x2="16" y2="32">
          <stop stopColor="#fff" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
    </svg>
  );
}
