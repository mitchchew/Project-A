import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";

const TAKEAWAYS = [
  "Always verify inputs — use accurate, trusted data",
  "Always review outputs — check before you publish",
  "Be transparent — label AI-generated content",
  "Stay accountable — humans remain responsible",
];

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const checkScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 8, stiffness: 80, mass: 0.6 },
    durationInFrames: 35,
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #061a0e 0%, #0d2e1a 50%, #061a0e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        opacity: fadeIn,
        padding: "50px 80px",
      }}
    >
      <ParticleBackground color="#00ff88" />

      {/* Large checkmark */}
      <div
        style={{
          transform: `scale(${checkScale})`,
          fontSize: 100,
          filter: "drop-shadow(0 0 30px #00ff88) drop-shadow(0 0 60px #00ff8860)",
          marginBottom: 30,
          zIndex: 10,
        }}
      >
        ✅
      </div>

      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          width: "100%",
          maxWidth: 900,
        }}
      >
        <div
          style={{
            fontSize: 58,
            color: "#ffffff",
            fontWeight: 800,
            fontFamily: "'Segoe UI', Arial, sans-serif",
            lineHeight: 1.2,
            marginBottom: 14,
            opacity: interpolate(frame - 20, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Key Takeaways
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#00ff88",
            fontFamily: "'Segoe UI', Arial, sans-serif",
            marginBottom: 36,
            opacity: interpolate(frame - 30, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Be the human check in the AI loop
        </div>

        <div style={{ textAlign: "left", maxWidth: 780, margin: "0 auto" }}>
          {TAKEAWAYS.map((item, i) => {
            const delay = 45 + i * 18;
            const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const x = interpolate(frame - delay, [0, 20], [-30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={item}
                style={{
                  opacity,
                  transform: `translateX(${x}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 16,
                  backgroundColor: "rgba(0, 255, 136, 0.08)",
                  borderLeft: "4px solid #00ff88",
                  borderRadius: "0 12px 12px 0",
                  padding: "14px 24px",
                }}
              >
                <span style={{ fontSize: 26, minWidth: 32 }}>{"→"}</span>
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: 22,
                    fontWeight: 500,
                    fontFamily: "'Segoe UI', Arial, sans-serif",
                    lineHeight: 1.4,
                  }}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 40,
            opacity: interpolate(frame - 110, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontSize: 20,
            color: "rgba(255,255,255,0.45)",
            fontFamily: "'Segoe UI', Arial, sans-serif",
          }}
        >
          Singapore Model AI Governance Framework for Generative AI · IM8 Compliant Training
        </div>
      </div>
    </div>
  );
};
