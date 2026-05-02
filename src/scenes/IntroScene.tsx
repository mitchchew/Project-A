import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";
import { AnimatedText } from "../components/AnimatedText";
import { GlowingIcon } from "../components/GlowingIcon";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const ringScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 60, mass: 1 },
    durationInFrames: 40,
  });
  const ringSize = interpolate(ringScale, [0, 1], [0, 340]);

  const ring2Scale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 60, mass: 1 },
    durationInFrames: 40,
  });
  const ring2Size = interpolate(ring2Scale, [0, 1], [0, 480]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 50%, #0a1628 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        opacity: fadeOut,
      }}
    >
      <ParticleBackground color="#4488ff" />

      {/* Animated rings */}
      <div
        style={{
          position: "absolute",
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: "2px solid rgba(0, 212, 255, 0.3)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: ring2Size,
          height: ring2Size,
          borderRadius: "50%",
          border: "1px solid rgba(0, 212, 255, 0.15)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div style={{ zIndex: 10, textAlign: "center", padding: "0 80px" }}>
        <GlowingIcon emoji="🤖" delay={5} size={120} glowColor="#00d4ff" />

        <div style={{ height: 30 }} />

        <AnimatedText
          text="Responsible AI"
          delay={15}
          fontSize={72}
          color="#ffffff"
          fontWeight={800}
        />

        <div style={{ height: 16 }} />

        <AnimatedText
          text="Governance Framework"
          delay={22}
          fontSize={48}
          color="#00d4ff"
          fontWeight={600}
        />

        <div style={{ height: 32 }} />

        <AnimatedText
          text="Singapore's 9 Dimensions for Trustworthy AI"
          delay={35}
          fontSize={28}
          color="rgba(255,255,255,0.7)"
          fontWeight={400}
        />

        <div style={{ height: 20 }} />

        <AnimatedText
          text="Training for Mature Audiences · Public Service Division"
          delay={45}
          fontSize={20}
          color="rgba(0, 212, 255, 0.6)"
          fontWeight={400}
        />
      </div>
    </div>
  );
};
