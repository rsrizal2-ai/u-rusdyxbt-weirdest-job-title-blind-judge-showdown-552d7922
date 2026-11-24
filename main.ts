// Weirdest Job Title: Blind Judge Showdown — entry program (program/v1).
//
// Writes a single job title, 60 characters or fewer and nothing else, to
// /output/entry.txt.
//
// The title was chosen against the judge's brief, in the order the judge
// weighs things:
//   1. A weird job title, a few words naming an odd job.
//   2. Stranger than ordinary work: nobody has heard of relocating
//      penguins as a career — a gloriously odd twist on a sober
//      corporate title.
//   3. Funny on the first read: the dead-serious "Senior ... Coordinator"
//      frame collides with penguins, who need no relocating.
//   4. Sounds like a real job: it reads exactly like a genuine
//      conservation / logistics title, specific enough to picture the
//      person doing it — clipboard, waddling queue, relocation forms.
//   5. Reads instantly at a glance: four plain words, 37 characters.
//
// The title: Senior Penguin Relocation Coordinator. 37 characters.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TITLE = "Senior Penguin Relocation Coordinator";

// Gate self-check, mirroring ONLY the sealed scorer: UTF-8 text of 1 to
// 60 characters, not only white space.
function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 60) {
    throw new Error(`title is ${chars} characters, outside the 1-60 gate`);
  }
  if (!line.trim()) {
    throw new Error("title is only white space");
  }
}

gate(TITLE);
// The harness runs the program with MAKEFUN_OUTPUT_DIR=/output; honour
// it when set so a local re-run lands in the same place as the grade.
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, TITLE, "utf8");
// Read the file back and re-run the same gate on exactly what was
// written, so a truncated or mangled write fails loudly here instead of
// silently reaching the sealed scorer.
gate(readFileSync(`${OUT_DIR}/entry.txt`, "utf8"));
