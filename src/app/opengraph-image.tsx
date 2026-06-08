import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Polar26 - From brand to business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand fonts (satori supports woff/ttf/otf, not woff2)
const SYNE_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/syne@5/files/syne-latin-800-normal.woff";
const GROTESK_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5/files/space-grotesk-latin-400-normal.woff";

export default async function Image() {
  let fonts:
    | { name: string; data: ArrayBuffer; weight: 400 | 800; style: "normal" }[]
    | undefined;

  try {
    const [syne, grotesk] = await Promise.all([
      fetch(SYNE_URL).then((r) => {
        if (!r.ok) throw new Error("font fetch failed");
        return r.arrayBuffer();
      }),
      fetch(GROTESK_URL).then((r) => {
        if (!r.ok) throw new Error("font fetch failed");
        return r.arrayBuffer();
      }),
    ]);
    fonts = [
      { name: "Syne", data: syne, weight: 800, style: "normal" },
      { name: "Space Grotesk", data: grotesk, weight: 400, style: "normal" },
    ];
  } catch {
    fonts = undefined;
  }

  const displayFamily = fonts ? "Syne" : "system-ui, sans-serif";
  const bodyFamily = fonts ? "Space Grotesk" : "system-ui, sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#0A0A0A",
          fontFamily: bodyFamily,
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: "60px",
            height: "4px",
            background: "#BDFF00",
            marginBottom: "32px",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontFamily: displayFamily,
            fontSize: "150px",
            fontWeight: 800,
            color: "#FAFAFA",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            textTransform: "uppercase",
          }}
        >
          POLAR26
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#A1A1A1",
            marginTop: "24px",
            letterSpacing: "0.02em",
          }}
        >
          From brand to business.
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#BDFF00",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            polar26.com
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts ? { fonts } : {}) }
  );
}
