import type { CSSProperties } from "react";
import art from "../work-art.module.css";
import { ClawSprite, TitleBar } from "./art-chrome";
import styles from "./product-demos.module.css";

const searches = [
  { query: "next follow-up", answer: "Send the pilot brief", source: "meeting-notes.md" },
  { query: "account owner", answer: "Jordan Lee", source: "sample-contact.json" },
  { query: "pilot status", answer: "In technical review", source: "pipeline-notes.md" }
];

const reports = [
  { title: "Portfolio value", millions: [12, 16, 14, 19], ceiling: 22 },
  { title: "Contributions", millions: [3, 6, 4, 5], ceiling: 7 },
  { title: "Distributions", millions: [2, 1, 3, 4], ceiling: 5 }
];

const exercises = [
  {
    equation: "y = (x − 1)²", question: "Find the vertex.", answer: "(1, 0)",
    describe: "The parabola has its vertex at (1, 0).",
    fn: (x: number) => (x - 1) ** 2, start: -1.22, end: 3, point: [1, 0]
  },
  {
    equation: "y = 2x + 1", question: "Find the y-intercept.", answer: "(0, 1)",
    describe: "The line crosses the y-axis at (0, 1).",
    fn: (x: number) => 2 * x + 1, start: -1, end: 2, point: [0, 1]
  },
  {
    equation: "y = |x + 1|", question: "Find the x-intercept.", answer: "(−1, 0)",
    describe: "The absolute value graph touches the x-axis at (negative 1, 0).",
    fn: (x: number) => Math.abs(x + 1), start: -3, end: 3, point: [-1, 0]
  }
];

export const productPreviews = {
  hubclaw: {
    action: "Next query",
    states: searches.map(({ query, answer, source }) => `Sample CRM search for ${query}. ${answer}. Cited from ${source}.`)
  },
  dashboard: {
    action: "Change dataset",
    states: reports.map(({ title, millions }) => `Illustrative ${title.toLowerCase()}, in millions of dollars. ${millions.map((value, i) => `Quarter ${i + 1}, ${value}`).join(". ")}.`)
  },
  sat: { action: "Next exercise", states: exercises.map(exercise => `${exercise.question} ${exercise.describe}`) }
} satisfies Record<string, { action: string; states: readonly string[] }>;

function ResearchTerminal({ step }: { step: number }) {
  const search = searches[step % searches.length];
  const command = `find "${search.query}"`;
  const timing = { "--characters": command.length } as CSSProperties;

  return (
    <div className={`${art.instrument} ${art.terminal} ${styles.terminal}`}>
      <TitleBar>hubclaw.sh</TitleBar>
      <div className={`${art.terminalGlass} ${styles.glass}`}>
        <div className={`${art.terminalWordmark} ${styles.wordmark}`}>
          <ClawSprite />
          <div><strong>HubClaw</strong><small>SAMPLE CRM</small></div>
        </div>
        <div className={styles.session}>
          <p className={styles.command}><b>❯</b><span style={timing}>{command}</span></p>
          <p className={styles.result}><b>↳</b>{search.answer}</p>
          <p className={styles.citation}><b>[1]</b>{search.source}</p>
        </div>
      </div>
    </div>
  );
}

function InvestorReport({ step }: { step: number }) {
  const report = reports[step % reports.length];
  const points = report.millions.map((value, index) => ({ x: 3 + index * 76, y: 66 - value / report.ceiling * 64 }));
  const line = points.map(({ x, y }, i) => `${i ? "L" : "M"}${x} ${y.toFixed(2)}`).join(" ");
  const last = points[points.length - 1];

  return (
    <div className={`${art.instrument} ${art.report} ${styles.report}`}>
      <TitleBar>lp_dashboard · sample data</TitleBar>
      <div className={art.reportMain}>
        <div className={art.reportNav}><b>LP<span>.</span></b><i /><i /><i /><i /></div>
        <div className={`${art.plotPanel} ${styles.reportBody}`}>
          <div className={art.plotHeader}><strong>{report.title}</strong></div>
          <div className={`${art.plot} ${styles.chart}`}>
            <svg viewBox="0 0 234 68" preserveAspectRatio="none" fill="none">
              <path className={styles.chartArea} d={`${line} L231 68 H3 Z`} />
              <path d={line} stroke="#ccc3a3" strokeWidth="2" />
              <path d={line} className={styles.chartTrace} pathLength="100" />
              {points.map(({ x, y }) => <circle key={x} cx={x} cy={y} r="2.8" fill="#fff3ce" stroke="#4e584f" strokeWidth="1.5" />)}
              <circle cx={last.x} cy={last.y} r="3" className={styles.chartPulse} />
            </svg>
          </div>
          <div className={styles.values}>
            {report.millions.map((value, index) => <div key={index}><span>Q{index + 1}</span><b>${value}m</b></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// Convert mathematical coordinates to a fixed six-unit graph on the worksheet.
function graphPoint(x: number, y: number) {
  return [60 + 18 * x, 95 - 17 * y];
}

function MathExercise({ step }: { step: number }) {
  const exercise = exercises[step % exercises.length];
  const curve = Array.from({ length: 61 }, (_, i) => {
    const x = exercise.start + (exercise.end - exercise.start) * i / 60;
    return graphPoint(x, exercise.fn(x)).map(v => v.toFixed(2)).join(" ");
  }).join(" L");
  const [x, y] = graphPoint(exercise.point[0], exercise.point[1]);

  return (
    <div className={`${art.instrument} ${art.exam} ${styles.worksheet}`}>
      <div className={art.examRule}>SMARTSTART <span>SAT MATH</span></div>
      <div className={styles.exercise}>
        <div className={styles.problem}>
          <strong>{exercise.equation}</strong>
          <p>{exercise.question}</p>
          <div className={styles.solution}>Answer <b>{exercise.answer}</b></div>
        </div>
        <div className={styles.graph}>
          <svg viewBox="0 0 120 116" fill="none">
            <path d="M6 95H114 M60 8V112" stroke="#ae996d" strokeWidth="1.6" />
            <path d={`M${curve}`} stroke="#dcc49e" strokeWidth="2.5" />
            <path d={`M${curve}`} className={styles.inkTrace} pathLength="100" />
            <circle cx={x} cy={y} r="3.2" fill="#7b482f" />
            <circle cx={x} cy={y} r="6.1" className={styles.answerRing} />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function ProductDemo({ kind, step }: { kind: keyof typeof productPreviews; step: number }) {
  switch (kind) {
    case "hubclaw": return <ResearchTerminal step={step} />;
    case "dashboard": return <InvestorReport step={step} />;
    case "sat": return <MathExercise step={step} />;
  }
}
