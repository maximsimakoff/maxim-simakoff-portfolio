"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon, PixelMark } from "./portfolio-icon";

const navigation = [
  { title: "Work", id: "projects" },
  { title: "Experience", id: "experience" },
  { title: "About", id: "about" }
];

const resumeNavigation = [
  { title: "Experience", id: "experience" },
  { title: "Projects", id: "projects" },
  { title: "Skills", id: "stack" }
];

export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const items = pathname.replace(/\/$/, "") === "/resume" ? resumeNavigation : navigation;

  useEffect(() => {
    if (!open) return;
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !nav.current?.contains(event.target) && !button.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Maxim Simakoff, home"><PixelMark /><span>Maxim Simakoff</span></Link>
        <div className="nav-area">
          <button ref={button} className="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
          <nav ref={nav} id="primary-nav" className={open ? "primary-nav is-open" : "primary-nav"} aria-label="Main navigation">
            {items.map(item => <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>{item.title}</a>)}
          </nav>
          <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}><Icon name="mail" size={16} />Get in touch</a>
        </div>
      </div>
    </header>
  );
}
