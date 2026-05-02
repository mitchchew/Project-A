import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { WhyItMattersScene } from "./scenes/WhyItMattersScene";
import { OverviewScene } from "./scenes/OverviewScene";
import { DimensionScene } from "./scenes/DimensionScene";
import { InputOutputScene } from "./scenes/InputOutputScene";
import { OutroScene } from "./scenes/OutroScene";

const DIMENSIONS = [
  {
    number: 1,
    title: "Accountability",
    description:
      "Humans must check and approve all AI-generated content before use. AI augments human judgment — it never replaces it.",
    icon: "👤",
    color: "#ff6b6b",
    particleColor: "#ff4444",
    bgGradient: "linear-gradient(135deg, #1a0808 0%, #2e0d0d 50%, #1a0808 100%)",
    actionTip: "Always get a human to review AI outputs before publishing",
  },
  {
    number: 2,
    title: "Data Integrity",
    description:
      "Ensure the data used to ground the AI — such as via Retrieval-Augmented Generation (RAG) — is accurate, current, and verified.",
    icon: "🗄️",
    color: "#ffa94d",
    particleColor: "#ff8800",
    bgGradient: "linear-gradient(135deg, #1a1008 0%, #2e1a05 50%, #1a1008 100%)",
    actionTip: "Verify your data sources are accurate and up-to-date before inputting",
  },
  {
    number: 3,
    title: "Trusted Environments",
    description:
      'Use "Secure-by-Design" infrastructure. AI systems must operate within protected environments that prevent data leaks and unauthorised access.',
    icon: "🔒",
    color: "#ffe066",
    particleColor: "#ffcc00",
    bgGradient: "linear-gradient(135deg, #1a1800 0%, #2e2a00 50%, #1a1800 100%)",
    actionTip: "Only use approved, secure platforms for sensitive AI work",
  },
  {
    number: 4,
    title: "Transparency",
    description:
      "Clearly state when GenAI has been used to generate a public-facing response. Citizens and stakeholders have a right to know.",
    icon: "💡",
    color: "#69db7c",
    particleColor: "#44cc44",
    bgGradient: "linear-gradient(135deg, #081a09 0%, #0d2e10 50%, #081a09 100%)",
    actionTip: "Always disclose when content was generated or assisted by AI",
  },
  {
    number: 5,
    title: "Reporting & Testing",
    description:
      "Conduct regular red-teaming and safety testing to identify hallucinations, biases, or harmful outputs before they reach the public.",
    icon: "🧪",
    color: "#4dabf7",
    particleColor: "#2288ff",
    bgGradient: "linear-gradient(135deg, #080f1a 0%, #0d1a2e 50%, #080f1a 100%)",
    actionTip: "Test AI outputs rigorously — especially for edge cases and bias",
  },
  {
    number: 6,
    title: "Content Provenance",
    description:
      "Use watermarking or digital signatures to verify the authenticity of government media. Prevent forgery and build public trust.",
    icon: "🏷️",
    color: "#cc5de8",
    particleColor: "#aa22cc",
    bgGradient: "linear-gradient(135deg, #130818 0%, #200d2e 50%, #130818 100%)",
    actionTip: "Tag and sign AI-generated media to prove its origin and authenticity",
  },
];

export const ResponsibleAI: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        {/* Intro: 120 frames = 4s */}
        <Series.Sequence durationInFrames={120}>
          <IntroScene />
        </Series.Sequence>

        {/* Why it matters: 150 frames = 5s */}
        <Series.Sequence durationInFrames={150}>
          <WhyItMattersScene />
        </Series.Sequence>

        {/* Overview of all 6 dimensions: 120 frames = 4s */}
        <Series.Sequence durationInFrames={120}>
          <OverviewScene />
        </Series.Sequence>

        {/* Each dimension: 120 frames = 4s each */}
        {DIMENSIONS.map((dim) => (
          <Series.Sequence key={dim.number} durationInFrames={120}>
            <DimensionScene {...dim} />
          </Series.Sequence>
        ))}

        {/* Input/Output checklist: 150 frames = 5s */}
        <Series.Sequence durationInFrames={150}>
          <InputOutputScene />
        </Series.Sequence>

        {/* Outro: 150 frames = 5s */}
        <Series.Sequence durationInFrames={150}>
          <OutroScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
