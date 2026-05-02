import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const ENTRY = path.join(__dirname, "src/index.ts");
const OUT = path.join(__dirname, "out/responsible-ai.mp4");

console.log("Bundling...");
const bundled = await bundle({
  entryPoint: ENTRY,
  webpackOverride: (c) => c,
});

console.log("Selecting composition...");
const composition = await selectComposition({
  serveUrl: bundled,
  id: "ResponsibleAI",
  browserExecutable: CHROME,
  chromiumOptions: {
    args: ["--headless=new", "--no-sandbox", "--disable-setuid-sandbox"],
  },
});

console.log(`Rendering ${composition.durationInFrames} frames...`);
await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: OUT,
  browserExecutable: CHROME,
  chromiumOptions: {
    args: ["--headless=new", "--no-sandbox", "--disable-setuid-sandbox"],
  },
  onProgress: ({ progress }) => {
    process.stdout.write(`\rRendering: ${Math.round(progress * 100)}%`);
  },
});

console.log("\nDone! →", OUT);
