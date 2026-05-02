import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { ParticleBackground } from "../components/ParticleBackground";

interface DimensionSceneProps {
  number: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  particleColor: string;
  bgGradient: string;
  actionTip: string;
}

export const DimensionScene: React.FC<DimensionSceneProps> = ({
  number,
  title,
  description,
  icon,
  color,
  particleColor,
  bgGradient,
  actionTip,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const iconScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 8, stiffness: 100, mass: 0.5 },
    durationInFrames: 30,
  });

  const titleOpacity = interpolate(frame - 20, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame - 20, [0, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const descOpacity = interpolate(frame - 35, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descY = interpolate(frame - 35, [0, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tipOpacity = interpolate(frame - 55, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tipScale = spring({
    frame: frame - 55,
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.5 },
    durationInFrames: 20,
  });

  const pulse = 1 + Math.sin((frame * Math.PI * 2) / 90) * 0.04;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bgGradient,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        opacity: fadeOut,
        padding: "40px 80px",
      }}
    >
      <ParticleBackground color={particleColor} />

      {/* Dimension number badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          backgroundColor: `${color}22`,
          border: `2px solid ${color}66`,
          borderRadius: 50,
          padding: "8px 20px",
          zIndex: 10,
        }}
      >
        <span
          style={{
            color: color,
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "'Segoe UI', Arial, sans-serif",
          }}
        >
          Dimension {number} of 9
        </span>
      </div>

      <div
        style={{
          zIndex: 10,
          textAlign: "center",
          maxWidth: 900,
          width: "100%",
        }}
      >
        {/* Icon */}
        <div
          style={{
            transform: `scale(${iconScale * pulse})`,
            fontSize: 110,
            filter: `drop-shadow(0 0 30px ${color}) drop-shadow(0 0 60px ${color}60)`,
            lineHeight: 1,
            marginBottom: 30,
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 64,
            color: "#ffffff",
            fontWeight: 800,
            fontFamily: "'Segoe UI', Arial, sans-serif",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
            fontSize: 28,
            color: "rgba(255,255,255,0.8)",
            fontWeight: 400,
            fontFamily: "'Segoe UI', Arial, sans-serif",
            lineHeight: 1.5,
            marginBottom: 40,
            maxWidth: 820,
            margin: "0 auto 40px",
          }}
        >
          {description}
        </div>

        {/* Action tip */}
        <div
          style={{
            opacity: tipOpacity,
            transform: `scale(${tipScale})`,
            backgroundColor: `${color}22`,
            border: `2px solid ${color}88`,
            borderRadius: 16,
            padding: "20px 32px",
            display: "inline-block",
          }}
        >
          <span
            style={{
              color: color,
              fontSize: 24,
              fontWeight: 700,
              fontFamily: "'Segoe UI', Arial, sans-serif",
            }}
          >
            ✅ {actionTip}
          </span>
        </div>
      </div>
    </div>
  );
};
