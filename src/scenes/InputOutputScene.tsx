import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";

const CheckItem: React.FC<{
  text: string;
  delay: number;
  icon: string;
  color: string;
}> = ({ text, delay, icon, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.4 },
    durationInFrames: 20,
  });

  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        backgroundColor: "rgba(255,255,255,0.06)",
        border: `1px solid ${color}44`,
        borderLeft: `4px solid ${color}`,
        borderRadius: 12,
        padding: "18px 24px",
        marginBottom: 14,
      }}
    >
      <span style={{ fontSize: 28, minWidth: 36 }}>{icon}</span>
      <span
        style={{
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 500,
          fontFamily: "'Segoe UI', Arial, sans-serif",
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const InputOutputScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const arrowOpacity = interpolate(frame - 50, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const INPUT_CHECKS = [
    { icon: "📋", text: "Is the data accurate and up-to-date?", delay: 30, color: "#44aaff" },
    { icon: "🔍", text: "Is the source verified and trustworthy?", delay: 45, color: "#44aaff" },
    { icon: "🔐", text: "Does it contain sensitive or private info?", delay: 60, color: "#44aaff" },
    { icon: "📏", text: "Is the prompt clear and unambiguous?", delay: 75, color: "#44aaff" },
  ];

  const OUTPUT_CHECKS = [
    { icon: "🧠", text: "Is the response factually accurate?", delay: 35, color: "#44ffaa" },
    { icon: "⚖️", text: "Is it free from bias or harmful content?", delay: 50, color: "#44ffaa" },
    { icon: "👤", text: "Has a human reviewed it before publishing?", delay: 65, color: "#44ffaa" },
    { icon: "🏷️", text: "Is it labelled as AI-generated?", delay: 80, color: "#44ffaa" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #050e1a 0%, #0a1a2e 50%, #05101a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        opacity: fadeOut,
        padding: "50px 60px 30px",
      }}
    >
      <ParticleBackground color="#00aaff" />

      <div
        style={{
          zIndex: 10,
          width: "100%",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        <div
          style={{
            fontSize: 52,
            color: "#ffffff",
            fontWeight: 800,
            fontFamily: "'Segoe UI', Arial, sans-serif",
            lineHeight: 1.2,
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Always Check Inputs & Outputs
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'Segoe UI', Arial, sans-serif",
            marginTop: 8,
            opacity: interpolate(frame - 10, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          The Golden Rule of Responsible AI Use
        </div>
      </div>

      <div
        style={{
          zIndex: 10,
          display: "flex",
          gap: 40,
          width: "100%",
          maxWidth: 1100,
        }}
      >
        {/* Input column */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 30,
              color: "#44aaff",
              fontWeight: 700,
              fontFamily: "'Segoe UI', Arial, sans-serif",
              marginBottom: 16,
              opacity: interpolate(frame - 20, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            📥 Before You Input
          </div>
          {INPUT_CHECKS.map((item) => (
            <CheckItem key={item.text} {...item} />
          ))}
        </div>

        {/* Arrow divider */}
        <div
          style={{
            opacity: arrowOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 2,
              height: 140,
              background: "linear-gradient(to bottom, transparent, #ffffff44, transparent)",
            }}
          />
          <div
            style={{
              fontSize: 40,
              filter: "drop-shadow(0 0 15px #ffffff88)",
            }}
          >
            🔄
          </div>
          <div
            style={{
              width: 2,
              height: 140,
              background: "linear-gradient(to bottom, transparent, #ffffff44, transparent)",
            }}
          />
        </div>

        {/* Output column */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 30,
              color: "#44ffaa",
              fontWeight: 700,
              fontFamily: "'Segoe UI', Arial, sans-serif",
              marginBottom: 16,
              opacity: interpolate(frame - 25, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            📤 Before You Publish
          </div>
          {OUTPUT_CHECKS.map((item) => (
            <CheckItem key={item.text} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
