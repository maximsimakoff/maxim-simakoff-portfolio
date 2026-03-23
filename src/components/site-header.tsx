import Link from "next/link";

import { portfolioContent } from "@/content/portfolio";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-7xl px-6 pt-6 sm:px-8 lg:px-12">
      <div className="relative overflow-hidden rounded-full border border-white/10 bg-black/40 px-4 py-3 shadow-[0_14px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]" />
        <div className="relative flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-sm uppercase tracking-[0.28em] text-stone-200">
              MS
            </span>
            <span className="hidden text-xs uppercase tracking-[0.24em] text-stone-500 sm:inline-flex">
              Portfolio
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {portfolioContent.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[0.24em] text-stone-500 transition hover:text-stone-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Link
            href="/resume"
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-stone-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-ink"
          >
            Resume
          </Link>
        </div>
      </div>
    </header>
  );
}
