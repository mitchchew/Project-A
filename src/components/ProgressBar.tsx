import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface ProgressBarProps {
  totalScenes: number;
  currentScene: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  totalScenes,
  currentScene,
}) => {
  const frame = useCurrentFrame();
  const progress = (currentScene / totalScenes) * 100;

  const opacity = interpolate(frame, [0, 10], [0, 0.7], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 60,
        right: 60,
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        {Array.from({ length: totalScenes }).map((_, i) => (
          <div
            key={i}
            style={{
              width: `${90 / totalScenes}%`,
              height: 4,
              borderRadius: 2,
              backgroundColor: i < currentScene ? "#00d4ff" : "rgba(255,255,255,0.3)",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};
