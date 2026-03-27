import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FeeBreaker — Know What You Keep After Fees";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
            }}
          >
            ⚡
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: "900",
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            FeeBreaker
          </div>
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#a7f3d0",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Know exactly what you keep after Stripe, PayPal, and payment fees
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "48px",
          }}
        >
          {["Fee Calculator", "Invoice Generator", "Margin Calculator"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "12px",
                padding: "12px 24px",
                color: "white",
                fontSize: "22px",
                fontWeight: "600",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
