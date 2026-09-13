import { ImageResponse } from "next/og";
import { LOGO_FROM, LOGO_TO } from "@/lib/brand";

export const runtime = "nodejs";
export const dynamic = "force-static";

// 512×512 maskable PWA icon — TradersGrid grid mark, with padding for the safe zone.
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><g stroke="#fff" stroke-opacity="0.30" stroke-width="1"><path d="M11 5v22M21 5v22M5 11h22M5 21h22"/></g><path d="M6 22 L13 16 L18 19 L26 9" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="26" cy="9" r="2.9" fill="#fff"/></svg>`;

export function GET() {
  const mark = `data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${LOGO_FROM} 0%, ${LOGO_TO} 100%)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mark} width={300} height={300} alt="" />
      </div>
    ),
    { width: 512, height: 512 }
  );
}
