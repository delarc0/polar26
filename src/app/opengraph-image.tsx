import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Polar26 - From brand to business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          fontFamily: "system-ui, sans-serif",
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
            fontSize: "96px",
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
    { ...size }
  );
}
