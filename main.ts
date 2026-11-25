import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke has two beats, joined into one sentence.
// 1. The absurd mechanism, stated flatly as if it were a real product spec.
const MECHANISM =
  "The Regret Sponge absorbs any text you sent at 2 a.m. back out of the other person's phone while they sleep, ";
// 2. The closing turn: the payoff, undercut by a deadpan side effect.
const CLOSING = "returning your dignity by morning — slightly damp, but intact.";

const ENTRY = MECHANISM + CLOSING;

// Maximum entry length in Unicode code points (not UTF-16 units or bytes).
const MAX_CODE_POINTS = 220;

// Reject entries that are blank, multi-line, or too long.
function checkEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry is empty or only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line (no line breaks)");
  }
  // Array.from splits by code point, so the em dash counts as one character.
  const codePoints = Array.from(text).length;
  if (codePoints > MAX_CODE_POINTS) {
    throw new Error(
      `entry must be at most ${MAX_CODE_POINTS} characters, got ${codePoints}`,
    );
  }
}

checkEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
