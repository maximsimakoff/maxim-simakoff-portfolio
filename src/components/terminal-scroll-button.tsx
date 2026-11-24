"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

export type TerminalNavItem = {
  href?: string;
  index: string;
  label: string;
  shortLabel?: string;
  targetId?: string;
};

function preferredScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

type TerminalScrollButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  targetId?: string;
};

export function TerminalScrollButton({
  children,
  className = "group flex items-center gap-4 font-mono text-base text-stone-300 transition hover:text-ink",
  href,
  targetId
}: TerminalScrollButtonProps) {
  const handleClick = () => {
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: preferredScrollBehavior(),
        block: "start"
      });
      window.history.replaceState(null, "", `#${targetId}`);
      return;
    }

    if (href) {
      window.location.assign(href);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}

type TerminalSidebarNavProps = {
  items: TerminalNavItem[];
  variant?: "dock" | "sidebar";
};

export function TerminalSidebarNav({
  items,
  variant = "sidebar"
}: TerminalSidebarNavProps) {
  const sectionItems = useMemo(
    () => items.filter((item) => item.targetId),
    [items]
  );
  const [activeId, setActiveId] = useState(sectionItems[0]?.targetId ?? "");
  const programmaticScrollUntilRef = useRef(0);

  useEffect(() => {
    const updateActiveFromHash = () => {
      const hashId = window.location.hash.replace("#", "");

      if (sectionItems.some((item) => item.targetId === hashId)) {
        setActiveId(hashId);
      }
    };

    updateActiveFromHash();
    window.addEventListener("hashchange", updateActiveFromHash);

    return () => {
      window.removeEventListener("hashchange", updateActiveFromHash);
    };
  }, [sectionItems]);

  useEffect(() => {
    const updateActiveItem = () => {
      if (Date.now() < programmaticScrollUntilRef.current) {
        return;
      }

      const marker = window.innerHeight * 0.42;
      let nextActiveId = sectionItems[0]?.targetId ?? "";

      for (const item of sectionItems) {
        if (!item.targetId) {
          continue;
        }

        const section = document.getElementById(item.targetId);
        if (!section) {
          continue;
        }

        if (section.getBoundingClientRect().top <= marker) {
          nextActiveId = item.targetId;
        }
      }

      setActiveId(nextActiveId);
    };

    updateActiveItem();
    window.addEventListener("scroll", updateActiveItem, { passive: true });
    window.addEventListener("resize", updateActiveItem);

    return () => {
      window.removeEventListener("scroll", updateActiveItem);
      window.removeEventListener("resize", updateActiveItem);
    };
  }, [sectionItems]);

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: TerminalNavItem
  ) => {
    if (item.targetId) {
      event.preventDefault();
      programmaticScrollUntilRef.current = Date.now() + 950;
      setActiveId(item.targetId);
      document.getElementById(item.targetId)?.scrollIntoView({
        behavior: preferredScrollBehavior(),
        block: "start"
      });
      window.history.replaceState(null, "", `#${item.targetId}`);
      return;
    }

    if (item.href) {
      window.location.assign(item.href);
    }
  };

  if (variant === "dock") {
    return (
      <nav
        aria-label="Portfolio sections"
        className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[80] xl:hidden"
      >
        <div
          className="mobile-command-shell grid rounded-xl border border-white/10 p-1.5 backdrop-blur-2xl"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((item) => {
            const isActive = item.targetId === activeId;

            return (
              <a
                key={item.href || item.targetId}
                href={item.targetId ? `#${item.targetId}` : item.href}
                onClick={(event) => handleClick(event, item)}
                aria-current={isActive ? "location" : undefined}
                className={`flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 font-mono transition active:scale-[0.97] ${
                  isActive
                    ? "bg-coral/12 text-ink shadow-[inset_0_0_0_1px_rgba(255,107,87,0.18)]"
                    : "text-stone-500"
                }`}
              >
                <span className={`text-[0.58rem] ${isActive ? "text-coral" : "text-stone-600"}`}>
                  {item.index}
                </span>
                <span className="max-w-full truncate text-[0.62rem] sm:text-[0.68rem]">
                  {item.shortLabel || item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const isActive = item.targetId === activeId;

        return (
          <a
            key={item.href || item.targetId}
            href={item.targetId ? `#${item.targetId}` : item.href}
            onClick={(event) => handleClick(event, item)}
            aria-current={isActive ? "location" : undefined}
            className="group flex min-h-11 w-full items-center gap-4 rounded-md px-2 text-left font-mono text-base text-stone-300 transition hover:bg-white/[0.025] xl:min-h-9"
          >
            <span className={isActive ? "w-7 text-ink" : "w-7 text-stone-500"}>
              {item.index}
            </span>
            <span>
              <span className={isActive ? "text-ink" : "text-stone-500"}>{"<"}</span>
              <span className={isActive ? "text-coral" : "text-stone-300"}>
                {item.label}
              </span>
              <span className={isActive ? "text-ink" : "text-stone-500"}>{" />"}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
