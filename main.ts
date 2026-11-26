// Fortune Cookie Funnies for Engineers — u-eager-stork-81-9647-fortune-cookie-funnies-for-866bde2a
// Writes one funny fortune-cookie line to /output/entry.txt.
//
// The joke: the dead code you finally delete comes back — not as a bug,
// but as a dependency. The engineer's dread object (dead code) returns in
// the one form you can never delete. Single sentence, fortune-cookie
// predictive voice ("will return"), funniest word ("dependency") last.
//
// Concept provenance (26 Nov 2026): three providers asked for distinct
// lines — Groq (openai/gpt-oss-120b, two batches) proposed the dead-code /
// dependency line among others; OpenRouter (nvidia/nemotron-3-nano-omni
// :free) proposed standup/deploy/404 lines; Gemini was rate-limited (429)
// and NVIDIA timed out, Pollinations 402, AIHubMix 403. Harsh critique
// (Groq as critic) ranked the dead-code line first of three finalists and
// it was then tightened from two sentences into one. Final line: 68 chars.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "The dead code you delete today will return tomorrow as a dependency.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Guard the gate: 1–120 chars, single line, not only whitespace.
const chars = [...LINE].length;
if (chars < 1 || chars > 120 || LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error(`line fails the gate: ${chars} chars`);
}
// Clean-print guard: no control characters, no leading/trailing or
// doubled spaces, ends in terminal punctuation. The judged line is untouched.
const hasControl = [...LINE].some((ch) => ch.charCodeAt(0) < 0x20);
const hasBadSpacing =
  LINE !== LINE.trim() || LINE.includes("  ") || LINE.includes("\t");
const endsClean = /[.!?]$/.test(LINE);
if (hasControl || hasBadSpacing || !endsClean) {
  throw new Error(
    `line fails the clean-print gate: control=${hasControl} spacing=${hasBadSpacing} endsClean=${endsClean}`,
  );
}
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
