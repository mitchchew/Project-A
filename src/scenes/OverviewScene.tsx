import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";

const DIMENSIONS = [
  { icon: "👤", label: "Accountability", color: "#ff6b6b" },
  { icon: "🗄️", label: "Data Integrity", color: "#ffa94d" },
  { icon: "🔒", label: "Trusted Envs", color: "#ffe066" },
  { icon: "💡", label: "Transparency", color: "#69db7c" },
  { icon: "🧪", label: "Reporting & Testing", color: "#4dabf7" },
  { icon: "🏷️", label: "Content Provenance", color: "#cc5de8" },
];

const DimCard: React.FC<{
  icon: string;
  label: string;
  color: string;
  delay: number;
  index: number;
}> = ({ icon, label, color, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.5 },
    durationInFrames: 20,
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const row = Math.floor(index / 3);
  const col = index % 3;
  const startX = col % 2 === 0 ? -40 : 40;
  const startY = row === 0 ? -30 : 30;
  const x = interpolate(scale, [0, 1], [startX, 0]);
  const y = interpolate(scale, [0, 1], [startY, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translate(${x}px, ${y}px) scale(${0.85 + scale * 0.15})`,
        backgroundColor: `${color}15`,
        border: `1.5px solid ${color}55`,
        borderRadius: 16,
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        cursor: "default",
      }}
    >
      <span
        style={{
          fontSize: 48,
          filter: `drop-shadow(0 0 12px ${color})`,
        }}
      >
        {icon}
      </span>
      <span
        style={{
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 600,
          fontFamily: "'Segoe UI', Arial, sans-serif",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const OverviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #080818 0%, #0f1530 50%, #080e20 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        opacity: fadeOut,
        padding: "50px 70px 30px",
      }}
    >
      <ParticleBackground color="#8888ff" />

      <div style={{ zIndex: 10, textAlign: "center", width: "100%", marginBottom: 40 }}>
        <div
          style={{
            fontSize: 52,
            color: "#ffffff",
            fontWeight: 800,
            fontFamily: "'Segoe UI', Arial, sans-serif",
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          The 6 Core Dimensions
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.55)",
            fontFamily: "'Segoe UI', Arial, sans-serif",
            marginTop: 10,
            opacity: interpolate(frame - 10, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          Singapore Model AI Governance Framework · IM8 Aligned
        </div>
      </div>

      <div
        style={{
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
          width: "100%",
          maxWidth: 980,
        }}
      >
        {DIMENSIONS.map((dim, i) => (
          <DimCard
            key={dim.label}
            {...dim}
            delay={20 + i * 12}
            index={i}
          />
        ))}
      </div>

      <div
        style={{
          zIndex: 10,
          marginTop: 36,
          opacity: interpolate(frame - 100, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontSize: 22,
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Segoe UI', Arial, sans-serif",
          fontStyle: "italic",
        }}
      >
        Each dimension safeguards trust at a different layer of AI use
      </div>
    </div>
  );
};
