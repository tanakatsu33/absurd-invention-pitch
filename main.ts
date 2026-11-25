import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The mechanism, then the turn in the final clause.
const MECHANISM =
  "The Regret Sponge absorbs any text you sent at 2 a.m. back out of the other person's phone while they sleep, ";
const CLOSING = "returning your dignity by morning — slightly damp, but intact.";

const ENTRY = MECHANISM + CLOSING;

function checkEntry(text: string): void {
  const codePoints = Array.from(text).length;
  if (text.trim().length === 0) {
    throw new Error("entry is empty or only whitespace");
  }
  if (codePoints < 1 || codePoints > 220) {
    throw new Error(`entry must be 1-220 characters, got ${codePoints}`);
  }
}

checkEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
