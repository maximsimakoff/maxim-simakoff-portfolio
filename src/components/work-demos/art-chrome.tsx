import type { ReactNode } from "react";
import styles from "../work-art.module.css";

// Each character is one display pixel in the phosphor crab sprite.
const clawRows = [
  "  aa             aa  ",
  " aaa a         a aaa ",
  " aaa aa       aa aaa ",
  " aaaaaa       aaaaaa ",
  "  aaaa         aaaa  ",
  "   aa  a     a  aa   ",
  "    aa aaaaaaa aa    ",
  "     aaaaaaaaaaa     ",
  "    aaaXaaaaaXaaa    ",
  "  aaaaaaaaaaaaaaaaa  ",
  " aa aaaaaaaaaaaaa aa ",
  "  a   aaaaaaaaa   a  ",
  " aa  a aaa aaa a  aa ",
  "    aa  aa aa  aa    ",
];

const pixels = clawRows.flatMap((row, y) => [...row].flatMap((cell, x) => {
  if (cell === " ") return [];
  const color = cell === "X" ? "#f9efe0" : "#bbfa8b";
  return [`${x}em ${y}em 0 ${color}`];
})).join(",");

export function ClawSprite() {
  return <span className={styles.sprite}><i style={{ boxShadow: pixels }} /></span>;
}

export function TitleBar({ children }: { children: ReactNode }) {
  return <div className={styles.titleBar}><i /><span>{children}</span><b>− &nbsp; □</b></div>;
}
