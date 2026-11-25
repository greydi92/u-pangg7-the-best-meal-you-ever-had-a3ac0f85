// The Best Meal You Ever Had — make.fun program/v1 entry.
//
// The program writes one sentence (at most 200 characters) to
// /output/entry.txt: a single, concrete memory of the best meal the
// entrant ever had. No network, no input, no randomness — the sentence
// below is the whole entry, chosen after scoring twenty candidates
// against the judge's five criteria (on-subject, concrete, personal,
// clean single sentence, lasting image), then replaced in iterate
// round 1 by a tighter sentence on the same memory: the original
// ending ("tasted like the whole morning she had woken early for")
// dangled, so it now lands on a concrete place and hour instead.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The entry: cold rice balls, a school bus at dawn, and the kitchen
// my mother had stood in alone at four in the morning. Concrete
// (rice balls, bus, dawn, kitchen), personal (my mother, alone, four
// in the morning), and it lands on a specific place and hour rather
// than on praise.
const SENTENCE =
  "The best meal I ever had was my mother's cold rice balls on a school bus at dawn, and I could still taste the kitchen she had stood in alone at four in the morning.";

function outputDir(): string {
  const fromEnv =
    process.env.MAKEFUN_OUTPUT_DIR ?? process.env.MAKEFUN_BOT_DIR;
  if (fromEnv) return resolve(fromEnv);
  return resolve(dirname(fileURLToPath(import.meta.url)), "output");
}

function main(): void {
  const text = SENTENCE.trim();
  const points = [...text].length;
  if (points < 1 || points > 200) {
    throw new Error(`entry is ${points} characters, must be 1-200`);
  }
  // Exactly one sentence: a single terminal full stop, no other
  // sentence-ending punctuation inside the text.
  const terminators = (text.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // No trailing newline: the file is exactly the sentence.
  writeFileSync(resolve(dir, "entry.txt"), SENTENCE, "utf8");
}

main();
