import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface GlowingIconProps {
  emoji: string;
  delay?: number;
  size?: number;
  glowColor?: string;
}

export const GlowingIcon: React.FC<GlowingIconProps> = ({
  emoji,
  delay = 0,
  size = 80,
  glowColor = "#00d4ff",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 8, stiffness: 120, mass: 0.4 },
    durationInFrames: 25,
  });

  const pulse = interpolate(
    Math.sin((frame * Math.PI * 2) / 60),
    [-1, 1],
    [0.8, 1.2]
  );

  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale * (0.95 + pulse * 0.05)})`,
        fontSize: size,
        filter: `drop-shadow(0 0 20px ${glowColor}) drop-shadow(0 0 40px ${glowColor}80)`,
        lineHeight: 1,
        textAlign: "center",
      }}
    >
      {emoji}
    </div>
  );
};
