import Link from "next/link";

import { portfolioContent } from "@/content/portfolio";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-7xl px-5 pt-5 sm:px-8 lg:px-10">
      <div className="relative border-b border-line bg-[#070706]/86 pb-4 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-xs font-semibold text-ink">
              MS
            </span>
            <span className="text-sm font-medium text-stone-300">
              Maxim Simakoff
            </span>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {portfolioContent.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-stone-500 transition hover:text-stone-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Link
            href="/resume"
            className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-stone-200 transition hover:border-coral/50 hover:bg-coral/10 hover:text-ink"
          >
            Resume
          </Link>
        </div>
      </div>
    </header>
  );
}
