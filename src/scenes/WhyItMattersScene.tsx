import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";
import { AnimatedText } from "../components/AnimatedText";

const RISKS = [
  { icon: "⚠️", label: "AI Hallucinations", delay: 30 },
  { icon: "🔓", label: "Data Leaks", delay: 45 },
  { icon: "🎭", label: "Deepfakes & Misinformation", delay: 60 },
  { icon: "⚖️", label: "Bias & Discrimination", delay: 75 },
];

const RiskCard: React.FC<{
  icon: string;
  label: string;
  delay: number;
  index: number;
}> = ({ icon, label, delay, index }) => {
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

  const directions = [-1, 1, -1, 1];
  const x = interpolate(scale, [0, 1], [60 * directions[index % 4], 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px) scale(${0.8 + scale * 0.2})`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        backgroundColor: "rgba(255, 60, 60, 0.15)",
        border: "1px solid rgba(255, 80, 80, 0.4)",
        borderRadius: 12,
        padding: "16px 24px",
        minWidth: 260,
      }}
    >
      <span style={{ fontSize: 36 }}>{icon}</span>
      <span
        style={{
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 600,
          fontFamily: "'Segoe UI', Arial, sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const WhyItMattersScene: React.FC = () => {
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
        background: "linear-gradient(135deg, #1a0a0a 0%, #2d0f0f 50%, #1a0d0d 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        opacity: fadeOut,
        padding: "60px 80px",
      }}
    >
      <ParticleBackground color="#ff4444" />

      <div style={{ zIndex: 10, textAlign: "center", width: "100%" }}>
        <AnimatedText
          text="Why Does This Matter?"
          delay={5}
          fontSize={58}
          color="#ffffff"
          fontWeight={800}
        />

        <div style={{ height: 12 }} />

        <AnimatedText
          text="AI is powerful — but unchecked AI creates real risks"
          delay={15}
          fontSize={28}
          color="rgba(255, 150, 100, 0.9)"
          fontWeight={400}
        />

        <div style={{ height: 50 }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          {RISKS.map((risk, i) => (
            <RiskCard key={risk.label} {...risk} index={i} />
          ))}
        </div>

        <div style={{ height: 40 }} />

        <AnimatedText
          text="→  Always verify inputs AND outputs when working with AI systems"
          delay={90}
          fontSize={26}
          color="#ffcc44"
          fontWeight={700}
        />
      </div>
    </div>
  );
};
