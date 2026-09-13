// Brand for the whole app. Defaults to "TradersGrid"; override per deployment
// with NEXT_PUBLIC_BRAND_NAME. NEXT_PUBLIC_ vars are inlined at build time so it
// works in both client and server code.
export const BRAND_NAME = (process.env.NEXT_PUBLIC_BRAND_NAME || "TradersGrid").trim();
export const BRAND_TAGLINE = "Institutional-grade volatility trading";

// Logo mark gradient — azure → deep blue.
export const LOGO_FROM = "#4D94FF";
export const LOGO_TO = "#1E63E9";

// Brand accent as concrete hex/rgb, for places that can't use the CSS token
// (canvas charts, Recharts, emails, inline SVG).
export const BRAND_HEX = "#2E7CF6";
export const BRAND_HEX_LIGHT = "#5AA0FF";
export const BRAND_HEX_DARK = "#1E63E9";
export const BRAND_RGB = "46,124,246";
export const IS_ALT_BRAND = false;
