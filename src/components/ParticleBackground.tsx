import React from "react";
import { useCurrentFrame } from "remotion";

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (i * 137.5) % 100,
  y: (i * 73.1) % 100,
  size: 2 + (i % 4),
  speed: 0.2 + (i % 5) * 0.1,
  opacity: 0.1 + (i % 4) * 0.08,
}));

export const ParticleBackground: React.FC<{ color?: string }> = ({
  color = "#00d4ff",
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {PARTICLES.map((p) => {
        const y = ((p.y + frame * p.speed) % 110) - 5;
        const x = p.x + Math.sin((frame * 0.02 + p.id) * 1) * 3;
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: p.opacity,
            }}
          />
        );
      })}
    </div>
  );
};
