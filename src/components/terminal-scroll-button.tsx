"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

export type TerminalNavItem = {
  href?: string;
  index: string;
  label: string;
  targetId?: string;
};

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
        behavior: "smooth",
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
};

export function TerminalSidebarNav({ items }: TerminalSidebarNavProps) {
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

  const handleClick = (item: TerminalNavItem) => {
    if (item.targetId) {
      programmaticScrollUntilRef.current = Date.now() + 950;
      setActiveId(item.targetId);
      document.getElementById(item.targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      window.history.replaceState(null, "", `#${item.targetId}`);
      return;
    }

    if (item.href) {
      window.location.assign(item.href);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isActive = item.targetId === activeId;

        return (
          <button
            key={item.href || item.targetId}
            type="button"
            onClick={() => handleClick(item)}
            aria-current={isActive ? "location" : undefined}
            className="group flex w-full items-center gap-4 text-left font-mono text-base text-stone-300"
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
          </button>
        );
      })}
    </div>
  );
}
