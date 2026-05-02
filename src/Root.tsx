import React from "react";
import { Composition } from "remotion";
import { ResponsibleAI } from "./ResponsibleAI";

// Total frames: 120 + 150 + 120 + (6 × 120) + 150 + 150 = 1410 frames = 47s at 30fps
const TOTAL_FRAMES = 1410;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ResponsibleAI"
      component={ResponsibleAI}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
