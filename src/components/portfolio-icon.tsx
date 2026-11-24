import type { CSSProperties } from "react";

const paths = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  file: <><path d="M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6 M9 16h5" /></>,
  mail: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.45" /></>,
  cube: <><path d="m12 2 9 5v10l-9 5-9-5V7z M3 7l9 5 9-5 M12 12v10" /></>,
  orbit: <><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-24 12 12)" /><path d="M9 13c-1-4-1.4-9 1-10.4 2.7-1.2 5.7 3.2 7 7.1 1.4 4.3 1.8 9.4-.6 10.8-1.8 1-4-1.2-5.6-3.5" /></>,
  plus: <path d="M12 5v14 M5 12h14" />,
  close: <path d="m5 5 14 14 M19 5 5 19" />,
  menu: <path d="M3 7h18 M3 12h18 M3 17h18" />,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.3 10v7 M7.3 7.1v.2 M11.2 17v-7 M11.2 12.4c0-3 5.1-3.7 5.1.5V17" /></>,
  github: <path d="M8.5 20.5c-4 .8-4-2-5.3-2.4m10.6 4v-3.2c0-.9-.3-1.6-.8-2 3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 18 6.2a5.1 5.1 0 0 0-.2-3.7s-1.2-.4-3.8 1.4a13.1 13.1 0 0 0-6.9 0C4.5 2.1 3.3 2.5 3.3 2.5a5.2 5.2 0 0 0-.2 3.7A5.4 5.4 0 0 0 1.7 10c0 5.4 3.2 6.6 6.3 7-.4.4-.7 1-.7 2v3.1" />,
  folder: <path d="M3 7V5a1 1 0 0 1 1-1h5l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />,
  cap: <><path d="m2 9 10-5 10 5-10 5z M6 11v5q6 5 12 0v-5 M21 10v6" /></>,
  code: <><path d="m7 6-5 6 5 6 M17 6l5 6-5 6 M14 4l-4 16" /></>,
  language: <><circle cx="12" cy="12" r="9.3" /><ellipse cx="12" cy="12" rx="4" ry="9.3" /><path d="M3 12h18" /></>
};

export function Icon({ name, size = 18, style }: {
  name: keyof typeof paths;
  size?: number;
  style?: CSSProperties;
}) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" style={style}>{paths[name]}</svg>;
}

export function PixelMark() {
  return (
    <svg aria-hidden="true" width="31" height="31" viewBox="0 0 32 32" fill="currentColor">
      <path d="M13 1h6v7h4V5h5v6h-4v3h7v6h-7v4h3v5h-6v-4h-3v6h-6v-7H9v4H4v-6h4v-3H1v-6h7V9H5V4h6v4h2z" />
      <path d="M13 13h6v6h-6z" fill="var(--paper)" />
    </svg>
  );
}
