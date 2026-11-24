"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { portfolioContent } from "@/content/portfolio";

export function SiteHeader() {
  const pathname = usePathname();
  const isResume = pathname === "/resume";

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-7xl px-4 pt-3 sm:px-8 sm:pt-5 lg:px-10">
      <div className="terminal-section-card relative px-3 py-3 sm:px-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-h-10 items-center gap-2.5 rounded-md">
            <span className="grid h-8 w-8 place-items-center rounded-md border border-coral/25 bg-coral/[0.08] font-mono text-[0.68rem] font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
              MS
            </span>
            <span className="text-sm font-medium text-stone-300">
              Maxim Simakoff
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Resume sections">
            {portfolioContent.nav.map((item) => (
              <a
                key={item.href}
                href={isResume ? item.href : `/resume${item.href}`}
                className="rounded-md px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-stone-500 transition hover:bg-white/[0.035] hover:text-stone-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Link
            href={isResume ? "/" : "/resume"}
            className="inline-flex min-h-10 items-center rounded-md border border-white/10 bg-white/[0.035] px-3.5 py-2 font-mono text-xs text-stone-200 transition hover:border-coral/50 hover:bg-coral/10 hover:text-ink"
          >
            {isResume ? "Portfolio" : "Resume"}
          </Link>
        </div>

        <nav
          aria-label="Mobile resume sections"
          className="scrollbar-hidden -mx-1 mt-2 flex gap-0 overflow-x-auto border-t border-terminal-line px-1 pt-2 md:hidden"
        >
          {portfolioContent.nav.map((item, index) => (
            <a
              key={item.href}
              href={isResume ? item.href : `/resume${item.href}`}
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-md px-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-stone-400 transition active:bg-white/[0.05]"
            >
              <span className="text-coral/80">0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
