import type { CSSProperties } from "react";
import { TitleBar } from "./art-chrome";
import art from "../work-art.module.css";
import styles from "./systems-demos.module.css";

type Kind = "polyglot" | "assembly" | "scheduler";
type Preview = { action: string; states: readonly string[] };

const translations = [
  { language: "Python", file: "inc.py", lines: ["def inc(n):", "    return n + 1"] },
  { language: "JavaScript", file: "inc.js", lines: ["const inc = n =>", "  n + 1;"] }
] as const;

const program = ["MOV EAX, 3", "PUSH EAX", "ADD EAX, 2", "POP EBX"] as const;
// Each row records the machine *after* that many instructions have executed.
const registers = [
  { eax: 0, ebx: 0, stack: null, changed: "", state: "Ready. Both registers are zero, the stack is empty, and MOV EAX, 3 is next." },
  { eax: 3, ebx: 0, stack: null, changed: "EAX", state: "MOV set EAX to 3. PUSH EAX is next." },
  { eax: 3, ebx: 0, stack: 3, changed: "STACK", state: "PUSH copied 3 onto the stack. ADD EAX, 2 is next." },
  { eax: 5, ebx: 0, stack: 3, changed: "EAX", state: "ADD set EAX to 5. The stack still holds 3. POP EBX is next." },
  { eax: 5, ebx: 3, stack: null, changed: "EBX", state: "POP moved 3 into EBX and emptied the stack. The program has finished with EAX equal to 5." }
] as const;

type Job = "A" | "B" | "C" | "D";
type Slice = readonly [job: Job, start: number, end: number];
type Schedule = { name: string; finish: number; lanes: readonly (readonly Slice[])[]; state: string };

// All four processes arrive together with CPU bursts A=4, B=2, C=2, D=4.
const schedules = [
  { name: "Arrival order", finish: 8,
    lanes: [[["A", 0, 4], ["D", 4, 8]], [["B", 0, 2], ["C", 2, 4]]],
    state: "Arrival order. Core 0 runs A then D. Core 1 runs B then C and becomes idle. All four jobs finish in eight ticks." },
  { name: "Shortest job first", finish: 6,
    lanes: [[["B", 0, 2], ["A", 2, 6]], [["C", 0, 2], ["D", 2, 6]]],
    state: "Shortest job first. B and C run first, then A and D run together. All four jobs finish in six ticks." },
  { name: "Round robin", finish: 6,
    lanes: [[["A", 0, 2], ["C", 2, 4], ["A", 4, 6]], [["B", 0, 2], ["D", 2, 4], ["D", 4, 6]]],
    state: "Round robin with a two-tick quantum. The core pairs run A and B, C and D, then A and D. All four jobs finish in six ticks." }
] as const satisfies readonly Schedule[];

export const systemsPreviews = {
  polyglot: {
    action: "Change language",
    states: translations.map(({ language }) => `A C function that adds one to its argument is translated into ${language}.`)
  },
  assembly: { action: "Step instruction", states: registers.map(({ state }) => state) },
  scheduler: { action: "Switch schedule", states: schedules.map(({ state }) => state) }
} satisfies Record<Kind, Preview>;

function Polyglot({ step }: { step: number }) {
  const target = translations[step % translations.length];
  return (
    <div className={`${art.instrument} ${art.editor} ${styles.tool} ${styles.translator}`}>
      <TitleBar>polyglot.editor</TitleBar>
      <div className={styles.translationHeading}>
        <b>{"{ }"}</b><strong>Polyglot</strong><span>{target.file}</span>
      </div>
      <div className={styles.panes}>
        <div className={styles.source}>
          <div className={styles.panelLabel}>C</div>
          <code><span>int</span> inc(int n) {"{"}<br />{"  "}<span>return</span> n + 1;<br />{"}"}</code>
        </div>
        <div className={styles.target}>
          <div className={styles.panelLabel}>{target.language}</div>
          <code>{target.lines.map((line, i) =>
            <span key={line} className={styles.codeLine} style={{ "--characters": line.length, "--delay": `${i * .32}s` } as CSSProperties}>
              {line}
            </span>
          )}</code>
          <i className={styles.caret} />
        </div>
      </div>
    </div>
  );
}

function Interpreter({ step }: { step: number }) {
  const index = step % registers.length;
  const machine = registers[index];
  const words = [
    ["EAX", String(machine.eax).padStart(2, "0")],
    ["EBX", String(machine.ebx).padStart(2, "0")],
    ["STACK", machine.stack === null ? "[ ]" : `[${machine.stack}]`]
  ];
  return (
    <div className={`${art.instrument} ${art.processor} ${styles.tool} ${styles.interpreter}`}>
      <TitleBar>instruction.step</TitleBar>
      <div className={styles.debugger}>
        <div className={styles.listing}>
          <div className={styles.debugHeading}><strong>x86</strong><span>{index === program.length ? "Complete" : "Next instruction"}</span></div>
          <ol>{program.map((instruction, i) =>
            <li key={instruction} data-active={i === index}><i />{instruction}</li>
          )}</ol>
        </div>
        <dl className={styles.readouts}>{words.map(([name, value]) =>
          <div key={name} data-changed={name === machine.changed}>
            <dt>{name}</dt><dd>{value}</dd>
          </div>
        )}</dl>
      </div>
    </div>
  );
}

function Lanes({ schedule }: { schedule: Schedule }) {
  return <>{schedule.lanes.map((lane, core) =>
    <div key={core} className={styles.track}>{lane.map(([job, start, end]) =>
      <span key={start} data-job={job} style={{ gridColumn: `${start + 1} / ${end + 1}` }}>{job}</span>
    )}</div>
  )}</>;
}

function Scheduler({ step }: { step: number }) {
  const schedule = schedules[step % schedules.length];
  const timeline = {
    "--finish": `${schedule.finish / 8 * 100}%`,
    "--unplayed": `${(1 - schedule.finish / 8) * 100}%`,
    "--period": `${schedule.finish * .62 + 1.2}s`
  } as CSSProperties;
  return (
    <div className={`${art.instrument} ${art.processor} ${styles.tool} ${styles.scheduler}`}>
      <TitleBar>process.timeline</TitleBar>
      <div className={styles.scheduleBody} style={timeline}>
        <div className={styles.scheduleHeading}><strong>{schedule.name}</strong><span>{schedule.finish} ticks</span></div>
        <div className={styles.graph}>
          <div className={styles.cores}><span>CPU 0</span><span>CPU 1</span></div>
          <div className={styles.chart}>
            <div className={styles.laneSet}><Lanes schedule={schedule} /></div>
            <div className={`${styles.laneSet} ${styles.played}`}><Lanes schedule={schedule} /></div>
            <i className={styles.playhead} />
            <div className={styles.ticks}>{[0, 2, 4, 6, 8].map(t => <span key={t}>{t}</span>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SystemsDemo({ kind, step }: { kind: Kind; step: number }) {
  if (kind === "polyglot") return <Polyglot step={step} />;
  if (kind === "assembly") return <Interpreter step={step} />;
  return <Scheduler step={step} />;
}
