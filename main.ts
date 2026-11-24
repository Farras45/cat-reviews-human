import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-star review written by a house cat about its human.
// 108 characters, one line, no trailing newline in the file.
const ENTRY =
  "One star. My human types on my warm laptop all day, then moves me off it like I'm the one with no job to do.";

// Count characters as code points so the gate's 1-200 range is checked
// the same way for any text, not just ASCII.
const charCount = Array.from(ENTRY).length;

if (charCount < 1 || charCount > 200) {
  throw new Error(`entry must be 1-200 characters, got ${charCount}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
